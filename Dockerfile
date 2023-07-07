FROM node:18-alpine
WORKDIR /app
COPY ./ /app
RUN apk update && apk add python3
ENV PORT 80
RUN npm install
CMD [ "npm", "start" ]