const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 5000,
  use: {
    baseURL: 'https://erickwendel.github.io',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
