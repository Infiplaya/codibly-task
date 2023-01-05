import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import {
  Table,
  TableBody,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >(products);
  const [id, setId] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const dataFetch = async () => {
      let products: Product[] = [];
      let page = 1;
      let perPage = 5;
      let totalPages = 3;

      while (page <= totalPages) {
        try {
          const response = await fetch(
            `https://reqres.in/api/products?page=${page}&per_page=${perPage}`
          );
          const data = await response.json();
          products = products.concat(data.data);
          page += 1;
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
            return;
          }
        }
      }

      setProducts(products);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((product) => product.id.toString().startsWith(id))
    );
  }, [id, products]);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setId(event.target.value);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <>
      <TextField
        label="Filter by ID"
        value={id}
        onChange={handleIdChange}
        sx={{ mb: 10, backgroundColor: "whitesmoke" }}
      />
      <Paper>
        <Table>
          <TableBody>
            {filteredProducts
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </TableBody>
        </Table>
        {products ? (
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        ) : null}
      </Paper>
    </>
  );
};
