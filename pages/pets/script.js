let paginatedPets = [];
let page = 1;
let blockListOurFriends = document.getElementById("blockListOurFriends");
let popUpCloseBtn = document.getElementById("pupUpClose");
let petPopUp = document.getElementById("pet-pop-up");
let petListImg = document.getElementById("petListImg");
let pupUpTitle = document.getElementById("pupUpTitle");
let pupUpSubtitle = document.getElementById("pupUpSubtitle");
let pupUpDescription = document.getElementById("pupUpDescription");
let pupUpAge = document.getElementById("pupUpAge");
let pupUpInoculations = document.getElementById("pupUpInoculations");
let pupUpDiseases = document.getElementById("pupUpDiseases");
let pupUpParasites = document.getElementById("pupUpParasites");
let pageNumberElement = document.getElementById("countPages");
let arrowRightElement = document.getElementById("arrowRight");
let arrowLeftElement = document.getElementById("arrowLeft");
let arrowRightAll = document.getElementById("arrowRightAll");
let arrowLeftAll = document.getElementById("arrowLeftAll");
let body = document.getElementById("body")
let menuToggle = document.getElementById("menu__toggle1");
let menuItem = document.getElementById('menu__item');
let html = document.querySelector("html");

fetch('../../assets/pets.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let petListArray = data.map((pet, index) => {
            pet.id = index;
            return pet
        });
        for (let i = 0; i < 6; i++) {
            paginatedPets[i] = petListArray.slice();
            shuffleArray(paginatedPets[i]);
        }
        renderPets(paginatedPets[0]);
    });

// При клике ВНЕ окна - закрываем его
petPopUp.addEventListener('click', (e) => {
    if (e.target === petPopUp || e.target.parentElement === petPopUp) {
        petPopUp.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

function renderPets(pets) {
    blockListOurFriends.innerHTML = '';
    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add('our__friends__sliderOurPets');
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
        blockListOurFriends.append(petCard);
        petCard.addEventListener('click', petCardClick);
    });
}


popUpCloseBtn.addEventListener('click', () => {
    petPopUp.classList.add('hidden');
    document.body.style.overflow = '';
});

function petCardClick(event) {
    let element = event.target;
    while (!element.classList.contains("our__friends__sliderOurPets")) {
        element = element.parentElement;
    }
    popUpRender(element)
    petPopUp.classList.remove("hidden")
}


function popUpRender(element) {
    let petNum = element.dataset.id;
    let pet = findPetById(paginatedPets[page - 1], petNum);

    // noinspection JSUnresolvedVariable
    petListImg.setAttribute('src', pet.img);
    pupUpTitle.innerText = pet.name;
    // noinspection JSUnresolvedVariable
    pupUpSubtitle.innerText = pet.type + "-" + pet.breed;
    pupUpDescription.innerText = pet.description;
    // noinspection JSUnresolvedVariable
    pupUpAge.innerText = pet.age;
    // noinspection JSUnresolvedVariable
    pupUpInoculations.innerText = pet.inoculations;
    // noinspection JSUnresolvedVariable
    pupUpDiseases.innerText = pet.diseases;
    // noinspection JSUnresolvedVariable
    pupUpParasites.innerText = pet.parasites;

    document.body.style.overflow = 'hidden';
}

function processPagination() {
    renderPets(paginatedPets[page - 1]);
    pageNumberElement.innerText = page;
    if (page === paginatedPets.length) {
        arrowRightElement.setAttribute("disabled", "disabled");
        arrowRightAll.setAttribute("disabled", "disabled");
    } else {
        arrowRightElement.removeAttribute("disabled");
        arrowRightAll.removeAttribute("disabled");
    }
    if (page === 1) {
        arrowLeftAll.setAttribute("disabled", "disabled");
        arrowLeftElement.setAttribute("disabled", "disabled");
    } else {
        arrowLeftElement.removeAttribute("disabled");
        arrowLeftAll.removeAttribute("disabled");
    }
}

arrowRightElement.addEventListener("click", () => {
    page = page + 1;
    processPagination();
});

arrowRightAll.addEventListener("click", () => {
    page = paginatedPets.length;
    processPagination();
});

arrowLeftElement.addEventListener("click", () => {
    page = page - 1;
    processPagination();
});


arrowLeftAll.addEventListener("click", () => {
    page = 1;
    processPagination();
});

menuToggle.onchange = function () {
    if (menuToggle.checked) {
        html.classList.add("scroll")
    } else {
        html.classList.remove("scroll")
    }
};

document.addEventListener('click', function (e) {
    if (["menu__body", "menu__list", "menu__item", "menu__link1", "burgerOverlay"]
            .includes(e.target.className)) {
        menuToggle.checked = false;
        menuToggle.onchange(null);
    }
});