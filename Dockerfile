FROM node:14.21 as build
WORKDIR /root
ARG SITE

ADD package.json yarn.lock lerna.json /root/
ADD packages /root/packages
ADD sites/$SITE /root/sites/$SITE
RUN yarn --pure-lockfile
ENV NODE_ENV production
RUN yarn build

FROM node:14.21-alpine
ENV NODE_ENV production
ENV PORT 80
ARG SITE
COPY --from=build /root /root
WORKDIR /root/sites/$SITE
ENTRYPOINT [ "node", "index.js" ]
