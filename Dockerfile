FROM node:14.21 as build
WORKDIR /repo
ARG SITE

ADD package.json yarn.lock lerna.json /repo/
ADD packages /repo/packages
ADD sites/$SITE /repo/sites/$SITE
RUN --mount=type=cache,target=/repo/.yarn YARN_CACHE_FOLDER=/repo/.yarn yarn install --frozen-lockfile
ENV NODE_ENV production
RUN yarn build

FROM node:14.21-alpine
ENV NODE_ENV production
ENV PORT 80
ARG SITE
COPY --from=build /repo /repo
WORKDIR /repo/sites/$SITE
ENTRYPOINT [ "node", "index.js" ]
