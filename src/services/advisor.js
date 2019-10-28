import Axios from 'axios';

async function AdvisorWeather(cityId) {
  window.console.log('rodou');
  const request = await Axios.get(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${cityId}/current`,
    {
      params: {
        token: '92420844fa6f91bf74f679f7883d2c14',
        id: cityId,
      }
    });

  return request.data;
}

async function advisorCityData(city) {
  const request = await Axios.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city',
    {
      params: {
        name: city,
        state: 'AL',
        token: '92420844fa6f91bf74f679f7883d2c14',
      }
    });

  const { id, name, state, country } = request.data[0];

  const city_params = { id, name, state, country };

  return city_params;
}

async function weather(city) {
  const cityData = await advisorCityData(city);
  const cityWeather = await AdvisorWeather(cityData.id);

  return cityWeather;
}

export default weather;