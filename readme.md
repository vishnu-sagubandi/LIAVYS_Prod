# LIAVYS - Design with Dignity

A fully featured Ecommerce webapp built with Django 3.2.5, Python 3.8.5, React and Braintree payments.

[![Python 3.8.5](https://img.shields.io/badge/python-3.8-yellow.svg)](https://www.python.org/downloads/release/python-360/)
![Django 3.2](https://img.shields.io/badge/Django-3.2-green.svg)
![Braintree 4.11](https://img.shields.io/badge/Braintree-4.11-yellow.svg)

### Live at https://liavys.herokuapp.com/

## Features Included

- Custom Admin dashboard
- Search Functionality
- Shopping Cart
- Product reviews and ratings
- Card,Gpay payments
- User profile with orders
- Admin product management
- Admin user management
- Admin order management
- Responsive, mobile-friendly design
- JWT authentication (JSON web tokens)
- Redux State Management
- Much more...

## Setup Instructions

**1.clone Repository & Install Packages**

```sh
git clone https://github.com/vishnu-sagubandi/LIAVYS_BACKEND.git
virtualenv env
cd env/bin/activate
pip install -r requirements.txt
```

**2.Change Database & Staticfiles configuration**

- Comment out django-storages & postgresql configuration in `settings.py` file

**3.Migrate & Start Server**

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Setting up React (Optional)

```sh
cd frontend
npm install
npm start
```

## Previews

Home Page
![Home Page](screenshots/home.png)
Shop Page
![Shop Page](screenshots/shop.png)
Product Page
![Product Page](screenshots/product.png)
Cart Page
![Product Page](screenshots/cart.png)
Shipping Page
![Product Page](screenshots/shipping.png)
Checkout Page
![Product Page](screenshots/checkout1.png)
Signup Page
![Product Page](screenshots/signup.png)
Login Page
![Product Page](screenshots/login.png)
Profile Page
![Product Page](screenshots/profile.png)
Order details Page
![Product Page](screenshots/order.png)
Admin users list Page
![Product Page](screenshots/users.png)
Admin products list Page
![Product Page](screenshots/orders.png)
Admin orders list Page
![Product Page](screenshots/orders.png)
Page 404
![Page 404](screenshots/404.png)

# Thank You
