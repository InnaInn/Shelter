let petListArray = [];
let sliderStartIndex= 0;
let petListImg = document.getElementById("petListImg");
let petPopUp = document.getElementById("pet-pop-up");
let pupUpTitle = document.getElementById("pupUpTitle");
let pupUpSubtitle = document.getElementById("pupUpSubtitle");
let pupUpDescription =document.getElementById("pupUpDescription");
let pupUpAge = document.getElementById("pupUpAge");
let pupUpInoculations = document.getElementById("pupUpInoculations");
let pupUpDiseases = document.getElementById("pupUpDiseases");
let pupUpParasites = document.getElementById("pupUpParasites");
let popUpCloseBtn = document.getElementById("pupUpClose");

// При клике ВНЕ окна - закрываем его
petPopUp.addEventListener('click', (e) => {
    if (e.target === petPopUp || e.target.parentElement === petPopUp) {
        petPopUp.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

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
        renderPets(petListArray, sliderStartIndex);
    });

let blockPets = document.getElementById("our__friends_body")

function petCardClick(event) {
    let element = event.target;
    while (!element.classList.contains("our__friends__slider")) {
        element = element.parentElement;
    }
    popUpRender(element)
    petPopUp.classList.remove("hidden")
}

function renderPets(pets, startIndex) {
    blockPets.innerHTML = '';
    let endIndex = startIndex + 3;
    for (let i = startIndex; i < endIndex; i++) {
        let pet = pets[i % pets.length];
        const petCard = document.createElement('div');
        petCard.classList.add('our__friends__slider');
        petCard.setAttribute('data-id', pet.id);

        // noinspection JSUnresolvedVariable
        petCard.innerHTML = `
            <div class="our__friends__icon friends__icon">
                <img src="${pet.img}" alt="${pet.name}'s image">
                <div class="our__friends__title">${pet.name}</div>
                <div class="our__friends__button">
                    <a  class="learn__more">Learn more</a>
                </div>
            </div>
        `
        blockPets.append(petCard);
        petCard.addEventListener('click',petCardClick)
    }
}

popUpCloseBtn.addEventListener('click', () => {
    petPopUp.classList.add('hidden');
    document.body.style.overflow = '';
});

function findPetById(id) {
    for (let pet of petListArray) {
        if (id == pet.id) {
            return pet;
        }
    }
}

function popUpRender(element) {
    let petNum = element.dataset.id;
    let pet = findPetById(petNum);

    // noinspection JSUnresolvedVariable
    petListImg.setAttribute('src', pet.img);
    pupUpTitle.innerText = pet.name;
    pupUpSubtitle.innerText= pet.type +  "-" + pet.breed;
    pupUpDescription.innerText= pet.description;
    pupUpAge.innerText = pet.age;
    pupUpInoculations.innerText = pet.inoculations;
    pupUpDiseases.innerText = pet.diseases;
    pupUpParasites.innerText= pet.parasites;

    document.body.style.overflow = 'hidden';
}
/*Слайдер*/

document.getElementById("arrowRight").addEventListener("click", event => {
    sliderStartIndex += 3;
    renderPets(petListArray, sliderStartIndex)
})

document.getElementById("arrowLeft").addEventListener("click", event => {
    sliderStartIndex -= 3;
    if (sliderStartIndex < 0) {
        sliderStartIndex += petListArray.length
    }
    renderPets(petListArray, sliderStartIndex)
})
