// import { defineStore } from 'pinia';

// interface Weather {
//   main: {
//     temp: number;
//     temp_min: number;
//     temp_max: number;
//     feels_like: number;
//     humidity: number;
//   };
//   weather: Array<{
//     main: string;
//     description: string;
//     icon: string;
//   }>;
//   visibility: number;
//   wind: {
//     speed: number;
//     deg: number;
//   };
//   clouds: {
//     all: number;
//   };
//   name: string;
//   sys: {
//     country: string;
//   };
// }

// export const useWeatherStore = defineStore('weather', {
//   state: () => ({
//     hour: '',
//     api_key: 'e0a656d67fafac879c5358ea14956d1d',
//     url_base: 'https://api.openweathermap.org/data/2.5/',
//     query: '',
//     weather: {} as Weather,
//   }),
//   actions: {
//     async fetchWeatherByCoordinates(latitude: number, longitude: number) {
//       try {
//         const response = await fetch(
//           `${this.url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${this.api_key}`
//         );
//         const data = await response.json();
//         console.log(data);
//         this.weather = data;
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     },
//   },
// });
