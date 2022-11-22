FROM node:slim
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app
ENV PORT 80
RUN npm install && npm cache clean --force
CMD [ "npm", "start" ]