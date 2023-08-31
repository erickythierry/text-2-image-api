FROM node:18.14.2

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential \
    libpango1.0-dev python3 python3-pip fonts-noto

COPY package*.json ./

RUN npm install

COPY ./ /app

ENV PORT 80

CMD [ "npm", "start" ]
