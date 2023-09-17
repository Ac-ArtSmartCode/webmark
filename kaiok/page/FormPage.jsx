import { Box, ButtonGroup, Container, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import callApi from "../axios/callApi";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { utilsAlert } from "../utils/Swal";

const FormPage = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    prod_name: "",
    prod_price: "",
  });
  const { id } = useParams("id");

  const { warning } = utilsAlert();
  const [product, setProduct] = useState();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await callApi.put(`/products/${id}`, formData).then((res) => {
        warning("แก้ไขข้อมูลสินค้า", res.data[0].message);
        setTimeout(() => {
          nav("/");
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    console.log(formData);
  };
  useEffect(() => {
    const fetch = async () => {
      await callApi
        .get(`/products/${id}`)
        .then((item) => setProduct(item.data[0].data));
      console.log(product);
      setFormData({
        prod_name: product.prod_name,
        prod_price: product.prod_price,
      });
    };
    fetch();
  }, []);
  if (!product) return null;
  return (
    <Container minW={"90%"} minH={"80vh"}>
      <Flex justifyContent={"center"} alignItems={"center"} h={"500px"}>
        <Image w={"500px"} src={product.img_url} />
        <Box w={"400px"}>
          <form onSubmit={handleLogin}>
            <FormControl id="prod_name" isRequired>
              <FormLabel>ชื่อสินค้า</FormLabel>
              <Input
                placeholder="ชื่อสินค้า"
                _placeholder={{ color: "gray.500" }}
                type="text"
                name="prod_name"
                value={formData.prod_name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="prod_price" isRequired>
              <FormLabel>ราคาสินค้า`</FormLabel>
              <Input
                type="number"
                name="prod_price"
                placeholder="ราคาสินค้า"
                value={formData.prod_price}
                onChange={handleInputChange}
              />
            </FormControl>

            <ButtonGroup mt={"15px"} ty>
              <Button type="submit" colorScheme="yellow" mr={3}>
                แก้ไขสินค้า
              </Button>
              <Button onClick={() => nav("/")}>ยกเลิก</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default FormPage;
