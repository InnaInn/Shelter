let blockListOurFriends = document.getElementById("blockListOurFriends");
let popUpCloseBtn = document.getElementById("pupUpClose");
let petPopUp = document.getElementById("pet-pop-up");
let petListImg = document.getElementById("petListImg");
let pupUpTitle = document.getElementById("pupUpTitle");
let pupUpSubtitle = document.getElementById("pupUpSubtitle");
let pupUpDescription =document.getElementById("pupUpDescription");
let pupUpAge = document.getElementById("pupUpAge");
let pupUpInoculations = document.getElementById("pupUpInoculations");
let pupUpDiseases = document.getElementById("pupUpDiseases");
let pupUpParasites = document.getElementById("pupUpParasites");


function renderPets(pets) {

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
    let pet = findPetById(petNum);

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
