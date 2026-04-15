const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test('can open the example app and load the homepage', async ({ page }) => {
  await page.goto('/vanilla-js-web-app-example/', {
    waitUntil: 'commit',
    timeout: 5000,
  });
  await expect(page.getByRole('textbox', { name: /image title/i })).toBeVisible();
  await expect(page).toHaveTitle('TDD Frontend Example');
  await expect(page.locator('input#title')).toBeVisible();
  await expect(page.locator('input#imageUrl')).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'AI Alien' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'Predator Night Vision' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'ET Bilu' })).toBeVisible();
});

test('submits the form and appends a new card', async ({ page }) => {
  await page.goto('/vanilla-js-web-app-example/', {
    waitUntil: 'commit',
    timeout: 5000,
  });
  await expect(page.getByRole('textbox', { name: /image title/i })).toBeVisible();

  const newTitle = `Test Image ${Date.now()}`;
  const newImageUrl = 'https://via.placeholder.com/300x200.png?text=Playwright';

  await page.getByRole('textbox', { name: /image title/i }).fill(newTitle);
  await page.getByRole('textbox', { name: /image url/i }).fill(newImageUrl);
  await page.getByRole('button', { name: /submit form/i }).click();

  await expect(page.getByRole('heading', { level: 4, name: newTitle })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /image title/i })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: /image url/i })).toHaveValue('');
});

test('validates required form fields before submitting', async ({ page }) => {
  await page.goto('/vanilla-js-web-app-example/', {
    waitUntil: 'commit',
    timeout: 5000,
  });
  await expect(page.getByRole('textbox', { name: /image title/i })).toBeVisible();

  await page.getByRole('button', { name: /submit form/i }).click();

  await expect(page.getByRole('textbox', { name: /image title/i })).toBeFocused();
  await expect(page.locator('form.needs-validation')).toHaveClass(/was-validated/);

  const titleValidity = await page.getByRole('textbox', { name: /image title/i }).evaluate((input) => input.checkValidity());
  expect(titleValidity).toBe(false);
});
