FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY dist/movies-app/browser/* .
EXPOSE 80