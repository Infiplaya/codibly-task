import {
  TableCell,
  TableRow,
  Modal,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { Product } from "./ProductsList";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const cellStyle = { color: "black", fontWeight: "bold" };
  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#022981",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleClick() {
    setClicked(true);
  }

  function handleClose() {
    setClicked(false);
  }

  return (
    <>
      <TableRow
        key={product.id}
        style={{ backgroundColor: product.color, cursor: "pointer" }}
        onClick={handleClick}
      >
        <TableCell style={cellStyle}>{product.id}</TableCell>
        <TableCell style={cellStyle}>{product.name}</TableCell>
        <TableCell style={cellStyle}>{product.year}</TableCell>
      </TableRow>
      <Modal open={clicked} onClose={handleClose}>
        <Box sx={boxStyle}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            Name: {product.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List>
              <ListItem>
                <b>Id</b>: {product.id}
              </ListItem>
              <ListItem>
                <b>Year</b>: {product.year}
              </ListItem>
              <ListItem>
                <b>Color</b>: {product.color}
              </ListItem>
              <ListItem>
                <b>Pantone Value</b>: {product.pantone_value}
              </ListItem>
            </List>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
