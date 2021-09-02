# Dockerfile extending the generic Node image with application files for a
# single application.
FROM node:10.15.3

MAINTAINER "Jaime Cardona <jcardonavillegas@gmail.com>"

RUN wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
  && dpkg -i /tmp/libpng12.deb \
  && rm /tmp/libpng12.deb

# RUN npm i -g yarn
RUN chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js
RUN mkdir /app
RUN mkdir /app/src
WORKDIR /app
COPY source /app/source
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .babelrc /app/.babelrc
ADD .npmrc /root
RUN yarn install
RUN yarn build
EXPOSE 8081


CMD [ "npm", "start" ]


