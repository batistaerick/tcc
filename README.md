# Budget Manager Application

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
   - [Required Software](#required-software)
   - [Environments](#prerequisites)
   - [Dependencies](#prerequisites)
   - [PEM Key](#pem-key)
3. [How to use](#how-to-use)
4. [Backend Swagger](#backend-swagger)
5. [Credits](#credits)

# Introduction

Welcome to the Budget Manager Application! This versatile financial tool is designed to help you take control of your finances. This application provides a comprehensive set of features that make it easy to manage your income, expenses, and financial goals.

# Prerequisites

## Required Software

To run this application locally, you will need the following:

- Java 17
- Maven
- PostgreSQL 16^
- Node 18^

## Environments

### Backend

Inside the **_resources/application.properties_** file, you will find the following environments. _You may need to modify it for your specific configurations_.

```env
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=123456789
spring.jpa.hibernate.ddl-auto=update
springdoc.swagger-ui.path=/api-doc
rsa.private-key=classpath:certs/private.pem
rsa.public-key=classpath:certs/public.pem
```

### Frontend

You need to create a new file called **_.env.local_** inside the **_frontend_** folder and then set it with the following environments. You may need to modify it for your specific configurations.

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
NEXTAUTH_JWT_SECRET=YOUR_JWT_SECRET
NEXTAUTH_SECRET=YOUR_SECRET
```

## Dependencies

To download the dependencies **make sure you're inside the _`frontend`_ folder** and run the following command:

#### YARN

```bash
yarn
```

#### NPM

```bash
npm i
```

## PEM Key

To create the .pem file, **make sure you're inside the _`backend`_ folder** and run the following commands:

```bash
cd src/main/resources/certs/
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```

# How to use

### Backend

To start the backend locally, **make sure you're inside the _`backend`_ folder** and run the following command:

```bash
mvn spring-boot:run
```

### Frontend

After starting the backend, **make sure you're inside the _`frontend`_ folder** and run the following command:

#### YARN

```bash
yarn dev
```

#### NPM

```bash
npm run dev
```

#### Once you have completed the setup, you can access and use the application by navigating to [http://localhost:3000](http://localhost:8080/api-doc), Enjoy! 😊

# Backend Swagger

After starting the application locally. The Swagger Documentation can be accessed
at [**http://localhost:8080/api-doc**](http://localhost:8080/api-doc). This documentation provides information about all accessible routes.

# Credits

- [Erick Batista Prado](https://github.com/batistaerick)
