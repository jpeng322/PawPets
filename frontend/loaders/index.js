import axios from "axios"


export const getPets = async () => {

    try {
        // const loadPets = async () => {
        const response = await axios.get("http://localhost:8080/pet");
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
        const response = await axios.get(`http://localhost:8080/pet/user/${userId}`);
        const userPets = response.data.getPet
        return userPets
        // };
    } catch (e) {
        console.log(e)
    }

}

