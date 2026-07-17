# 📚 Library Management System (Backend)

A RESTful API for a **Library Management System** built using **Node.js, Express.js, MongoDB, and Mongoose** following the **MVC Architecture**. The project includes JWT Authentication, Role-Based Authorization, CRUD operations for books, and API testing using Thunder Client/Postman.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Admin & User Roles
- Add Book
- Update Book
- Delete Book
- Get All Books
- Get Single Book
- MongoDB Database Integration
- MVC Architecture
- Environment Variables
- Error Handling
- Validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv
- Thunder Client / Postman

---

## 📁 Project Structure

```
Library-Management-System/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── bookController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   ├── User.js
│   └── Book.js
│
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/library-management-system.git
```

### Navigate to Project

```bash
cd library-management-system
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a **.env** file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the Server

```bash
npm run dev
```

or

```bash
npm start
```

---

## 🔐 Authentication APIs

### Register User

**POST**

```
/api/auth/register
```

### Login User

**POST**

```
/api/auth/login
```

---

## 📚 Book APIs

### Add Book (Admin)

**POST**

```
/api/books
```

### Get All Books

**GET**

```
/api/books
```

### Get Single Book

**GET**

```
/api/books/:id
```

### Update Book (Admin)

**PUT**

```
/api/books/:id
```

### Delete Book (Admin)

**DELETE**

```
/api/books/:id
```

---

## 🔒 Authentication

This project uses **JWT Authentication**.

After logging in, include the token in the Authorization header.

```
Authorization: Bearer <your_token>
```

---

## 📌 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 API Testing

You can test all APIs using:

- Thunder Client
- Postman

Testing Order:

1. Register User
2. Login User
3. Add Book
4. Get All Books
5. Get Single Book
6. Update Book
7. Delete Book

---

## 📸 Sample Output

### Login

```json
{
  "message": "Login Successful",
  "token": "JWT_TOKEN"
}
```

### Add Book

```json
{
  "title": "unfinished",
  "author": "Priyanka Chopra",
  "category": "motivational",
  "isbn": "9789381234567",
  "availableCopies": 10
}
```

---

## 👩‍💻 Author

**Gouri Kalagate**

Bachelor of Computer Applications (BCA)

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
