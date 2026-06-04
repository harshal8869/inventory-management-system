import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then((response) => {
        setDashboard(response.data);
      });
  }, []);

  if (!dashboard) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        Inventory Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h5 className="text-muted">
              Total Products
            </h5>

            <h1>{dashboard.total_products}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h5 className="text-muted">
              Total Customers
            </h5>

            <h1>{dashboard.total_customers}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h5 className="text-muted">
              Total Orders
            </h5>

            <h1>{dashboard.total_orders}</h1>
          </div>
        </div>

      </div>

      <div className="mt-5">

        <h3>Low Stock Products</h3>

        <table className="table table-striped table-hover shadow">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>

            {dashboard.low_stock_products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.stock_quantity}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;