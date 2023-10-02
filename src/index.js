import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import "./styles.css";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selector = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

selector.addEventListener("change", onSelectBreed);

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
            catInfo.innerHTML =
                `<div class="box-container"><img src="${url}" alt="${breeds[0].name}" width="400"/>
                <div><h2>${breeds[0].name}</h2>
                <p>${breeds[0].description}</p>
                <p><b>Temperament:</b> ${breeds[0].temperament}</p></div></div>`

            catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');
    
    Notify.failure("Oops! Something went wrong! Try reloading the page!");
}