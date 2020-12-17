FROM registry.redhat.io/ubi8/nodejs-12:1-64

# Установка необходимых пакетов
COPY package.json .
RUN  npm install

COPY app.js .

#переменная окружения передающаяся внутрь контейнера
ENV PORT 3000

# Определение порта контейера, который будет открыт
EXPOSE 3000

# Команда, которая будет выполняться в контейнере
CMD ["npm", "start"]
