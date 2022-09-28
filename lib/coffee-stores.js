import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  
});

const getUrlForCoffeeStore = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListofCoffeeStorePhotos = async () => {
    
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 20,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map(result => result.urls["small"]); 
}

export const fetchCoffeeStores = async (latLong = "48.89277298709008,18.046837622876293", limit = 6) => {

    const photos = await getListofCoffeeStorePhotos()
  
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
      };
      
      const response = await fetch(getUrlForCoffeeStore(latLong, "coffee", limit), options);
      const data = await response.json();
      return data.results.map((result, idx) => {
        return {id: result.fsq_id, name: result.name, address: result.location.address, locality: result.location.locality, imgUrl: photos.length > 0 ? photos[idx] : null}
      })
    }