# 📘 EduLite API Documentation

Welcome! 👋 This is the official API documentation for the EduLite project.  
It contains details about all available **CRUD operations** on products.

---

## 📌 Base URL

[https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD
](https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD)


---

## 📥 GET All Products

**Endpoint:**
```bash
GET /EduLite/api/CRUD
```

**Description:**  
Fetch all available products from the database.

**Sample Response:**

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "price": 799.99,
    "description": "A high-end gaming laptop"
  },
  ...
]
```
## ➕ POST Create Product

**Endpoint:**
```bash
POST /EduLite/api/CRUD
```
**Description:**
Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description"
}
```
**Sample Response:**
```json
{
  "id": "10",
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description"
}
```
## ✏️ PUT Update Product

**Endpoint:**
```bash
PUT /EduLite/api/CRUD/<product_id>
```

**Description:**
Update an existing product by its ID.

**Request Body:**
```json
{
  "name": "Updated Name",
  "price": 149.99,
  "description": "Updated description"
}
```

**Sample Response:**
```json
{
  "id": "10",
  "name": "Updated Name",
  "price": 149.99,
  "description": "Updated description"
}
```

## ❌ DELETE Product

**Endpoint:**
```bash
DELETE /EduLite/api/CRUD/<product_id>
```

**Description:**
Delete a product by its ID.

**Sample Response:**
```json
{
  "id": "10",
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description"
}
```
### ✅ Notes

- All requests and responses use **JSON** format.
- Be sure to set the header: `Content-Type: application/json`.
- The `id` is generated automatically by MockAPI.
- The API is public and does not require authentication.
- Please test all endpoints and ensure you're comfortable working with them.
- You may use **Postman**, **Axios**, or **Fetch** API to interact with the endpoints.

### Good luck and happy coding! 🚀


