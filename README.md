<img width="1439" alt="image" src="https://github.com/user-attachments/assets/2cafa7ec-1a79-4efc-bc83-f6f32d4c12ff">

# Library Management System - This documentation provides complete guide for installation and connection of djangoREST and react

## Overview

This project is a simple Library Management System built with Django and Django REST framework. It provides a foundational structure for managing books and their borrowing records.

This system enables users to perform CRUD (Create, Read, Update, Delete) operations related to borrowing books, managing users, creating reservations, managing Authors, Publishers, Book Categories providing a userfriendly interface for managing library records

## What is Django REST framework?

[Django REST framework (DRF)](https://www.django-rest-framework.org/) is a powerful and flexible toolkit for building Web APIs in Django. It is widely used for creating RESTful APIs and provides a range of features to facilitate this process. DRF extends Django’s capabilities by adding the tools needed to build, test, and maintain APIs efficiently, following best practices and helping developers to create robust and scalable backend systems.

## What is React?

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces, especially single-page applications where a responsive, dynamic user experience is essential. 

## Cloning the Repository

To clone this repository, use the following command:

```bash
[git clone https://github.com/yourusername/your-repository.git](https://github.com/sneha-at-hub/library-management.git)
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.6 or higher
- `pip` (Python package installer)

## Installation

Follow these steps to set up the project:

```bash
   pip install virtualenv
```

Create and activate a virtual environment:
```bash
virtualenv env
source env/bin/activate  # For macOS/Linux
# env\Scripts\activate  # For Windows
```
Install Django and Django REST framework:

```bash
pip install django
pip install djangorestframework
```

Start a new Django project:
```bash
django-admin startproject library
cd library
```
Create a new Django app:
```bash
django-admin startproject library
python3 manage.py startapp libraryapi
```
# Configuration
- Activate the Virtual Environment: Always activate the virtual environment before working on the project.
- Install Additional Packages: Use pip to install any additional packages while the virtual environment is active.

# Running the Server
To start the development server, use:
```bash
python3 manage.py runserver
```
Install the django-cors-headers package, which is used to handle Cross-Origin Resource Sharing (CORS) in Django projects to react

```bash
pip install django-cors-headers
```
Add to INSTALLED_APPS:
Include corsheaders in your INSTALLED_APPS list in settings.py:

```bash
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
```
Add Middleware:
Add CorsMiddleware to your MIDDLEWARE list, preferably at the top:
```bash
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
```
Configure CORS Settings:
You can now configure CORS settings in settings.py. For example, to allow all origins

```bash
CORS_ALLOW_ALL_ORIGINS = True
```
# Frontend Setup: React


## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (includes npm)
- Python 3.6 or higher
- `pip` (Python package installer)

## Installation

Follow these steps to set up the React frontend:

1. **Install Node.js and npm**

   Download and install Node.js from [nodejs.org](https://nodejs.org/). npm (Node Package Manager) will be installed automatically with Node.js.

2. **Create a new React application:**

   Navigate to the directory where you want to create your React app and run:
   
This command creates a new directory named frontend with a React project setup.
```bash
   npx create-react-app frontend
```
Navigate to the React app directory:
```bash
   cd frontend
```

To install all the dependencies listed in your package.json, you can run the following command in your React project's root directory:
```bash
npm install
```
## OR

Install additional packages such as react-router for routing or react-icons for icons, install them using npm one by one:
```bash
npm install react-router-dom
npm install react-icons
npm install bootstrap
npm install axios
```
# Contributing
If you would like to contribute to the project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/YourFeature).
- Make your changes and commit them (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/YourFeature).
- Create a new Pull Request.
