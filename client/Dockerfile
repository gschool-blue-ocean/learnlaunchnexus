FROM node:16-alpine
WORKDIR /code
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD echo "JUST HERE FOR DEVELOPMENT!"
