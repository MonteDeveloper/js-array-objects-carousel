const listImages = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const elMiniaturesContainer = document.getElementById("miniatures");
const elSelectedImg = document.getElementById("selectedImage");

let selectedImageId = 0;

listImages.forEach((image, counter) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("flex-grow-1");
    newDiv.style.backgroundImage = `url("../${image.image}")`;
    newDiv.style.backgroundSize = "cover";
    newDiv.style.backgroundPosition = "center";
    newDiv.setAttribute('data-imgId', counter);
    if(counter == selectedImageId){
        newDiv.style.border = "3px solid white";
        elSelectedImg.style.backgroundImage = `url("../${image.image}")`;
    }else{
        newDiv.style.filter = "blur(.1rem) grayscale(100%)";
    }
    newDiv.addEventListener("click", updateCarousel);
    elMiniaturesContainer.append(newDiv);
})

let direction = "bot";
let isAnimationPlaying = true;

let myInterval = setInterval(() => {
    updateCarousel(direction);
}, 3 * 1000);

const listElMiniatures = elMiniaturesContainer.getElementsByTagName("div");

function updateCarousel(updateDirection){
    clearInterval(myInterval);

    listElMiniatures[selectedImageId].style.filter = "blur(.1rem) grayscale(100%)";
    listElMiniatures[selectedImageId].style.border = "none";

    let elNewSelectedImage;

    if(!updateDirection.isTrusted){
        if(updateDirection == 'top'){
            selectedImageId -= 1;
            if(selectedImageId < 0){
                selectedImageId = listImages.length - 1;
            }
        }else{
            selectedImageId += 1;
            if(selectedImageId > listImages.length - 1){
                selectedImageId = 0;
            }
        }

        elNewSelectedImage = listElMiniatures[selectedImageId];
    }else{
        selectedImageId = parseInt(this.getAttribute('data-imgId'));

        elNewSelectedImage = this;
    }

    elNewSelectedImage.style.border = "3px solid white";
    elNewSelectedImage.style.filter = "none";
    elSelectedImg.style.backgroundImage = elNewSelectedImage.style.backgroundImage;

    if(isAnimationPlaying){
        myInterval = setInterval(() => {
            updateCarousel(direction);
        }, 3 * 1000);
    }
}

function togglePlay(element){
    element.classList.toggle("my-active");

    if(element.classList.contains("my-active")){
        element.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(myInterval);
        isAnimationPlaying = false;
    }else{
        element.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isAnimationPlaying = true;
        myInterval = setInterval(() => {
            updateCarousel(direction);
        }, 3 * 1000);
    }
}

function toggleReverse(element){
    element.classList.toggle("my-active");

    if(element.classList.contains("my-active")){
        element.innerHTML = '<i class="fa-solid fa-forward"></i>';
        direction = "top";
    }else{
        element.innerHTML = '<i class="fa-solid fa-backward"></i>';
        direction = "bot";
    }
}



