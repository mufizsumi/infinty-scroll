const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loading');

let ready = false;
let imagesloaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '_YBMlMH77JfOe_1asu2ZyPFPd-W9RIukzNNUz0jO3so';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&${Math.random()}`;

// Check if all images were loaded
function imageloaded() {
  imagesloaded++;
  console.log(imagesloaded);
  if (imagesloaded === totalImages){
    ready = true;
    loader.hidden = true;
    console.log('raedy=',ready);
  }
}

// Helper function to set attributes inDOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Get Elements For Links & photos, Add To DOM
function displayPhotos() {
  imagesloaded =0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  // Run Functions for Each Object of PhotoArray
  photosArray.forEach((photo) => {
    // Create <a> To Link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
          href: photo.links.html,
          target: '_blank',
    });
    // Create <img> for Photo
    const img = document.createElement('img');
    setAttributes(img,{
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event listener,Check when each finished loading
    img.addEventListener('load', imageloaded);
    // Put <img> inside <a>, then both put inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log('Error:', error);
  }
}

// Check to see if scrolling near buttom of page,load more photos
window.addEventListener('scroll', () => {
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
  ready = false;
  getPhotos();
 }
});

// On Load
getPhotos();