# Budget Manager Application

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [How to use](#how-to-use)
   - [With Docker](#with-docker)
   - [With Maven](#with-maven)
4. [Swagger](#swagger)
5. [Credits](#credits)

# Introduction

Welcome to the Budget Manager Application! This versatile financial tool is designed to help you take control of your finances. This application provides a comprehensive set of features that make it easy to manage your income, expenses, and financial goals.

# Prerequisites

To run locally you need:

- Java 17
- Maven
- PostgreSQL - Need to reset the environments in **_resources/application.properties_** with your settings
- Node 18.x

# How to use

### Backend

Before launching the backend application, you need to create the .pem files with the following commands:

```bash
cd src/main/resources/certs/
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```

Then you can start the backend with the command:

```bash
mvn spring-boot:run
```

### Frontend

Before launching the frontend application, you need to download the dependencies with the command (**Using yarn**):

```bash
yarn
```

After starting the backend and downloading the frontend dependencies, you can start the frontend with the command:

```bash
yarn dev
```

# Backend Swagger

After starting the application locally. The Swagger Documentation can be accessed
at [**http://localhost:8080/api-doc**](http://localhost:8080/api-doc) and all accessible routes will be shown.

# Credits

- [Erick Batista Prado](https://github.com/batistaerick)
