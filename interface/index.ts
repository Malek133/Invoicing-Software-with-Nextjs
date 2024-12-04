export interface IProduct {
    id:number;
    title: string;
    body: string | null;
     image: string  | null;
     price: number;
     stock:number;
    completed: boolean;
    createdAd?: Date;
}