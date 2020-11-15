FROM alpine:3.9
WORKDIR /server
COPY ./package*.json ./
RUN apk add --update nodejs npm
RUN npm install
ENV MONGO_TOOLS_VERSION=4.0.5-r0
RUN apk add --no-cache mongodb-tools=${MONGO_TOOLS_VERSION} && \
    rm -rf /var/cache/apk/*
COPY . .
EXPOSE 3000
CMD ["node", "bin/www"]