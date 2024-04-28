import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ProductPage from "./pages/dashboard/product";
import AddProductsPage from "./pages/dashboard/product/AddProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        index: true,
        element: <ProductPage />,
      },
      {
        path: "/addProduct",
        index: true,
        element: <AddProductsPage />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router;
