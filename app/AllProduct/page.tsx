

// import * as React from "react"
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table"
// import { IProduct } from "@/interface"
// import { getAllProductActions } from "@/actions/actions"

// interface TableProductProps {
//   products: IProduct[];
// }


// const AllProduct: React.FC<TableProductProps> = async () => {

//     const products = await getAllProductActions();

//   return (
//     <main className="p-8 pb-4 gap-6 sm:p-20 
//     font-[family-name:var(--font-geist-sans)]">
//     <div className="rounded-md border w-full">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Nom du produit</TableHead>
//             <TableHead>Prix</TableHead>
//             <TableHead>Stock</TableHead>
//             {/* <TableHead className="text-right">Actions</TableHead> */}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {products.map((product) => (
//             <TableRow key={product.id}>
//               <TableCell className="font-medium">{product.title}</TableCell>
//               <TableCell>{product.price.toFixed(2)} €</TableCell>
//               <TableCell>{product.stock}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div></main>
//   )
// }

// export default AllProduct


'use client'

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IProduct } from "@/interface"
import { getAllProductActions } from "@/actions/actions"

interface TableProductProps {
  products: IProduct[];
}

const AllProduct: React.FC<TableProductProps> = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 5;

  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProductActions();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="p-8 pb-4 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.price.toFixed(2)} €</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Last
        </Button>
        <span>Page {currentPage} at {totalPages}</span>
        <Button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </main>
  )
}

export default AllProduct

