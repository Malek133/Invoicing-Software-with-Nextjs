
'use server'

import { IProduct } from "@/interface";
 import { PrismaClient } from "@prisma/client";
 import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const getProductActions = async ({ userId }: { userId: string | null }) => {
    return await prisma.product.findMany({
      where: userId ? { user_id: userId } : {},
      orderBy: {
        createdAt: "desc",
      },
    });
  };
  

  export const getAllProductActions = async () => {
    return await prisma.product.findMany({});
  }

  export const createProductActions = async ({
    title,
    body,
    stock,
    price,
    //  image,
    userId,
  }: {
    title: string;
    body?: string;
    price: number;
    stock:number;
    //  image?:string;
    userId: string | null;
  }) => {
    try {
      await prisma.product.create({
        data: {
          title,
          body,
          price,
          stock,
          //  image,
          user_id: userId as string,
        },
      });
      // Revalidate after the create operation
      revalidatePath('/');
    } catch (error) {
      console.error("Error creating product: ", error);
      throw error; // Renvoyer l'erreur pour la gérer dans le composant
    }
  };

  export const deleteProductActions = async ({ id }: { id:number }) => {
    await prisma.product.delete({
        where: {
            id,
        },
    });
    // Revalidate after the delete operation
    revalidatePath('/');
}
  
export const updateProductActions = async ({
  id,
  title,
  body,
  // completed,
  price,
  stock
  // image,
}: IProduct) => {
  try {
    await prisma.product.update({
      where: { id },
      data: {
        title,
        body,
        // completed,
        price,
        stock,
        // image,
      },
    });
    // Revalidate the path after updating the product
    revalidatePath('/');
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};