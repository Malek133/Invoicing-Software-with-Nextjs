"use client"

import * as React from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import { IProduct } from "@/interface"

interface TableProductProps {
  products: IProduct[];
}


const TableProduct: React.FC<TableProductProps> = ({ products }) => {
  // Fonctions factices pour la gestion des actions
  // const handleEdit = (id: number) => {
  //   console.log(`Éditer le produit avec l'ID : ${id}`)
  // }

  // const handleDelete = (id: number) => {
  //   console.log(`Supprimer le produit avec l'ID : ${id}`)
  // }

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du produit</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price.toFixed(2)} €</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  // onClick={() => handleEdit(product.id)}
                  className="mr-2"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editer</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  // onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableProduct
