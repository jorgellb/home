// netlify/functions/submit-form.js
import { z } from 'zod';

export default async (event, context) => {
  const { name, email, phone, service, projectType, message } = JSON.parse(event.body);
  
  // Validate (Zod)
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    service: z.string(),
    projectType: z.string(),
    message: z.string().min(10),
  });
  
  const result = schema.safeParse({ name, email, phone, service, projectType, message });
  
  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }
  
  // Send email (use Netlify Forms or external service)
  // ... implementation
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
