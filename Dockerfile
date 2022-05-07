# build environment
FROM node:14.17.6-alpine3.13 as build-stage
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn install --prefer-offline --frozen-lockfile
COPY ./ /app/
RUN yarn build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21.1
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf