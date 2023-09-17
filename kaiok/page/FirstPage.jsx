import { Box, Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import callApi from "../axios/callApi";
import CardShop from "../components/CardShop";

const FirstPage = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await callApi
        .get("/products")
        .then((item) => setProduct(item.data[0].data));
    };
    fetch();
    console.log(product);
  }, []);
  if (!product) return null;
  return (
    <Box p={"3rem"}>
      <Grid gridTemplateColumns={"repeat(5,1fr)"}>
        {product == null ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          product.map((item) => (
            <GridItem key={item._id}>
              <CardShop props={item} />
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FirstPage;
