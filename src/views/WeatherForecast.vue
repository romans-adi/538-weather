<template>
  <div :id="hour" class="bg-cover bg-bottom h-full" :class="getWeatherClass()">

    <div class="search-box w-full pt-8 mb-8 flex justify-center">
      <input
        type="text"
        class="search-bar block p-4 text-xl border-none outline-none appearance-none text-sky-900 placeholder:text-gray-500 placeholder:tracking-wide rounded-tr-2xl rounded-bl-2xl w-1/2"
        placeholder="Type your place..."
        v-model="query"
        @keypress="fetchWeather"
      />
    </div>

    <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
      <div class="location-box bg-bg-slate-900">
        <div class="location text-white text-6xl font-medium text-center mb-3">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="date italic text-center text-xl font-light text-lime-50">{{ momentNow() }}</div>
      </div>

      <!-- Rest of the weather information -->
      <!-- ... -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
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
        return {}; // Return an empty object if weather data is not available yet.
      }
    }
  },
  mounted() {
    this.getNow();
  }
};
</script>
