/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import callApi from "../axios/callApi";
import { utilsAlert } from "../utils/Swal";

export default function LoginModals(props) {
  const { isOpen, onClose } = props;
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_price: "",
    images: "",
  });
  const nav = useNavigate();
  const { success } = utilsAlert();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);

      await callApi
        .post("/products", {
          prod_name: formData.prod_name,
          prod_price: formData.prod_price,
          images: img,
        })
        .then((e) => success("เพิ่มข้อมูลสินค้าสำเร็จ", e.data[0].message));
      onClose();
    } catch (e) {
      onClose();
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
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (!file) return null;
    await callApi
      .post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => setImg(e.data.images.Path));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleLogin}>
            <ModalHeader>เพิ่มสินค้า</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl id="prod_name" isRequired>
                <FormLabel>ชื่อสินค้า</FormLabel>
                <Input
                  placeholder="ชื่อสินค้า"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="prod_name"
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="prod_price" isRequired>
                <FormLabel>ราคาสินค้า`</FormLabel>
                <Input
                  type="number"
                  name="prod_price"
                  placeholder="ราคาสินค้า"
                  onChange={handleInputChange}
                />
              </FormControl>
              <Input
                type="file"
                variant={"unstyled"}
                mt={"5"}
                onChange={handleFileUpload}
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="teal" mr={3}>
                เพิ่มสินค้า
              </Button>
              <Button onClick={onClose}>ยกเลิก</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
