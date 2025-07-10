import { APIRequestContext, expect } from '@playwright/test';
import { weatherConfig } from '../utlis/config';

export class OpenWeatherAPI {
  constructor(private readonly api: APIRequestContext) {}

  // Fetch current weather data for the given city
  async getTemperatureFor(city: string) {
    const response = await this.api.get(`${weatherConfig.baseUrl}`, {
      params: {
        q: city,
        APPID: weatherConfig.apiKey,
        units: 'metric'
      }
    });
  
    // Validate the response status
    expect(response.status()).toBe(200);
  
    // Ensure the body is not empty
    const body = await response.body();
    expect(body.byteLength).toBeGreaterThan(0);
  
    return response;
  }
  
}
