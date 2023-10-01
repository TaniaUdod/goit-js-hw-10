import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selector = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

selector.addEventListener("click", onSelectBreed);

let breedsId = [];

fetchBreeds()
    .then(data => {
        data.forEach(element => {
            breedsId.push({ text: element.name, value: element.id })
        });
    })
    .catch(error => {
    
    });
   
    
// function onSelectBreed(event) {
    
// }



// new SlimSelect({
//   select: '#selectElement'
// })

// Notiflix.Notify.failure("");