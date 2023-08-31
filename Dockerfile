# FROM node:18.14.2-alpine
# WORKDIR /app
# RUN apk update && apk add --no-cache build-base \
#     cairo-dev pango-dev jpeg-dev libjpeg-turbo-dev giflib-dev \ 
#     librsvg-dev git
# RUN apk --no-cache add msttcorefonts-installer fontconfig && \
#     update-ms-fonts && \
#     fc-cache -f
# COPY package*.json ./
# RUN npm install
# COPY ./ /app
# ENV PORT 80
# CMD [ "npm", "start" ]

FROM node:18.14.2

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential \
    libcairo2-dev libpango1.0-dev libjpeg-dev libjpeg-turbo8-dev \
    libgif-dev librsvg2-dev git

COPY package*.json ./

RUN npm install

COPY ./ /app

ENV PORT 80

CMD [ "npm", "start" ]
