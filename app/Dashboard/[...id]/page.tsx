import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LayoutDashboard } from 'lucide-react';


export async function generateMetadata({ params }: { params: { id: string } }) {
  // const product = await getProduct(parseInt(params.id))
  // return { title: product ? product.title : "Produit non trouvé" }

  const productId = params?.id ? parseInt(params.id, 10) : null;

  if (!productId) {
    return { title: "Produit non trouvé" };
  }

  const product = await getProduct(productId);
  return { title: product ? product.title : "Produit non trouvé" };
}

async function getProduct(id:number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    })
    return product
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
   const product = await getProduct(parseInt(params.id))
 

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-2">Prix: {product.price.toFixed(2)} €</p>
      <p className="mb-2">Stock: {product.stock}</p>
      {/* <p className="mb-2">Description: {product.description}</p> */}
      {/* {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full max-w-md h-auto rounded-lg shadow-lg"
        />
      )} */}
      {/* Vous pouvez ajouter d'autres détails du produit ici */}
      <Link href='/Dashboard'>
      <Button>Back to <LayoutDashboard /> </Button>
      </Link>
    </div>
  )
}

