import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: ""
  });

  const loadProducts = () => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data);
      });
  };

  useEffect(() => {
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

      await api.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity)
      });

      setFormData({
        name: "",
        sku: "",
        price: "",
        stock_quantity: ""
      });

      loadProducts();

    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete product?")) {
      return;
    }

    await api.delete(`/products/${id}`);

    loadProducts();
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
  Product Management
</h2>

      <form
  onSubmit={handleSubmit}
  className="mb-4 card shadow p-4"
>

        <div className="row">

          <div className="col">
            <input
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Stock"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button className="btn btn-primary">
              Add Product
            </button>
          </div>

        </div>

      </form>

<table className="table table-striped table-hover shadow">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr key={product.id}>

              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>

              <td>
                <button
className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteProduct(product.id)}
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

export default Products;