FROM nginx:1.23.1-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /app/

COPY dist/ai-art .


EXPOSE 80
