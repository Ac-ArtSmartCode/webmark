import MainLayOut from "../layout/MainLayOut";
import FirstPage from "../page/FirstPage";
import FormPage from "../page/FormPage";

const route = [
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      { path: "/", element: <FirstPage /> },
      { path: "/edit/:id", element: <FormPage /> },
    ],
  },
];

export default route;
