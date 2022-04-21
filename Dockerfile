FROM node:14.16.1-alpine AS development
EXPOSE 3000
ENV NODE_ENV development
WORKDIR /simple-connect
# ADD package.json /apps/core
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Start server
CMD [ "npm", "start" ]