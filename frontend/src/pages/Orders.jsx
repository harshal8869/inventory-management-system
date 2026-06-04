import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  const loadOrders = () => {
    api.get("/orders")
      .then((response) => {
        setOrders(response.data);
      });
  };

  const loadCustomers = () => {
    api.get("/customers")
      .then((response) => {
        setCustomers(response.data);
      });
  };

  const loadProducts = () => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data);
      });
  };

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/orders", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity)
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: ""
      });

      loadOrders();
      loadProducts();

      alert("Order Created Successfully");

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Error creating order"
      );
    }
  };

  const deleteOrder = async (id) => {

    if (!window.confirm("Delete order?")) {
      return;
    }

    try {

      await api.delete(`/orders/${id}`);

      loadOrders();
      loadProducts();

    } catch (error) {

      alert("Error deleting order");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
  Order Management
</h2>

      <form onSubmit={handleSubmit} className="mb-4 card shadow p-4">

        <div className="row">

          <div className="col">

            <select
              className="form-control"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.full_name}
                </option>
              ))}

            </select>

          </div>

          <div className="col">

            <select
              className="form-control"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} (Stock: {product.stock_quantity})
                </option>
              ))}

            </select>

          </div>

          <div className="col">

            <input
              className="form-control"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

          </div>

          <div className="col">

            <button className="btn btn-primary">
              Create Order
            </button>

          </div>

        </div>

      </form>

<table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>

              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.total_amount}</td>

              <td>

                <button
className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Orders;