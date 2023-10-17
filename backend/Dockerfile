FROM openjdk:17-alpine AS build
WORKDIR /app
COPY . .
RUN apk add --no-cache openssl && \
    mkdir -p src/main/resources/certs && \
    openssl genrsa -out src/main/resources/certs/keypair.pem 2048 && \
    openssl rsa -in src/main/resources/certs/keypair.pem -pubout -out src/main/resources/certs/public.pem && \
    openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in src/main/resources/certs/keypair.pem -out src/main/resources/certs/private.pem
RUN sed -i -e 's/\r$//' mvnw
RUN chmod +x mvnw
RUN ./mvnw clean package

FROM openjdk:17-alpine
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
