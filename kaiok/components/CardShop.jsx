import React from "react";
import Swal from "sweetalert2";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Heading,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import callApi from "../axios/callApi";
import { utilsAlert } from "../utils/Swal";
const { success } = utilsAlert();
const CardShop = ({ props }) => {
  const confirm = (title, text) => {
    Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await callApi.delete(`/products/${props._id}`);
        success("ลบข้อมูลสำเร็จ", "ข้อมูลสินค้าถูกลบแล้ว");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
  };

  const nav = useNavigate();
  return (
    <Card maxW={"230px"} boxShadow={"3px 3px 3px 3px rgba(0,0,0,0.2)"}>
      <CardBody>
        <Image
          h={"100px"}
          src={props.img_url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.prod_name}</Heading>

          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text>ราคา</Text>
            <Text color="blue.600" fontSize="2xl">
              {props.prod_price}฿
            </Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter maxW={"200px"}>
        <ButtonGroup spacing="1">
          <Button
            variant="solid"
            size={"sm"}
            colorScheme="yellow"
            onClick={() => {
              return nav(`/edit/${props._id}`);
            }}
          >
            แก้ไขสินค่ะ
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            size={"sm"}
            onClick={() =>
              confirm("ต้องการลบสินหค้าหรือไม่", "กรูณายืนยันการลบ")
            }
          >
            ลบสินนะคะ
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardShop;
