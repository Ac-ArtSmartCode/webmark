"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import callApi from "../axios/callApi";
import FormModals from "./FromModal";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    ></Box>
  );
};

export default function Navigation({ props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { img_url } = props;
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const logInOnClose = () => {
    setLoginIsOpen(false);
  };
  const logInOnOpen = () => {
    setLoginIsOpen(true);
  };

  return (
    <>
      <Box bg={useColorModeValue("green.300", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              bg={"orange.100"}
              p={"10px"}
              borderRadius={"20px"}
              boxShadow={"3px 3px 3px 1px rgba(0,0,0,0.8)"}
            >
              <Text fontSize={"20px"} fontWeight={"bold"}>
                ไข่ โอ เค
              </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              onClick={logInOnOpen}
              leftIcon={<AddIcon />}
            >
              เพิ่มสินค้า
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  objectFit={"cover"}
                  src={img_url ? img_url : ""}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{props.name}</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <FormModals isOpen={loginIsOpen} onClose={logInOnClose} />
    </>
  );
}
