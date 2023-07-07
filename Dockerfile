FROM node:slim
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app
ENV PORT 80
RUN npm install
CMD [ "npm", "start" ]