import { z } from "zod"

export const productFormSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    
    body: z
    .string()
    .max(1000, {
      message: "Username must not be longer than 100 characters.",
    }).optional(),

    // completed:z.boolean(),
     price: z.number().min(0, "Price must be a positive number"),
     stock: z.number().min(0, "Stock must be a positive number"),
    // image: z.string().url({
    //   message: "Please upload an image.",
    // }),

  })
  
 export type ProductFormValues = z.infer<typeof productFormSchema>