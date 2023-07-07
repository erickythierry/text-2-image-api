FROM node:18-alpine
WORKDIR /app
COPY ./ /app
ENV PORT 80
RUN npm install
CMD [ "npm", "start" ]