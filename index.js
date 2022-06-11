//The set class holds all the parameters for the game collection
//The set is the game's individual values like its title year and publisher
class Set {
    constructor(title, publisher, year){
        this.title = title;
        this.publisher = publisher
        this.year = year
    }
}

//The is the constructor for the collectio class which holds the games
//The class holds the array that is constructed from the Set class
//The class also holds the ability to add and delte the gme from the collection
class Collection {
    constructor(id, title){
        this.id = id;
        this.title = title;
        this.games = [];
    }
    
    addGame(game){
        this.games.push(game);
    }
    
    deleteGame(game){
        let index = this.games.indexOf(game)
        this.games.splice(index, 1)
    }
}

let collections = [];
let collectionId = 0;

//The onClick function tells the HTML what to do when the button is clicked
//The click uses the drawDOM function which updates the HTML with the new information
//The click also pushs the collection to the collections array
onClick("new-collection", () => {
    collections.push(new Collection(collectionId++, getValue('new-collection-name')))
    drawDOM();
})

function onClick(id, action){
    let element = document.getElementById(id);
    element.addEventListener("click", action)
    return element;
}

//This function is written so getElementById doesn't have to be written in every function
function getValue(id){
    return document.getElementById(id).value
}

//The drawDOM is what updates the HTML and visually represents the information that has been pushed to the site
//This function is used in every button press becasue it updates the site 
//If not invoked the site will have the information but won't update the visual part
function drawDOM(){
    let collectionDiv = document.getElementById("collections");
    clearElement(collectionDiv);
    for (collection of collections){
        let table = createCollectionTable(collection);
        let header = document.createElement("h2");
        header.innerHTML = collection.title;
        header.appendChild(createDeleteCollectionButton(collection))
        collectionDiv.appendChild(header);
        collectionDiv.appendChild(table);
        for (game of collection.games){
            createGameRow(collection, table, game);
        }
    }
}

//createGameRow allows for the table for the collection to hold the information for the game
function createGameRow(collection, table, game){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = game.title;
    row.insertCell(1).innerHTML = game.publisher;
    row.insertCell(2).innerHTML = game.year;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(collection, game))
}

//The delete button is appended to the game row and allows for that specific row to be deleted
function createDeleteRowButton(collections, game){
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete";
    btn.onclick = () => {
        let index = collections.games.indexOf(game);
        collections.games.splice(index, 1);
        drawDOM();
    }
    return btn;
}

//This button allows for the entire collection to be deleted in the collections array
//This also deletes the games within that specific collection
function createDeleteCollectionButton(collection){
    let btn = document.createElement("button")
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete Collection";
    btn.onclick = () => {
        let index = collections.indexOf(collection);
        collections.splice(index, 1);
        drawDOM();
    }
    return btn;
}

//This is the button that invokes the createCollectionTable
//The function creates the button to add the collection to the array 
//This also pulls all of the elements from the createCollectionTable and holds all values for the actual collections
function createNewCollectionButton(collection){
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        collection.games.push(new Set(getValue(`title-input-${collection.id}`), getValue(`publisher-input-${collection.id}`), getValue(`year-input-${collection.id}`)));
        drawDOM();
    }
    return btn;
}

//This function holds all the information for the HTML of creating a table
//This allows for the HTML to build a table from the infomation in here when the button is pushed
//It also holds the parameters for the formatting of information and everything that the rows hold
//This function allows all other functions to build off and reprsents all the information from the arrays visually
function createCollectionTable(collection){
    let table = document.createElement("table");
    table.setAttribute("class", "table table-dark table-striped");
    let row = table.insertRow(0);
    let titleColumn = document.createElement("th");
    let publisherColumn = document.createElement("th")
    let yearColumn = document.createElement("th")
    titleColumn.innerHTML = "Title";
    publisherColumn.innerHTML = "Publisher";
    yearColumn.innerHTML = "Year";
    row.appendChild(titleColumn);
    row.appendChild(publisherColumn);
    row.appendChild(yearColumn);
    let formRow = table.insertRow(1);
    let titleTh = document.createElement("th");
    let publisherTh = document.createElement("th");
    let yearTh = document.createElement("th");
    let createTh = document.createElement("th");
    let titleInput = document.createElement("input");
    titleInput.setAttribute("id", `title-input-${collection.id}`);
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("class", "form-control");
    let publisherInput = document.createElement("input");
    publisherInput.setAttribute("id", `publisher-input-${collection.id}`);
    publisherInput.setAttribute("type", "text");
    publisherInput.setAttribute("class", "form-control");
    let yearInput = document.createElement("input");
    yearInput.setAttribute("id", `year-input-${collection.id}`);
    yearInput.setAttribute("type", "text");
    yearInput.setAttribute("class", "form-control");
    let newCollectionButton = createNewCollectionButton(collection);
    titleTh.appendChild(titleInput);
    publisherTh.appendChild(publisherInput);
    yearTh.appendChild(yearInput);
    createTh.appendChild(newCollectionButton);
    formRow.appendChild(titleTh);
    formRow.appendChild(publisherTh);
    formRow.appendChild(yearTh);
    formRow.appendChild(createTh)
    return table;
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}