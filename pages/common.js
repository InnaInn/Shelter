let petListArray = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

fetch('../../assets/pets.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        petListArray = data.map((pet, index) => {
            pet.id = index;
            return pet
        });
        shuffleArray(petListArray);
        renderPets(petListArray);
    });

function findPetById(id) {
    for (let pet of petListArray) {
        if (id == pet.id) {
            return pet;
        }
    }
}