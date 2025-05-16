## Home Cook Food Delivery Platform - Authentication & Cart API

A Node.js Express backend for a hyperlocal food delivery platform that connects home chefs with nearby customers.

## Features

User Authentication & Registration

Chef Authentication & Registration

JWT-based Authentication

Geolocation for proximity-based services

Cart Management System (Add, Update, Remove, View)

MongoDB Atlas integration

Express validator for request validation

## Tech Stack

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT (JSON Web Tokens)

Testing: Postman

Monitoring: MongoDB Compass

## Project Structure

|-- config/
| |-- db.js
|-- controllers/
| |-- userController.js
| |-- chefController.js
| |-- cartController.js
|-- middleware/
| |-- auth.js
| |-- validator.js
| |-- cartValidator.js
|-- models/
| |-- User.js
| |-- Chef.js
| |-- Cart.js
|-- routes/
| |-- auth.js
| |-- cart.js
|-- .env
|-- package.json
|-- server.js

## Installation

Clone the repository:

bash

git clone <repo-url>
cd home-cook-food-delivery
Install dependencies:

bash

npm install
Create a .env file:

ini

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Run the server:

bash

npm run dev
API Endpoints
🔐 User Authentication
✅ See previous documentation above (Register, Login, Get Profile).

🍳 Chef Authentication
✅ See previous documentation above (Register, Login, Get Profile).

🛒 Cart API (Authenticated User Only)
Add to Cart
URL: POST /api/cart/add

Headers: x-auth-token: <jwt_token>

Body:

json

{
"chefId": "663e1372e83f5040dc26411e",
"items": [
{
"dishId": "dish001",
"name": "Paneer Butter Masala",
"price": 200,
"quantity": 2
},
{
"dishId": "dish002",
"name": "Tandoori Roti",
"price": 20,
"quantity": 5
}
]
}
Response: Updated cart object.

Get Cart
URL: GET /api/cart

Headers: x-auth-token: <jwt_token>

Response: Current user's cart with all items.

Update Cart Item
URL: PUT /api/cart/update/:itemId

Headers: x-auth-token: <jwt_token>

Body:

json

{
"quantity": 3
}
Note: itemId is the internal MongoDB cart item \_id (not dishId).

Remove Cart Item
URL: DELETE /api/cart/remove/:itemId

Headers: x-auth-token: <jwt_token>

Clear Cart
URL: DELETE /api/cart/clear

Headers: x-auth-token: <jwt_token>

Response: Success message after cart is cleared.

🧪 Testing with Postman
Same flow as Auth testing. After login, copy the token and use it in:

x-auth-token header

Or use Postman environment variable {{token}}

🗂️ Cart API Summary
Action Method Endpoint Auth Required Body
Add to Cart POST /api/cart/add ✅ ✅
Get Cart GET /api/cart ✅ ❌
Update Cart Item PUT /api/cart/update/:itemId ✅ ✅
Remove Cart Item DELETE /api/cart/remove/:itemId ✅ ❌
Clear Cart DELETE /api/cart/clear ✅ ❌

📜 License
MIT License
