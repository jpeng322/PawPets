import axios from "axios";
const BASE_URL = import.meta.env.VITE_URL;
export const getPets = async () => {
  try {
    // const loadPets = async () => {
    const response = await axios.get(`${BASE_URL}/pet`);
    // console.log(response)
    const pets = response.data.pet;
    // console.log(pets);
    // if (petData.status == 200 && petData.data.success == true) {
    //   setPets(petData.data.pets);
    // }
    return pets;
    // };
  } catch (e) {
    console.log(e);
  }

  //   loadPets();
};

export const getUserPets = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pet/user/${userId}`);
    const userPets = response.data.getPet;
    return userPets;
    // };
  } catch (e) {
    console.log(e);
  }
};

export const getUsername = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    const username = response.data.username;
    return username;
    // };
  } catch (e) {
    console.log(e);
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/favorites/${userId}`,
      // url: `${BASE_URL}/favorites/${userId}`,
      headers: {
        // 'Content-type': "application/json; charset=utf-8",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      const data = response.data.favorite;
      console.log(data);
      try {
        const promises = data.map(async (pet) => {
          const favoritesResponse = await axios({
            method: "get",
            url: `${BASE_URL}/pet/${pet.petId}`,
            headers: {
              // 'Content-type': "application/json; charset=utf-8",
              //   Authorization: `Bearer ${token}`,
            },
          });

          const petData = favoritesResponse.data.pet;
          return petData;
        });

        const results = await Promise.all(promises);
        console.log(results);
        //   setFavList(results)
        return results;
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
