import "./styles.css";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selector = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

selector.addEventListener("click", onSelectBreed);

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let breedsId = [];

fetchBreeds()
    .then(data => {
        data.forEach(element => {
            breedsId.push({ text: element.name, value: element.id });
        });
        new SlimSelect({
            select: selector,
            data: breedsId
        })
    })
    .catch(onFetchError);
   

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');
   
    const breedId = event.currentTarget.value;
    
    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            selector.classList.remove('is-hidden');
            
            const { url, breeds } = data[0];
            catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`

        // catInfo.innerHTML = createMarkup();
        catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

// function createMarkup(arr) {
//     return arr.map(({url, breeds}) => {
//         `<div class="box-img">
//         <img src="${url}" alt="${breeds[0].name}" width="400"/></div>
//         <div class="box"><h1>${breeds[0].name}</h1>
//         <p>${breeds[0].description}</p>
//         <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
//     })
//         .join("");
// };


function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');
    
    Notify.failure("Oops! Something went wrong! Try reloading the page!");
}