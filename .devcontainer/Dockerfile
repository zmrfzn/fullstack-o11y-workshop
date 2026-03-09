FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install postgresql-client so sequelize-cli db:create works
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Install New Relic Infrastructure Agent
RUN export ARCH=$(dpkg --print-architecture) \
    && export CODENAME=$(grep VERSION_CODENAME /etc/os-release | cut -d= -f2 || echo "bookworm") \
    && curl -s https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/newrelic-infra.gpg \
    && echo "deb [arch=$ARCH] https://download.newrelic.com/infrastructure_agent/linux/apt $CODENAME main" | tee /etc/apt/sources.list.d/newrelic-infra.list \
    && apt-get update && apt-get install -y newrelic-infra

# Copy New Relic Infrastructure config
COPY newrelic-infra.yml /etc/newrelic-infra.yml

# Install flog for log generation exercise
RUN curl -L -o /tmp/flog.tar.gz https://github.com/mingrammer/flog/releases/download/v0.4.3/flog_0.4.3_linux_amd64.tar.gz \
    && tar -xzf /tmp/flog.tar.gz -C /tmp/ \
    && mv /tmp/flog /usr/local/bin/flog \
    && chmod +x /usr/local/bin/flog \
    && rm /tmp/flog.tar.gz
