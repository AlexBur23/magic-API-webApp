let baseURL = 'https://api.scryfall.com/cards/search?q=';

let userInputElement = document.querySelector('#userInput')
// userInputElement.addEventListener("keydown", () => alert('user is typing'))

//WORKING: on click, gets the value of the input field using the user Search function
let userSubmitElement = document.querySelector('#button')
userSubmitElement.addEventListener("click", () => userSearch(userInputElement));

//WORKING: Issue - Does not reset for the next click
const createImage = (fetchedCard) => {
    let loc = document.querySelector('#user-Card');
    loc.innerHTML = `<img src=${fetchedCard} alt="Magic Card">`;
}

const createData = (collectorNumber, set, rarity, prices) => {
    let loc = document.querySelector("#card-stats")
    loc.innerHTML = `<p>Collector Number: ${collectorNumber}<br>Set Name: ${set}<br>Rarity: ${rarity}<br>Value(USD)${prices}</p>`
}

//Function that will concat the user input after click and fetch the requested name
const getCardFace = (fullURL) => {
    return fetch(fullURL) 
    .then((response) => response.json())
    .then((result) => {return result.data[0]})
    .catch((error) => console.error(error));
}

//WORKING: returns
const userSearch = async (userInputElement) => {
    let value = userInputElement.value;
    let fullURL = baseURL.concat(value);
    let fetchedCard = await getCardFace(fullURL);
    console.log(fetchedCard);// add the user search to the base URL method named
    createData(fetchedCard.collector_number, fetchedCard.set_name, fetchedCard.rarity, fetchedCard.prices.usd);
    createImage(fetchedCard.image_uris.small);
}

// const displayTopTen = () => {

// }
















