'use client'

import { Button } from '@/components/ui/button'
import { FolderPlus } from 'lucide-react'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    // DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Textarea } from "@/components/ui/textarea"
import Spinner from './Spinner'
import { productFormSchema, ProductFormValues } from '@/schema'
import { createProductActions } from '@/actions/actions'
const AddProductForm = ({ userId }: { userId: string | null }) => {
    const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  // const [imageUrl, setImageUrl] = useState("")
 
  const defaultValues: Partial<ProductFormValues> = {
    title: "",
    body: "",
    price: 0,
    stock:0,
    //  image: "",
    // completed: false
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = async ({title, body, price,stock
    //  completed
    }: ProductFormValues) => {
    setLoading(true)
    await createProductActions({
      title,
      body,
    //   completed,
      price,
      stock,
      //  image: imageUrl,
      userId
    })
    setLoading(false)
    form.reset()
    //  setImageUrl("")
    setOpen(false)
  }

 

  return (
    <>
       <Dialog open={open} onOpenChange={setOpen}>
  {/* Déclencheur du dialogue, ici le bouton pour ajouter une nouvelle tâche ("New Todo") */}
  <DialogTrigger asChild>
    <Button>
      <FolderPlus className="mx-2" /> New Invoice
    </Button>
  </DialogTrigger>

  {/* Contenu de la boîte de dialogue */}
  <DialogContent className="sm:max-w-[425px]">
    {/* En-tête du dialogue avec le titre et la description */}
    {/* <DialogHeader> */}
      <DialogTitle>Add new Invoice</DialogTitle>
      
    {/* </DialogHeader> */}

    <div className="py-4">
      {/* Formulaire utilisant un hook pour la gestion de formulaire */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
          
          {/* Champ pour le titre */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of your todo" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the title for your new Invoice item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ pour la description */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your task"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can provide more details 
                  about your task here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ pour le prix */}
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

         

          {/* Pied du dialogue avec le bouton pour soumettre le formulaire */}
          <DialogFooter>
            <Button type="submit">
              {loading ? <Spinner /> : 'Save'}
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

export default AddProductForm
