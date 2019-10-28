import Axios from 'axios';


async function Geolocation(address) {
  const request = await Axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address,
      key: 'AIzaSyAZxi1_4GhhNLnHTxq8YTp7ujeUZPuUN3k',
    }
  });

  const geolocation_data = {
    formatted_address: request.data.results[0].formatted_address,
    location: request.data.results[0].geometry.location,
    address_components: request.data.results[0].address_components,
  }

  return geolocation_data;
}

export default Geolocation;