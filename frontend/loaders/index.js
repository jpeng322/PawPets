import axios from "axios"


export const getPets = async () => {

    try {
        // const loadPets = async () => {
        const response = await axios.get("http://localhost:3001/pet");
        // console.log(response)
        const pets = response.data.pet
        // console.log(pets);
        // if (petData.status == 200 && petData.data.success == true) {
        //   setPets(petData.data.pets);
        // }
        return pets
        // };
    } catch (e) {
        console.log(e)
    }

    //   loadPets();
}


export const getUserPets = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3001/pet/user/${userId}`);
        const userPets = response.data.getPet
        console.log(userPets, "USERPETS GET ROUTE")
        return userPets
        // };
    } catch (e) {
        console.log(e)
    }

}



export const getUsername = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        const username = response.data.username
        return username
        // };
    } catch (e) {
        console.log(e)
    }
}

export const getPetUserInfo = async (userId) => {
    try {
        const petResponse = await axios.get(`http://localhost:3001/pet/user/${userId}`);
        const userPets = petResponse.data.getPet
        // return userPets
        // };
    } catch (e) {
        console.log(e)
    }

    try {
        const userResponse = await axios.get(`http://localhost:3001/user/${userId}`);
        const username = userResponse.data.username
        // return username
        // };
    } catch (e) {
        console.log(e)
    }

    return { userPets, username }
}