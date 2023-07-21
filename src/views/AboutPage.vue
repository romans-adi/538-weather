<template>
  <div class="about-page flex flex-1 bg-cover bg-bottom min-h-screen" :class="getBackgroundClass()">
    <div class="bg-slate-200 container-opaque">
      <div class="mx-auto flex flex-col p-20 font-semibold">
    <h2 class="text-3xl font-bold mb-4 opacity-100">About This App</h2>
    <p class="text-md mb-2 opacity-100">
      Welcome to our weather forecasting application! This app is designed to provide accurate and real-time weather information for any location across the globe. With a user-friendly interface and visually appealing design, you can easily access weather updates and plan your activities accordingly.
    </p>
<hr class="border-black"/>
    <h2 class="text-3xl py-3 font-bold mb-4 opacity-100">Acknowledgments</h2>
    <p class="text-md mb-2 opacity-100">
      We extend our heartfelt gratitude to <strong>OpenWeatherAPI</strong> for providing the essential weather data that powers this application. Their reliable and comprehensive API allows us to deliver precise weather forecasts to our users.
    </p>
    <p class="text-lg mb-2 opacity-100">
      We would also like to express our appreciation to the creators of <strong>Vue.js</strong>, the framework that drives the frontend of this app. Vue.js enables us to build responsive and dynamic user interfaces, ensuring a seamless experience for all our users.
    </p>
    <hr class="border-black"/>
    <h2 class="text-3xl py-3 font-bold mb-4 opacity-100">About the Author</h2>
    <p class="text-md mb-2 opacity-100">
      I am a versatile software developer with a strong background in UI/UX design, HTML, CSS, PHP, and MySQL. My expertise lies in leveraging my UI/UX skills and proficiency in HTML, CSS, PHP, and MySQL to deliver high-quality web solutions. Driven by a passion for continuous learning, I stay updated with the latest industry trends and technologies.
    </p>
    <p class="text-md opacity-100">
      Currently, I am actively seeking new opportunities in the software engineering field where I can contribute my skills and knowledge. If you are looking for a dedicated and adaptable developer who can bring unique perspectives to your team, I would love to discuss how I can add value to your organization.
    </p>
  </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  methods: {
    getBackgroundClass() {
      const now = moment();
      const hour = now.hours();
      return hour >= 6 && hour < 18 ? 'bg-day' : 'bg-night';
    },
  },
};
</script>
