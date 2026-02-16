#!/usr/bin/env tsx
/**
 * Content Validator CLI
 * Validates all content files against their schemas
 * Usage: pnpm taia:validate [content-dir]
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  pageSchema,
  postSchema,
  productSchema,
  categorySchema,
  serviceSchema,
  testimonialSchema,
  pricingPlanSchema,
  validate,
  formatErrors
} from '../schemas/index'
import type { z } from 'zod'

interface ContentFile {
  path: string
  type: 'page' | 'post' | 'product' | 'category' | 'service' | 'testimonial' | 'pricing'
  data: unknown
}

const SCHEMAS: Record<string, z.ZodSchema> = {
  page: pageSchema,
  pages: pageSchema,
  post: postSchema,
  posts: postSchema,
  product: productSchema,
  products: productSchema,
  category: categorySchema,
  categories: categorySchema,
  service: serviceSchema,
  services: serviceSchema,
  testimonial: testimonialSchema,
  testimonials: testimonialSchema,
  pricing: pricingPlanSchema
}

import grayMatter from 'gray-matter';

function parseFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
  const result = grayMatter(content);
  return { data: result.data as Record<string, unknown>, body: result.content };
}

function findContentFiles(dir: string): ContentFile[] {
  const files: ContentFile[] = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Determine content type from directory name
      const type = SCHEMAS[entry.name] ? entry.name : null

      if (type) {
        const subFiles = fs.readdirSync(fullPath)

        for (const file of subFiles) {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const content = fs.readFileSync(path.join(fullPath, file), 'utf-8')
            const { data, body } = parseFrontmatter(content)

            files.push({
              path: path.join(fullPath, file),
              type: type.replace(/s$/, '') as ContentFile['type'],
              data: { ...data, body }
            })
          }
        }
      } else {
        // Recurse into subdirectory
        files.push(...findContentFiles(fullPath))
      }
    }
  }

  return files
}

function main() {
  const contentDir = process.argv[2] || './src/content'

  console.log('🔍 TAIA Content Validator')
  console.log(`   Scanning: ${path.resolve(contentDir)}\n`)

  const files = findContentFiles(contentDir)

  if (files.length === 0) {
    console.log('No content files found.')
    process.exit(0)
  }

  let hasErrors = false
  let validCount = 0
  let errorCount = 0

  for (const file of files) {
    const schema = SCHEMAS[file.type]

    if (!schema) {
      console.log(`⚠️  Unknown type: ${file.type} in ${file.path}`)
      continue
    }

    const result = validate(schema, file.data)

    if (result.success) {
      validCount++
      console.log(`✅ ${file.path}`)
    } else {
      hasErrors = true
      errorCount++
      console.log(`❌ ${file.path}`)
      console.log(formatErrors(result.errors))
      console.log('')
    }
  }

  console.log('\n---')
  console.log(`Total: ${files.length} files`)
  console.log(`Valid: ${validCount}`)
  console.log(`Errors: ${errorCount}`)

  if (hasErrors) {
    process.exit(1)
  }

  console.log('\n✨ All content valid!')
}

main()
