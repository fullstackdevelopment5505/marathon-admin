FROM node:16-alpine
ENV NPM_TOKEN=$NPM_TOKEN_READ_ONLY
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]