# E-commerce applictaion

A simple E-commercing applictaion that allows you to put products out for sale from an admin page, and then for users to see them and shop!

## Features
- **From admin side**
- Add new products, providing a price, description, picture, discount
- Manage products and users
- **From user side**
- Authorize
- View items
- Add items to cart
- Order items (requiers authorization)

## Prerequisites
- **Python 3.6+**
- **npm**
- **node.js**

## Setup

1. Clone the repository:
```
git clone https://github.com/dayzyy/API-EcommerceApp.git
```
2. Navigate to the api folder in the created directory:
```
cd API-EcommerceApp/api/
```
3. Create a virtual environment:
```
python -m venv .env
```
4. Activate it:
```
source .env/bin/activate
```
5. Install all the dependecies:
```
pip install -r requirements.txt
```
6. Set up the database tables:
```
python manage.py migrate
```
8. Create a superuser to access the admin page
```
python manage.py createsuperuser
```
7. Run the server:
```
python manage.py runserver
```
Now you can visit the server, login with your superuser and add new products!

To run the client side server:
1. Open another terminal and navigate to the frontend directory:
```
cd API-EcommerceApp/frontend/
```
2. Install all the dependecies:
```
npm install
```
3. Run the server:
```
npm run dev
```
You are all set! You can now visit the server and have happy shooping!
