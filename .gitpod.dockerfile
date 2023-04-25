FROM gitpod/workspace-full:latest

# optional: use a custom Nginx config.
COPY nginx.conf /workspace/nginx-example/nginx/nginx.conf

# optional: change document root folder. It's relative to your git working copy.
ENV NGINX_DOCROOT_IN_REPO="www"
