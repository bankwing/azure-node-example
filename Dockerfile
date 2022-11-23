FROM node:16-alpine3.13 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev

# FROM gcr.io/distroless/nodejs16-debian11:nonroot
# COPY --from=build-env /app /app
# WORKDIR /app
# CMD ["server.js"]

FROM node:16-alpine3.13
COPY --from=build-env /app /app
WORKDIR /app
USER node
ENTRYPOINT ["node", "server.js"]