const pictureFrame = document.querySelector("#picture-frame");
const nextImgBtn = document.querySelector("#next-img");
const prevImgBtn = document.querySelector("#prev-img");


let index = 0;


const pictureArr = ['images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg'];
const thumbArr = ['images/image-product-1-thumbnail.jpg', 'images/image-product-2-thumbnail.jpg', 'images/image-product-3-thumbnail.jpg', 'images/image-product-4-thumbnail.jpg'];

loadFirstPicture();

nextImgBtn.addEventListener("click", loadNextImage)
prevImgBtn.addEventListener("click", loadPreviousImage)

function loadFirstPicture() {
    pictureFrame.innerHTML += `
    <img src=${pictureArr[index]} alt="sneakers">`
}

function loadNextImage() {
    
    if (index < pictureArr.length - 1) {
        index++;
    } else {
        index = 0;
    }
    
    
    pictureFrame.innerHTML = `
    <img src=${pictureArr[index]} alt="sneakers">`
}

function loadPreviousImage() {
    if (index > 0) {
        index--;
    } else {
        index = pictureArr.length - 1;
    }

    pictureFrame.innerHTML = `
    <img src=${pictureArr[index]} alt="sneakers">`
}

