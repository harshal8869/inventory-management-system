import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

        <div className="container">

          <Link className="navbar-brand fw-bold" to="/">
            Inventory Management System
          </Link>

          <div>

            <Link className="btn btn-light me-2" to="/">
              Dashboard
            </Link>

            <Link className="btn btn-light me-2" to="/products">
              Products
            </Link>

            <Link className="btn btn-light me-2" to="/customers">
              Customers
            </Link>

            <Link className="btn btn-light" to="/orders">
              Orders
            </Link>

          </div>

        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;