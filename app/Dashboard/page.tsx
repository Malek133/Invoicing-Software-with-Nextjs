
import React from 'react'
import  TableProduct  from '../components/TableProduct'
import AddProductForm from '../components/AddProductForm'
import { auth } from '@clerk/nextjs/server'
import { getProductActions } from '@/actions/actions'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'




const Dashboard = async () => {
   
    const {userId} = await auth()
 const products = await getProductActions({userId});
  return (
    <main>
         <span className='flex justify-start 
         items-center mx-5 my-3'>
           <AddProductForm userId={userId} />
        </span> 
     
    <div 
    className="flex justify-between items-center 
    p-8 pb-4 gap-6 sm:p-20 
    font-[family-name:var(--font-geist-sans)]"> 
    
    <TableProduct products={products} />
       
   </div>
   <div className='flex justify-end items-center mx-24 my-4'>
        <Link href={{
          pathname: '/saved',
          query: { products: JSON.stringify(products) }
        }}>
          <Button>
            <Download className="mx-2" /> Save 
          </Button>
        </Link>
      </div>
   
   </main>
  )
}

export default Dashboard