import Axios from 'axios';

async function AdvisorTemperature(cityId) {
  try {
    const request = await Axios.get(`http://apiadvisor.climatempo.com.br/api/v1/climate/temperature/locale/${cityId}`, {
      params: {
        token: '47197015fcc3a1b6b6546a419e479baa',
      }
    });

    return request.data;
  } catch (error) {
    window.console.log('error in advisorWeather: ' + error.message);
  }

}

async function advisorCityData(city) {
  try {
    const request = await Axios.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city',
      {
        params: {
          name: city,
          state: 'AL',
          token: '47197015fcc3a1b6b6546a419e479baa',
        },
      });

    const { id, name, state, country } = request.data[0];

    const city_params = { id, name, state, country };
    window.console.log(city_params);

    return city_params;
  } catch (err) {
    window.console.log('error in advisorCityData: ' + err.message);
  }

}

async function weather(city) {
  const cityData = await advisorCityData(city);
  const cityWeather = await AdvisorTemperature(cityData.id);

  return cityWeather;
}

const methods = {
  weather,
  advisorCityData
}

export default methods;