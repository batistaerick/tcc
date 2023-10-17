FROM node:18
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
