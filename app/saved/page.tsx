'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table"
import { IProduct } from "@/interface"
import { FileDown } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from '@/components/ui/button'

const SavedPage = () => {
  const searchParams = useSearchParams()
  const productsParam = searchParams.get('products')
  const products: IProduct[] = productsParam ? JSON.parse(productsParam) : []

  const handleDownload = () => {
  const doc = new jsPDF()

    // Définir les en-têtes du tableau
    // const headers = [['Nom du produit', 'Prix', 'Stock']]

    // // Convertir les données des produits en format de tableau
    // const data = products.map(product => [
    //   product.title,
    //   `${product.price.toFixed(2)} €`,
    //   product.stock.toString()
    // ])

    // Générer le tableau PDF
    // doc.autoTable({
    //   head: headers,
    //   body: data,
    // })

    // Générer le tableau PDF avec autoTable
    autoTable(doc, {
        head: [['Nom du produit', 'Prix', 'Stock']],
        body: products.map(product => [
          product.title,
          `${product.price.toFixed(2)} €`,
          product.stock.toString(),
        ]),
      })

    // Sauvegarder le PDF
    doc.save('products.pdf')
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 mx-24 mt-8">Saved Products</h1>
      <div className="flex justify-between items-center p-8 pb-4 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]"> 
      <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du produit</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price.toFixed(2)} €</TableCell>
              <TableCell>{product.stock}</TableCell>
              
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      </div>
      <div className='flex justify-end items-center mx-24 my-4'>
        <Button onClick={handleDownload}>
          <FileDown className="mr-2" /> Download PDF
        </Button>
      </div>
    </main>
  )
}

export default SavedPage

