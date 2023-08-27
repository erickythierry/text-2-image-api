FROM node:18.14.2-alpine
WORKDIR /app
RUN apk update && apk add --no-cache build-base \
    cairo-dev pango-dev jpeg-dev libjpeg-turbo-dev giflib-dev \ 
    librsvg-dev git
RUN apk --no-cache add msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f
COPY package*.json ./
RUN npm install
COPY ./ /app
ENV PORT 80
CMD [ "npm", "start" ]