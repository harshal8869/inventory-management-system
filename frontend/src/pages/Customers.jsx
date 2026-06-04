import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  const loadCustomers = () => {
    api.get("/customers")
      .then((response) => {
        setCustomers(response.data);
      });
  };

  useEffect(() => {
    loadCustomers();
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

      await api.post("/customers", {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone
      });

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

      loadCustomers();

    } catch (error) {
      alert(
        error.response?.data?.detail || "Error creating customer"
      );
    }
  };

  const deleteCustomer = async (id) => {

    if (!window.confirm("Delete customer?")) {
      return;
    }

    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    } catch (error) {
      alert("Error deleting customer");
    }
  };

  return (
    <div className="container mt-4">

<h2 className="mb-4">
  Customer Management
</h2>
<form
  onSubmit={handleSubmit}
  className="mb-4 card shadow p-4"
>
        <div className="row">

          <div className="col">
            <input
              className="form-control"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <button className="btn btn-primary">
              Add Customer
            </button>
          </div>

        </div>

      </form>

<table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((customer) => (
            <tr key={customer.id}>

              <td>{customer.id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>

              <td>
                <button
className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteCustomer(customer.id)}
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

export default Customers;