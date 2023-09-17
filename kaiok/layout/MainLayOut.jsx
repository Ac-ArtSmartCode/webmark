import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import callApi from "../axios/callApi";
const MainLayOut = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetch = async () => {
      await callApi.get("/users").then((item) => setUsers(item.data.data));
    };
    fetch();
    console.log(users);
  }, []);
  if (!users) return null;
  return (
    <Box>
      <Navigation props={users} />
      <Outlet />
    </Box>
  );
};

export default MainLayOut;
