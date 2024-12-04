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

import { IProduct } from "@/interface"
import ProductActions from "./ProductActions";

interface TableProductProps {
  products: IProduct[];
}


const TableProduct: React.FC<TableProductProps> = ({ products }) => {

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
               <ProductActions product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableProduct
