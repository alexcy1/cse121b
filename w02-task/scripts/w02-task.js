/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 3 - Element Variables */

/* Step 2 - Variables */

/* Step 4 - Adding Content */

/* Step 5 - Array */



// NAME -----------------------------------------------------------------------------
// const fullName = 'Alexander Cyril'
// document.querySelector('#name').textContent = fullName;

const fullName = 'Alexander Cyril';
const nameElement = document.querySelector('#name');
nameElement.innerHTML = `<strong>${fullName}</strong>`;


// CURRENT YEAR ---------------------------------------------------------------------
const currentYear = new Date().getFullYear();
document.querySelector('#year').textContent = currentYear;

// PROFILE IMAGE ---------------------------------------------------------------------
const profileImage = 'images/alex.png'
document.querySelector('img').src = profileImage;

// FAVORITE FOODS---------------------------------------------------------------------
const myFavoriteFood = ['Beans', 'Rice', 'Plantain', 'Yam', 'Potato', 'Pizza'];
const foodElement = document.getElementById('food');
foodElement.innerHTML = myFavoriteFood.join(', ');

// Add/push a single food 
const singleFavoriteFood = 'Ice Cream';
myFavoriteFood.push(singleFavoriteFood);
foodElement.innerHTML += `<br>${myFavoriteFood.join(', ')}`;

// Remove the first item
myFavoriteFood.shift();
foodElement.innerHTML += `<br>${myFavoriteFood.join(', ')}`;

// Remove the last item
myFavoriteFood.pop();
foodElement.innerHTML += `<br>${myFavoriteFood.join(', ')}`;










