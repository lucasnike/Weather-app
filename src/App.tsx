import { useEffect, useState } from 'react';
import { ufs, openWeather } from './services/api';
import { FiSearch } from 'react-icons/fi'
import './styles/App.scss'

import { getIconByCode } from './services/icons'

import { FiMapPin, FiMap } from 'react-icons/fi'

import celcius from './assets/celsius.png'


type EstadosData = {
  id: number;
  sigla: string;
  nome: string;
}

type CidadeData = {
  id: number;
  nome: string;
}
type OpenWeatherData = {
  coord: {
    lat: number;
    lon: number;
  },
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  },
  weather: [{
    description: string,
    icon: string;
    main: string;
    id: number;
  }],
  wind: {
    speed: number;
  }
  name: string;
  id: number;
}

function App() {

  const [estados, setEstados] = useState<EstadosData[]>([])
  const [cidades, setCidades] = useState<CidadeData[]>()

  const [uf, setUf] = useState<EstadosData>()
  const [cidade, setCidade] = useState<CidadeData>()
  const [coordenadas, setCoordenadas] = useState<GeolocationCoordinates>()

  const [weatherResponse, setWeatherResponse] = useState<OpenWeatherData>()

  useEffect(() => {

    ufs.get<EstadosData[]>('').then(ufs => {
      setEstados(ufs.data)
    })

  }, [])

  useEffect(() => {

    if (!uf) {
      return;
    }

    ufs.get<CidadeData[]>(`/${uf?.sigla}/municipios`).then(cidades => {
      setCidades(cidades.data)
    })
  }, [uf])

  useEffect(() => {
    openWeather.get<OpenWeatherData>(`weather?lat=${coordenadas?.latitude}&lon=${coordenadas?.longitude}&appid=5378f5a88d7238fba69e32d0b95912c9&lang=pt_br`).then(result => {
      console.log(result.data)
      setWeatherResponse(result.data)
      setCidade({
        nome: result.data.name,
        id: result.data.id
      })
    })
  }, [coordenadas])

  async function handleGetGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      setCoordenadas(position.coords)
      console.log(position.coords)
    })
  }

  async function handleGetWeatherInformation() {
    openWeather.get<OpenWeatherData>(`weather?q=${cidade?.nome.toLocaleLowerCase()},${uf?.sigla.toLocaleLowerCase()},BR&appid=5378f5a88d7238fba69e32d0b95912c9&lang=pt_br`).then((result) => {
      setWeatherResponse(result.data)
      console.log(result.data)
    })
  }

  function kelvinToCelcius(tempKelvin: number | undefined) {
    if (tempKelvin) {
      return (tempKelvin - 273.15).toFixed(0)
    }
  }

  return (
    <div className='weatherAppWrapper' >

      <main className='mainWrapper'>
        <h1 className='mainTitle'>Veja a previsão do tempo <br />facilmente</h1>

        <div className='citySelection'>


          <div>
            <h2>Unidade Federativa</h2>
            <select >
              <option> </option>

              {estados.map(uf => {
                return (
                  <option onClick={() => {
                    setWeatherResponse(undefined)
                    setUf(uf)
                  }} key={uf.id} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                );
              })}

            </select>
          </div>

          <div>
            <h2>Cidade</h2>
            <select >

              <option> </option>

              {cidades ? cidades.map(cidade => {
                return (

                  <option onClick={() => {
                    setWeatherResponse(undefined)
                    setCidade(cidade)
                  }} value={cidade.nome} key={cidade.id}>
                    {cidade.nome}
                  </option>

                );
              }) : null}
            </select>
          </div>

        </div>

        <button className='button-app' onClick={handleGetWeatherInformation} > <FiSearch /> Buscar</button>
      </main>

      <aside className='asideWrapper'>

        {/* <img src={`http://openweathermap.org/img/wn/${weatherResponse?.weather[0].icon}@4x.png`} /> */}
        {weatherResponse ? <img src={getIconByCode(weatherResponse.weather[0].id)} alt="" /> :
          <img src={celcius} alt="" />}

        <strong> {kelvinToCelcius(weatherResponse?.main.temp)} {weatherResponse && 'C°'} </strong>

        <span className='weatherDescription'>{weatherResponse?.weather[0].description}</span>

        <div className='location'>
          {weatherResponse && <FiMapPin />}
          {weatherResponse && uf?.sigla && `${uf?.sigla},`} {weatherResponse && cidade?.nome}
        </div>

        {!weatherResponse && <button onClick={handleGetGeolocation} className='button-app'>
          <FiMap />
          Coordenadas
        </button>}
      </aside>

    </div>
  )
}

export default App
