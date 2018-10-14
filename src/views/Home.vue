<template>
  <div class="currency-container">
    <div class="currency-container coin-container" v-for="coin in coins">
      <v-card hover tile>
        <span class="coin-id">{{ coin.id }}</span>
        <span class="coin-price">{{ coin.price_usd }}</span>

        <div class="coin-price__percentage" v-bind:class="valueColor(coin.percent_change_1h)">
          <div class="time-period">1h</div>
          <div class="period-value" >{{ coin.percent_change_1h }}</div>
        </div>

        <div class="coin-price__percentage" v-bind:class="valueColor(coin.percent_change_24h)">
          <div class="time-period">24h</div>
          <div class="period-value">{{ coin.percent_change_24h }}</div>
        </div>

        <div class="coin-price__percentage" v-bind:class="valueColor(coin.percent_change_7d)">
          <div class="time-period">1w</div>
          <div class="period-value">{{ coin.percent_change_7d }}</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      //Store cryptocurrency data in this array.
      coins: [],
      timer: 0,
      positiveChange: 'green-value',
      negativeChange: 'red-value'
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
    },
    valueColor(valCol) {
      if (valCol > 0) {
        return this.positiveChange;
      } else {
        return this.negativeChange;
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
  flex-basis: 15%;
  .coin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .coin-price {
  font-size: calc(1em + .75vw);
  margin-bottom: 1em;
}
  .v-card {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
}
}
  .countdown {
  position: absolute;
  right: 0;
  top: 0;
  margin: 2em;
}
  .coin-price__percentage {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .time-period {
  width: 50%;
  padding-right: 1em;
  text-align: right;
}
  .period-value {
  width: 50%;
  padding-left: 1em;
  text-align: left;
}
}
  .green-value {
  .period-value {
  color: green;
}
}
  .red-value {
  .period-value {
  color: red;
}
}
</style>
