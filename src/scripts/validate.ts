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
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!match) {
    return { data: {}, body: content }
  }

  // Simple YAML-like parsing (for MVP - in production use gray-matter)
  const frontmatter = match[1]
  const body = match[2] || ''
  const data: Record<string, unknown> = {}

  if (!frontmatter) {
    return { data, body }
  }

  const lines = frontmatter.split('\n')
  let currentObj: any = data
  let indentLevel = 0

  for (const line of lines) {
    if (!line.trim()) continue

    const match = line.match(/^(\s*)([^:]+):(.*)$/)
    if (match) {
      const indent = match[1].length
      const key = match[2].trim()
      let value: any = match[3].trim()

      if (value === '' || value === undefined) {
        // Might be a start of a nested object or list
        if (indent === 0) {
          data[key] = {}
          currentObj = data[key]
        } else {
          // Deeper nesting not supported by this simple parser
        }
      } else {
        // Strip quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1)
        }

        // Type coercion
        if (value === 'true') value = true
        else if (value === 'false') value = false
        else if (!isNaN(Number(value)) && value !== '') value = Number(value)

        if (indent === 0) {
          data[key] = value
          currentObj = data
        } else {
          currentObj[key] = value
        }
      }
    } else if (line.trim().startsWith('-')) {
      // Very basic list support (for features/keywords)
      const key = Object.keys(data).pop()
      if (key && !Array.isArray(data[key])) {
        data[key] = []
      }
      if (key) {
        let val: any = line.trim().substring(1).trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1)
        }
        if (Array.isArray(data[key])) {
            data[key].push(val)
          } else {
            console.error(`Error: ${key} is not an array.`)
          }
      }
    }
  }

  return { data, body }
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
