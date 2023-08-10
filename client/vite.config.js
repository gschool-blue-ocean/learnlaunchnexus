<<<<<<< Updated upstream
export default {
  root: "src",
  server: {
    proxy: {
      "/api": process.env.API_URL,
    },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: false,
  },
};
=======
export default {
  root: "src",
  server: {
    proxy: {
      "/api": process.env.API_URL,
    },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: true,
  },
};
>>>>>>> Stashed changes
