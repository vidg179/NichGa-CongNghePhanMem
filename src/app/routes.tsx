import { createBrowserRouter } from "react-router";

import CustomerLayout from "./layouts/CustomerLayout";
import HomePage from "./pages/customer/HomePage";
import Menu from "./pages/customer/Menu";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Predictions from "./pages/Predictions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CustomerLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "menu", Component: Menu },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "products", Component: Products },
      { path: "categories", Component: Categories },
      { path: "tables", Component: Tables },
      { path: "orders", Component: Orders },
      { path: "payments", Component: Payments },
      { path: "customers", Component: Customers },
      { path: "users", Component: Users },
      { path: "reports", Component: Reports },
      { path: "predictions", Component: Predictions },
    ],
  },
]);
