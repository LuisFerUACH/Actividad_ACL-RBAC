FROM node
MAINTAINER Luis Fdo Felix Mata
WORKDIR /app
COPY ..
RUN npm install
EXPOSE 3000
CMD npm start
