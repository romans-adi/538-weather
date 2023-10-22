<template>
  <div :id="hour" class="bg-cover bg-top flex-1 bg-opacity-70 absolute h-full w-full z-[-1]" :class="getWeatherClass()"> </div>
    <div class="search-box w-full pt-8 mb-8 flex justify-center z-40">
      <input
        type="text"
        class="search-bar block p-4 text-xl border-none outline-none appearance-none text-sky-900 placeholder:text-gray-500 placeholder:tracking-wide rounded-tr-2xl rounded-bl-2xl"
        placeholder="Type your place..."
        v-model="query"
        @keypress="fetchWeather"
      />
    </div>
    <div class="weather-wrap z-40 flex flex-1 justify-center flex-col" v-if="typeof weather.main != 'undefined'">
      <div>
        <div class="location text-white text-4xl font-medium text-center mb-3">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="date italic text-center text-xl font-light text-lime-50">{{ momentNow() }}</div>
      </div>
      <div class="weather-box container mx-auto text-center flex flex-wrap justify-center">
        <div class="temp text-white py-2.5 md:px-6 lg:px-0 rounded-2xl self-center w-full md:w-9/12 whitespace-nowrap my-4">
          <div class="weather text-white font-bold uppercase">
            <div class="weather-main mb-3">{{ weather.weather[0].main }}</div>
            <div class="weather-desc italic">{{ weather.weather[0].description }}</div>
          </div>
        </div>
        <div class="flex w-full gap-6 justify-center temp-additional">
          <div class="p-1 lg:p-4 text-center uppercase">
            <div class="temp-min flex-auto inline-block py-1 px-3 text-white font-semibold rounded-lg my-4 mx-0">
              <h5 class="text-white font-medium">Min</h5>
              {{ Math.round(weather.main.temp_min) }}°c
            </div>
          </div>
          <div class="temp-block flex justify-center text-6xl items-center gap-4">
            <img v-bind:src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" />
            <div class="main-temp p-1 text-white">{{ Math.round(weather.main.temp) }}°c</div>
          </div>
          <div class="p-1 lg:p-4 text-center uppercase">
            <div class="temp-max flex-auto inline-block py-1 px-3 text-white font-semibold rounded-lg my-4 mx-0">
              <h5 class="text-white font-medium">Max</h5>
              {{ Math.round(weather.main.temp_max) }}°c
            </div>
          </div>
        </div>
        <div class="feels-like-temp font-bold w-full my-4 text-2xl px-1 text-blue-300 whitespace-normal" :class="{
          'text-sky-500': weather.main.feels_like > 0 && weather.main.feels_like < 7,
          'text-lime-200': weather.main.feels_like >= 7 && weather.main.feels_like < 18,
          'text-green-200': weather.main.feels_like >= 18 && weather.main.feels_like <= 25,
          'text-orange-200': weather.main.feels_like > 25 && weather.main.feels_like < 35,
          'text-red-400': weather.main.feels_like >= 35
        }">Feels like: {{ Math.round(weather.main.feels_like) }}°c</div>
        <div class="flex flex-col w-11/12">
          <div class="humidity text-white py-2.5 font-black rounded-2xl w-2/8" :class="{
            'text-red-400': weather.main.humidity <= 25 || weather.main.humidity >= 70,
            'text-orange-500': weather.main.humidity < 30 || (weather.main.humidity >= 60 && weather.main.humidity < 70),
            'text-green-300': weather.main.humidity >= 30 && weather.main.humidity < 60
          }">Humidity: {{ weather.main.humidity }}%</div>
          <div class="visibility text-white py-2.5 md:px-6 font-black mx-0 mt-3 mb-1 rounded-2xl w-2/8" :class="{
            'text-red-500': weather.visibility <= 200,
            'text-orange-500': weather.visibility <= 2000,
            'text-lime-500': weather.visibility <= 10000
          }">Visibility: {{ (weather.visibility / 1000).toFixed(1) }} km</div>
          <div class="wind text-white py-2.5 md:px-6 font-black mx-0 mt-3 mb-1 rounded-2xl w-2/8" :class="{
            'text-yellow-500': weather.wind.speed <= 47 && weather.wind.speed > 27,
            'text-lime-500': weather.wind.speed <= 27 && weather.wind.speed > 16,
            'text-green-500': weather.wind.speed <= 16 && weather.wind.speed > 11,
            'text-blue-300': weather.wind.speed <= 11 && weather.wind.speed > 0,
            'text-red-400': weather.wind.speed > 47
          }">Wind: <span class="mr-2">{{ weather.wind.speed }} m/s</span> {{ degToCompass(weather.wind.deg) }}</div>
          <div class="cloudiness text-white py-2.5 md:px-6 font-black mx-0 mt-3 mb-1 rounded-2xl w-2/8" :class="{
            'text-red-400': weather.clouds.all >= 80,
            'text-orange-500': weather.clouds.all >= 60 && weather.clouds.all < 80,
            'text-lime-500': weather.clouds.all >= 60 && weather.clouds.all <= 40,
            'text-green-500': weather.clouds.all >= 15 && weather.clouds.all < 40,
            'text-blue-200': weather.clouds.all < 15
          }">Cloudiness: {{ weather.clouds.all }} %</div>
        </div>
      </div>
    </div>

</template>

<script >
import moment from 'moment';

export default {
  name: 'WeatherForecast',
  data() {
    return {
      hour: '',
      api_key: 'e0a656d67fafac879c5358ea14956d1d',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key === 'Enter') {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => res.json())
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    momentNow() {
      return moment().format('LLLL');
    },
    degToCompass(num) {
      let val = Math.floor((num / 22.5) + 0.5);
      let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[val % 16];
    },
    getNow() {
      const today = new Date();
      let hours = today.getHours();
      this.hour = hours > 5 && hours < 20 ? 'wrapper' : 'wrapper-night';
    },
    getWeatherClass() {
      if (this.weather && this.weather.weather && this.weather.weather.length > 0) {
        const weatherMain = this.weather.weather[0].main;
        return {
          mist: weatherMain === 'Mist',
          clear: weatherMain === 'Clear',
          clouds: weatherMain === 'Clouds',
          rain: weatherMain === 'Rain',
          drizzle: weatherMain === 'Drizzle',
          thunder: weatherMain === 'Thunderstorm',
          snow: weatherMain === 'Snow'
        };
      } else {
        return {};
      }
    }
  },
  mounted() {
    this.getNow();
  }
};
</script>
