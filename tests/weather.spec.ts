import { test, expect, request } from '@playwright/test';
import { OpenWeatherAPI } from '../api/ApiPage';

test('Scenario 3: Get current weather of Islamabad and validate temperature', async () => {
  const apiContext = await request.newContext();

  const weatherApi = new OpenWeatherAPI(apiContext);

  const response = await weatherApi.getTemperatureFor('Islamabad');

  const data = await response.json();
  expect(data.name).toBe('Islamabad');

  const temperature = data.main.temp;
  expect(typeof temperature).toBe('number');

  console.log(`🌤️ Current temperature in Islamabad: ${temperature}°C`);
});
