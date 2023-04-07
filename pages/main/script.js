let petListArray = [];
let petListImg = document.getElementById("petListImg")
let petPopUp = document.getElementById("pet-pop-up")

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
        renderPets(petListArray, 0);
    });

let blockPets = document.getElementById("our__friends_body")

function renderPets(pets, startIndex) {
    let endIndex = startIndex + 3;
    let adjustedIndex = endIndex < pets.length ? endIndex : pets.length;
    for (let i = startIndex; i < adjustedIndex; i++) {
        let pet = pets[i];
        const our__friends__slider = document.createElement('div');
        our__friends__slider.classList.add('our__friends__slider');
        our__friends__slider.setAttribute('data-id', pet.id);

        // noinspection JSUnresolvedVariable
        our__friends__slider.innerHTML = `
            <div class="our__friends__icon friends__icon">
                <img src="${pet.img}" alt="${pet.name}'s image">
                <div class="our__friends__title">${pet.name}</div>
                <div class="our__friends__button">
                    <a  class="learn__more">Learn more</a>
                </div>
            </div>
        `
        blockPets.prepend(our__friends__slider);
    }
}

window.addEventListener('click', function (event) {
    if (event.target.classList.contains("learn__more")) {
        popUpRender(event)
        petPopUp.classList.remove("hidden")
    }
});


function popUpRender(event) {
    let petNum = event.target.parentElement.parentElement.parentElement.dataset.id;
    let pet = petListArray[petNum];

    // noinspection JSUnresolvedVariable
    petListImg.setAttribute('src', pet.img);


    // pupUpTitle.innerText = book.title;


}

