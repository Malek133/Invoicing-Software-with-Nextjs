
'use server'

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
    // completed,
    price,
    // image,
    userId,
  }: {
    title: string;
    body?: string;
    // completed: boolean;
    price: number;
    stock:number;
    // image?:string;
    userId: string | null;
  }) => {
    try {
      await prisma.product.create({
        data: {
          title,
          body,
          // completed,
          price,
          stock,
          // image,
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
  