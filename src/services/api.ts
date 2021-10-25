import axios from 'axios';

const ufs = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
})

const openWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/'
})

const weatheBit = axios.create({
  baseURL: 'http://api.weatherbit.io/v2.0/'
})

export { ufs, openWeather, weatheBit }