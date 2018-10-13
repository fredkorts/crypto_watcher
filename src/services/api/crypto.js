import axios from 'axios'

export default {
  const getCurrency = () => {
    return axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10").then(response => {
      return response.data
    }, error => {
      console.error(error);
    })
  }
}
