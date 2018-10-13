<template>
  <div id="app">
    <div class="countdown">
      <v-progress-circular
      :rotate="-90"
      :size="50"
      :width="5"
      :value="timer"
      color="primary"
    >
      {{ timer }}
    </v-progress-circular>
    </div>
    <div class="currency-container">
      <div class="currency-container coin-container" v-for="coin in coins">
        <span class="coin-id">{{ coin.id }}</span>
        <span class="coin-price">{{ coin.price_usd }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      //Store cryptocurrency data in this array.
      coins: [],
      timer: 0
    }
  },
  mounted() {
    //When the app is ready, call this function.
    this.getCurrency();
    setInterval(this.countDown, 1000);

  },
  methods: {
    //Retrieve data for the top ten cryptocurrency.
    getCurrency() {
      return axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=5").then(response => {
        this.coins = response.data
      }, error => {
        console.error(error);
      })
    },
    countDown() {
      if (this.timer == 100) {
        this.timer = 0;
        this.getCurrency();
      } else {
        this.timer++;
      }
    }

  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.currency-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  .coin-container {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    .coin-price {
      font-size: calc(1em + 1vw);
    }
  }
}
.countdown {
  position: absolute;
  right: 0;
  top: 0;
  margin: 2em;
}
</style>
