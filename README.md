# Inventory Management System

A full-stack Inventory Management System built using FastAPI, React (Vite), PostgreSQL, Render, and Vercel.

## Live Demo

### Frontend
https://inventory-management-system-nu-drab.vercel.app

### Backend
https://inventory-backend-fot7.onrender.com

### API Documentation
https://inventory-backend-fot7.onrender.com/docs

---

## Features

### Product Management
- Create Product
- View Products
- Update Product
- Delete Product

### Customer Management
- Create Customer
- View Customers
- Delete Customer

### Order Management
- Create Orders
- View Orders
- Delete Orders

### Dashboard
- Total Products
- Total Customers
- Total Orders

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Material UI

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- PostgreSQL

### Deployment
- Vercel (Frontend)
- Render (Backend)
- Render PostgreSQL (Database)

---

## Project Structure

```text
inventory-management-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
│
└── README.md
```

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd inventory-management-system
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

Create `.env`

```env
DATABASE_URL=your_postgresql_connection_string
```

### Frontend

Create `.env`

```env
VITE_API_BASE_URL=https://inventory-backend-fot7.onrender.com
```

---

## API Endpoints

### Products

```text
GET    /products
POST   /products
GET    /products/{id}
PUT    /products/{id}
DELETE /products/{id}
```

### Customers

```text
GET    /customers
POST   /customers
GET    /customers/{id}
DELETE /customers/{id}
```

### Orders

```text
GET    /orders
POST   /orders
DELETE /orders/{id}
```

### Dashboard

```text
GET /dashboard
```

---

## Deployment

### Frontend
Deployed on Vercel

### Backend
Deployed on Render

### Database
PostgreSQL hosted on Render

---

## Author

Harshal Shah
