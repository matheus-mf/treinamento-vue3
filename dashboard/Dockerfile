FROM node:13-alpine as build

RUN npm install --global yarn

WORKDIR /

COPY . .

ENV NODE_ENV=production
ENV VUE_APP_API_BASE_URL=https://feedbacker-api.matheusmf.dev

RUN yarn install --production
RUN yarn build

FROM nginx:1.18-alpine as final

WORKDIR /
COPY --from=build ./dist /user/share/nginx/html