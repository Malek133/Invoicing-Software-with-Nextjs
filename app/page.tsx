import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
        Create your
       Invoice in just a few clicks</h1>

      <p className="text-md sm:text-lg md:text-xl font-semibold">
      <span className="block">Create professional invoices in minutes, not hours. Get paid faster.</span>
       <span className="block mt-2">Free Invoicing Software for Small Business.</span>
      </p>
         <Link href='Dashboard'>
         <Button className="bg-blue-500
          hover:bg-blue-700 text-white
           font-bold py-6">
          Create Invoice
         </Button>
         </Link>
         
    </div>
  );
}
