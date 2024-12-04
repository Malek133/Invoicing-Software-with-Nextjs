import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import Spinner from './Spinner'
import { productFormSchema, ProductFormValues } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IProduct } from '@/interface'
import { updateProductActions } from '@/actions/actions'

const EditProductForm = ({ product }: { product: IProduct }) => {
    const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const defaultValues: Partial<ProductFormValues> = {
    title: product.title,
    body: product.body as string,
    price: product.price,
    stock:product.stock,
    // image: product.image as string,
    // completed: product.completed,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);

    await updateProductActions({
      id: product.id,
      title: data.title,
      body: data.body as string,
      price: data.price,
      stock:data.stock,
    });

    setLoading(false);
    setOpen(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[555px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
           
          </DialogHeader>
          <div className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Product title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about your product"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner />
                        <span className="mx-2">Saving...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditProductForm
