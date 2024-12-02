export interface IProduct {
    id?:string;
    title: string;
    body: string | null;
     image: string  | null;
     price: number;
     stock:number;
    completed: boolean;
    createdAd?: Date;
}