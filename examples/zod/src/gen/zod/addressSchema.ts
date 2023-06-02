import z from 'zod'

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  identifier: z.tuple([z.number(), z.string(), z.enum([`NW`, `NE`, `SW`, `SE`])]).optional(),
})
