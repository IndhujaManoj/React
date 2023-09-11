# set the base image to Debian
FROM debian:11 as build

# set the Work Dir
WORKDIR /build-dir

# Copy the source code 
COPY . /build-dir/

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.18.1

# install nvm
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use $NODE_VERSION

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# install npm & run build
RUN npm install
RUN npm run build

# set the base image for application
FROM nginx:1.20

# copy the build & config files
COPY --from=build /build-dir/build /usr/share/nginx/html
COPY devops/.prod-nginx  /etc/nginx/conf.d/api.conf