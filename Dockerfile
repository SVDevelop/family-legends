### STAGE 1: Build  ----------------------------------------------------------------------------------------------------
FROM node:12-alpine as builder

COPY package.json package-lock.json ./
#COPY patches ./patches

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci --unsafe-perm --quiet && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
#RUN node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --configuration=production

# version of application && sha of git
ARG VERSION
ARG BUILD
ARG TARGETENV

#RUN npm run build --aot --configuration=$TARGETENV
RUN node --max-old-space-size=4096 ./node_modules/.bin/ng build --aot --configuration=$TARGETENV

LABEL version=$VERSION build=$BUILD mode=$TARGETENV


### STAGE 2: Setup  ----------------------------------------------------------------------------------------------------
FROM nginx:mainline

EXPOSE 80

# version of application && sha of git
ARG VERSION
ARG BUILD
ARG TARGETENV

LABEL version=$VERSION build=$BUILD mode=$TARGETENV

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/family-legends /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
