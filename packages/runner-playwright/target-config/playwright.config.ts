import { defineConfig, devices } from "@playwright/test";
import { buildConfig } from "@uuv/playwright";

export default defineConfig({
  testDir: buildConfig(
    ["e2e/*.feature"]
  ),
  testMatch: ["**/*.spec.ts", "**/*.{ts,js}"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  outputDir: "reports/playwright",
  workers: 1,
  reporter: "@uuv/playwright/uuv-playwright-reporter",
  use: {
    baseURL: process.env.UUV_BASE_URL ? process.env.UUV_BASE_URL : "http://localhost:4200",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
