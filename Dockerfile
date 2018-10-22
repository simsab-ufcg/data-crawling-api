FROM node:8.11.4

RUN mkdir -p /usr/src/node/app

WORKDIR /usr/src/node/app

# Install deps
COPY ./package* ./
RUN npm install && \
    npm cache clean --force

COPY . .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000

# Start the app
CMD npm start