FROM node:18-alpine AS development

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./wait-for-it.sh /src/app/wait-for-it.sh

RUN chmod +x /src/app/wait-for-it.sh

RUN npm run build

################
## PRODUCTION ##
################
FROM node:18-alpine AS production

ARG NODE_ENV='production'
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src/app

COPY --from=development /src/app/ .

EXPOSE 3001

CMD [ "node" , "dist/main" ]
