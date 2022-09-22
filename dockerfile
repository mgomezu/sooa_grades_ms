FROM node:13

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4545

CMD ["npm",  "run", "serve"]