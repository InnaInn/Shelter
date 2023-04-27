let mobileVersion = window.matchMedia('(max-width: 768px)');
let tabletVersion = window.matchMedia('(max-width: 1280px)');
const numberOfPets = mobileVersion.matches ? 1 : tabletVersion.matches ? 2 : 3;
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
let blockPets = document.getElementById("our__friends_body");
let body = document.getElementById("body")
let menuToggle = document.getElementById("menu__toggle");
let menuItem = document.getElementById('menu__item');
let html = document.querySelector("html");

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

// При клике ВНЕ окна - закрываем его
petPopUp.addEventListener('click', (e) => {
    if (e.target === petPopUp || e.target.parentElement === petPopUp) {
        petPopUp.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

function petCardClick(event) {
    let element = event.target;
    while (!element.classList.contains("our__friends__slider")) {
        element = element.parentElement;
    }
    popUpRender(element)
    petPopUp.classList.remove("hidden")
}

function renderPets(pets, startIndex = 0) {
    blockPets.innerHTML = '';
    let endIndex = startIndex + numberOfPets;
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
        petCard.addEventListener('click', petCardClick);
    }
}

popUpCloseBtn.addEventListener('click', () => {
    petPopUp.classList.add('hidden');
    document.body.style.overflow = '';
});

function popUpRender(element) {
    let petNum = element.dataset.id;
    let pet = findPetById(petListArray, petNum);

    // noinspection JSUnresolvedVariable
    petListImg.setAttribute('src', pet.img);
    pupUpTitle.innerText = pet.name;
    // noinspection JSUnresolvedVariable
    pupUpSubtitle.innerText= pet.type +  "-" + pet.breed;
    pupUpDescription.innerText= pet.description;
    // noinspection JSUnresolvedVariable
    pupUpAge.innerText = pet.age;
    // noinspection JSUnresolvedVariable
    pupUpInoculations.innerText = pet.inoculations;
    // noinspection JSUnresolvedVariable
    pupUpDiseases.innerText = pet.diseases;
    // noinspection JSUnresolvedVariable
    pupUpParasites.innerText= pet.parasites;

    document.body.style.overflow = 'hidden';
}
/*Слайдер*/

document.getElementById("arrowRight").addEventListener("click", () => {
    sliderStartIndex += numberOfPets;
    renderPets(petListArray, sliderStartIndex)
})

document.getElementById("arrowLeft").addEventListener("click", () => {
    sliderStartIndex -= numberOfPets;
    if (sliderStartIndex < 0) {
        sliderStartIndex += petListArray.length
    }
    renderPets(petListArray, sliderStartIndex)
})

menuToggle.onchange = function () {
    if (menuToggle.checked) {
        html.classList.add("scroll")
    } else {
        html.classList.remove("scroll")
    }
};

document.addEventListener('click', function (e) {
    if (["menu__body", "menu__list", "menu__item", "menu__link"].includes(e.target.className)) {
        menuToggle.checked = false;
        menuToggle.onchange(null);
    }
});

