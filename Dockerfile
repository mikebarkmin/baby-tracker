FROM node:12 as client
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV REACT_APP_SERVER /
COPY client/package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY client /usr/src/app
RUN npm run build

FROM node:12 as server 
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV production
COPY server/package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install --only=dev
COPY server /usr/src/app
RUN npm run build


FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --from=server /usr/src/app/build /usr/src/app
RUN mkdir -p /usr/src/app/client
COPY --from=client /usr/src/app/build /usr/src/app/client

EXPOSE 8080

CMD [ "node", "server.js" ]
