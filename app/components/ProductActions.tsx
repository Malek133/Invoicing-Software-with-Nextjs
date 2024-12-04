'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { IProduct } from '@/interface'
import { deleteProductActions } from '@/actions/actions'
import Spinner from './Spinner'
import EditProductForm from './EditProductForm'

const ProductActions = ({product}:{product:IProduct}) => {
    const [loading,setLoading]= useState(false);
    console.log(loading)
  return (
    <main>
         
       <EditProductForm key={product.id} product={product} />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    if(product.id){
                     setLoading(true);
                       await deleteProductActions({ id: product?.id });
                       setLoading(false);
                    }
                       
                   }}
                >
                  {loading ? <Spinner /> :<Trash2 size={16} />}
                </Button>
    </main>
  )
}

export default ProductActions