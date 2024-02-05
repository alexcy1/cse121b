/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
let templeList = [];


/* async displayTemples Function */
const displayTemples = (temples) => {
    temples.forEach((temple) => {
        // Create an HTML <article> element
        const article = document.createElement('article');
    
        // Create an HTML <h3> element and add the temple's templeName property to this new element.
        const templeNameHeader = document.createElement('h3');
        templeNameHeader.textContent = temple.templeName;
    
        // Create an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's location property to the alt attribute.
        const templeImage = document.createElement('img');
        templeImage.src = temple.imageUrl;
        templeImage.alt = temple.location;
    
        // Append the <h3> element and the <img> element to the <article> element as children. (appendChild)
        article.appendChild(templeNameHeader);
        article.appendChild(templeImage);
    
        // Append the <article> element to the global templesElement variable declared in Step 2.
        templesElement.appendChild(article);
      });
  };


/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
      // fetch() JSON temple data from the URL
      const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
  
      // Checking to see if the response is successful (with status code of 200)
      if (!response.ok) {
        throw new Error(`ERROR!! Unable to fetch temple data. Status: ${response.status}`);
      }
  
      // Convert the fetch response into a JavaScript object
      const templeData = await response.json();
  
      // Assign the result to the templeList global array variable
      templeList = templeData;
  
      // Call the displayTemples function and pass it the list of temples (templeList).
      displayTemples(templeList);
    } catch (error) {
      console.error('Error fetching temple data:', error.message);
    }
  };

  
/* reset Function */
const reset = () => {
    // Clear all of the <article> elements from the templesElement
    templesElement.innerHTML = '';
  };


/* filterTemples Function */
function filterTemples(temples) {

   // Clear the output or the displayed list of temples
    reset();

    // Define a variable named filter that obtains the value of the HTML element with the ID of filtered (The pull-down menu).
    const filter = document.querySelector("#filtered").value;

    // Use a switch statement that uses the filter value as the selector responding to four (4) cases.
    switch (filter) {
        case "utah":
            // Filter for temples where the location contains "Utah" as a string
            displayTemples(temples.filter(temple => temple.location.toLowerCase().includes("utah")));
            break;
        case "notutah":
            // Filter for temples where the location does not contain "Utah" as a string
            displayTemples(temples.filter(temple => !temple.location.toLowerCase().includes("utah")));
            break;
        case "older":
            // Filter for temples where the dedicated date is before 1950
            displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
            break;
        case "all":
            // No filter, display all temples
            displayTemples(temples);
            break;
        default:
            break;
    }
}

// Add a change event listener to the HTML element with an ID of filtered
document.querySelector("#filtered").addEventListener("change", () => {
    filterTemples(templeList);
});


getTemples();



