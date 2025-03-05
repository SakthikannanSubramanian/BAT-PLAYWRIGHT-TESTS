FROM mcr.microsoft.com/playwright:v1.41.1-focal

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx playwright install --with-deps

ENV ALLURE_RESULTS_DIR=/app/reports

CMD ["npx", "playwright", "test", "--project=chrome", "--shard=1/2", "--output=reports"]
