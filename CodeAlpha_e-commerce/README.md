# MERN E-Commerce Project

A full-stack e-commerce web application built using **MERN stack** (MongoDB, Express.js, React.js, Node.js) with user authentication, product listing, cart, and order management.

---

## Features

- **User Authentication:** Signup and login with hashed passwords.
- **Products:** Display products from MongoDB database.
- **Cart:** Add/remove products, manage quantity in frontend context.
- **Checkout:** Place orders and store them in MongoDB.
- **Order History:** Users can view their past orders.
- **Responsive Design:** Clean UI compatible with desktop and mobile.

---

## Technologies Used

- **Frontend:** React.js, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **State Management:** React Context
- **API Testing:** Postman

---

## Project Structure

**Backend**
backend/
├── config/ # Database connection
├── controllers/ # API logic
├── models/ # Mongoose models (User, Product, Order)
├── routes/ # API routes
├── server.js # Express server
└── .env # Environment variables

**Frontend**
src/
├── components/ # React components (Navbar,ProductCard,Footer)
├── context/ # CartContext for state management
├── pages/(Cart,Checkout,Home,Login,Signup,ProductDetails)
├── services/ # API calls via axios (api.js)
├── App.jsx
└── main.jsx