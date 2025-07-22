let baseURL = 'https://api.scryfall.com/cards/search?q=';
let filteredURL = '&order='

let userInputElement = document.querySelector('#userInput');
let userFilterOption = document.getElementById('sort-options');


// userFilterOption.addEventListener("change", (event) => console.log(event.target.value))
// userInputElement.addEventListener("keydown", () => alert('user is typing'))

//WORKING: on click, gets the value of the input field using the user Search function
let userSubmitElement = document.querySelector('#button')
userSubmitElement.addEventListener("click", () => {
    if (userFilterOption.value == 'A-Z'){
        userSearch(userInputElement);
    } else {
        getCardAndFilter(userInputElement, userFilterOption.value);
    }
    console.log(userFilterOption.value)
});



//WORKING: Issue - Does not reset for the next click
const createImage = (fetchedCard) => {
    let loc = document.querySelector('#user-Card');
    
    for(let card of fetchedCard){
        let newCard = document.createElement('li')
        newCard.innerHTML = `<img src=${card.image_uris.small} alt="Magic Card">`;
        loc.appendChild(newCard)
    }
}

const createData = (collectorNumber, set, rarity) => {
    

    let loc = document.querySelector("#card-stats")
    loc.innerHTML = `<p>Collector Number: ${collectorNumber}<br>Set Name: ${set}<br>Rarity: ${rarity}<br>Value(USD)</p>`
}

//Function that will concat the user input after click and fetch the requested name
const getCardFace = (fullURL) => {
    return fetch(fullURL) 
    .then((response) => response.json())
    .then((result) => {let returnedResult = result.data;
                        let topTen = returnedResult.slice(0, 5)
                        return topTen;
    })
    .catch((error) => console.error(error));
}

//WORKING: returns
const userSearch = async (userInputElement) => {
    let value = userInputElement.value;
    let fullURL = baseURL.concat(value);
    let fetchedCard = await getCardFace(fullURL);
    console.log(fetchedCard);// add the user search to the base URL method named
    createData(fetchedCard.collector_number, fetchedCard.set_name, fetchedCard.rarity);
    createImage(fetchedCard);
}


const getCardAndFilter = async(userInputElement, userFilterOption) =>{
    let cardQuery = userInputElement.value;
    let filterOption = userFilterOption;
    let filterSearch = baseURL + cardQuery + filteredURL + filterOption;
    let fetchedCard = await getCardFace(filterSearch);
    console.log(fetchedCard);
}

// const displayTopTen = () => {

// }
















