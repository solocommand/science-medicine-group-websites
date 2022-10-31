FROM node:10.24 as build
WORKDIR /root
ENV NODE_ENV production
ARG SERVICE

ADD package.json yarn.lock /root/
ADD packages /root/packages
ADD services/$SERVICE /root/services/$SERVICE
RUN yarn --production --pure-lockfile

WORKDIR /root/services/$SERVICE

FROM node:10.24-alpine
ENV NODE_ENV production
ARG SERVICE
COPY --from=build /root /root
WORKDIR /root/services/$SERVICE
ENTRYPOINT [ "node", "." ]
