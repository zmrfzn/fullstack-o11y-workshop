FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm

# Install postgresql-client so sequelize-cli db:create works
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Install flog for log generation exercise
RUN curl -L -o /tmp/flog.tar.gz https://github.com/mingrammer/flog/releases/download/v0.4.3/flog_0.4.3_linux_amd64.tar.gz \
    && tar -xzf /tmp/flog.tar.gz -C /tmp/ \
    && mv /tmp/flog /usr/local/bin/flog \
    && chmod +x /usr/local/bin/flog \
    && rm /tmp/flog.tar.gz
