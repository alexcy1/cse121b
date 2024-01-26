/* LESSON 3 - Programming Tasks */

// Profile Object ********************************************************
let myProfile = {};

// Populate Profile Object with placesLive objects ***********************
myProfile = {
    name: "Alexander Cyril",
    photo: "images/alex.png",

    favoriteFoods: [
      'Rice',
      'Tikka Masala',
      'Prioshki',
      'Shrimp',
      'Banana Cream Pie'
    ],
    hobbies: [
        'Hiking and Camping',
        'Cycling',
        'Swimming',
        'Cooking',
        'Painting',
        'Reading',
        'Writing'
    ],
    placeLived: []
}

myProfile.placeLived.push(
    {
        place: "Magodo Ikeja, Lagos, LAG",
        length: "6 years"
    },
    {
        place: "New York City, NY",
        length: "3 years"
    },
    {
        place: "San Francisco, CA",
        length: "2 years"
    },
);


/* DOM Manipulation - Output */

// Name ********************************************************************
document.querySelector('#name').textContent = myProfile.name;

// Photo With Attributes ***************************************************
document.querySelector('#photo').src = myProfile.photo;
document.querySelector('#photo').alt = myProfile.name;


// Favorite Foods List ***************************************************
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
  });


// Hobbies List ***********************************************************
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
  });
  

  // Places Lived DataList **********************************************************
  let myPlaces = "";
  let places = myProfile.placeLived;
  
  places.forEach(countPlaces);
  document.getElementById("places-lived").innerHTML = myPlaces;
  
  function countPlaces(place) {
      myPlaces += "<dt>" + place.place + "</dt>" + "<dd>" + place.length + " years" + "</dd>";
  }
  
