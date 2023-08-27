FROM node:18
WORKDIR /app
RUN apt update
COPY package*.json ./
RUN npm install
COPY ./ /app
ENV PORT 80
CMD [ "npm", "start" ]