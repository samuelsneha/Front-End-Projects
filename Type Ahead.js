
var citiesA = [];
fetch('https://countriesnow.space/api/v0.1/countries/population/cities')
.then(response => {console.log(response);//this what we get  here is a stream object ie. readable string
 //console.log(response.json());  We do .json() because jo data aata hai wo alag format mai hota hai, so for convience json mai convert karte hai. Yeh conversionn asynchronous hota hai. So we use async await/promise. response.json() returns a promise
 return response.json(); }) // when we do .json() method, a Promise is returned since the reading of the stream will happen asynchronously.
.then(data => { console.log(data);//this returns data in json format. Not promise. So no 3rd .then() BECAUSE WE ALREADY GOT IN JSON FORMAT
console.log(data.data); 
citiesA.push(data.data);// D3 - I didnt use spread.Is that okay ?  because we need to do some modifications to the data.data and not use it directly, we are storing it in a variable
console.log(citiesA);//citiesA will be an array of objects
});

function findMatches( wordToMatch , citiesA ){ //the first statement of this function is a return statement, which means it will return something
     return citiesA.filter( element => { //element will be an object. filter() creates a new array from the elements of the existing array which satsfy the condition 
        var newPlace = new RegExp(wordToMatch, gi ); 
        return element.city.matches( newPlace) || element.state.matches(newPlace) } )//D2 - a)Because its 2 statement, so we have a return right? I f it would had been just one statement there wouldnt be return right ? 
                                                                        // b) why == doesnt work and .matches work ?
}

function displayMatches(){
   var placeValue =  $('#place').val();
   var matchedArray = findMatches( placeValue, citiesA ); //matchedArray will be an array of objects which must have matched the user's word
   var suggestions = matchedArray.map( element => { //suggestions will be an array
   var newRegex = new RegExp (this.value,gi); //D5 - a) Didnt understand the concept
   var cityName = placeValue.replace(newRegex, `<span class = "h1">${this.value}</span>`)
   var stateName = placeValue.replace(newRegex, `<span class = "h1">${this.value}</span>`)
   return `<li>  ${cityName}, ${stateName} </li>` }).join('');// D4 - a) at 13:24, place.population doesnt exists b) why return for 1 statement c)if join wasnt there then?
   console.log(suggestions);
   document.getElementById('suggestionsWords').innerHTML = suggestions;
}

document.getElementById('place').addEventListener('change', displayMatches);
document.getElementById('place').addEventListener('keyup', displayMatches);//D1 - Why keyup makes more sense than keydown?

//D6 - 16:30, numberWithCommas ? why and what is hapenning?