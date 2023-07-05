FROM node:18
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./
EXPOSE 3000

# start app
CMD ["npm", "start"]