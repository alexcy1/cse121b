
// Array to store selected items
const cartItems = [];

// Declare menuArray in the global scope
let menuArray = [];
let apiUrl = 'https://run.mocky.io/v3/155927cf-4bf7-42a2-a423-4b5249ff535f'

// Fetch data from the API
fetch(apiUrl)
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        // Parse the JSON data
        return response.json();
    })
    .then(data => {
        // Display the content on the HTML page
        displayMenu(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error(`Fetch error:, ${error}`);
    });



let currentPage = 1;
const itemsPerPage = 6;

function displayMenu(menuData) {
    // Create HTML elements to display the menu items
    const menuContainer = document.getElementById(`menu-container`);
    const totalPages = Math.ceil(menuData.menu.length / itemsPerPage);

    if (!menuData || !menuData.menu || !Array.isArray(menuData.menu)) {
        console.error(`Invalid menu data:, ${menuData}`);
        return;
    }

    menuArray = menuData.menu;
    menuContainer.innerHTML = ''; // Clear existing content

    // Display only items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, menuData.menu.length);

    for (let i = startIndex; i < endIndex; i++) {
        const menuItem = menuData.menu[i];
        const menuItemElement = document.createElement('div');
        menuItemElement.innerHTML = `
            <div class="card">
                <img src="${menuItem.image || ''}" class="card-img-top" alt="Menu Item Image">
                <div class="card-body">
                    <h5 class="card-title">${menuItem.name || 'N/A'}</h5>
                    <p class="card-text">${menuItem.description || 'N/A'}</p>
                    <h5 class="card-text" style="color: red;">$${(menuItem.price || 0).toFixed(2)}</h5>
                    <div class="form-group d-flex align-items-center">
                        <label for="quantity-${menuItem.id}" class="mr-2"></label>
                        <input type="number" id="quantity-${menuItem.id}" value="${menuItem.quantity || 0}" min="0" class="form-control mr-2" style="width: 60px;">
                        <button onclick="addToCart(${menuItem.id})" class="btn btn-dark">Add to Cart</button>
                    </div>
                </div>
            </div>
            <br>
        `;
        menuContainer.appendChild(menuItemElement);
    }


    // Add next and previous buttons
    const navigationButtons = document.getElementById('navigation-buttons');
    navigationButtons.innerHTML = '';

    if (currentPage > 1) {  // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('btn', 'btn-secondary', 'mr-2');
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayMenu(menuData);
        });
        navigationButtons.appendChild(prevButton);
    }

    if (currentPage < totalPages) { // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('btn', 'btn-primary');
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayMenu(menuData);
        });
        navigationButtons.appendChild(nextButton);
    }

}



// Function to add an item to the shopping cart
function addToCart(itemId) {
    // Get the quantity input element for the specified item
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity > 0) {
        const selectedItem = {
            itemId: itemId,
            quantity: quantity
        };

        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.itemId === itemId);

        if (existingItemIndex !== -1) {
            // Update quantity if the item is already in the cart
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add the item to the cart if it's not already present
            cartItems.push(selectedItem);
        }

        // Update the cart display or perform any other actions
        updateCartDisplay();

        // Calculate total number of items in the cart
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById(`total-items`).textContent = totalItems;
    }
}


// Previous functions...
function updateCartDisplay() {
    const cartList = document.getElementById(`cart-list`);
    const cartDiscount = document.getElementById(`cart-discount`);
    const cartSubtotal = document.getElementById(`cart-subtotal`);
    const cartAmount = document.getElementById(`cart-amount`);
    const cartTaxAmount = document.getElementById(`cart-tax-amount`);
    const cartTotal = document.getElementById(`cart-total`);

    // Clear existing cart content
    cartList.innerHTML = '';

    // Iterate over cart items and display in the list
    let initialSubtotal = 0;
    initialTotal = 0;
    cartItems.forEach((item, index) => {
        const menuItem = menuArray.find(menuItem => menuItem.id === item.itemId);
        if (menuItem) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${menuItem.name} - Quantity: ${item.quantity} - Cost: $${(menuItem.price * item.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            `;
            cartList.appendChild(listItem);
            initialSubtotal += menuItem.price * item.quantity;
            initialTotal += menuItem.price * item.quantity;
        }
    });

    // Calculate tax (6% of the total cost)
    const taxPercentage = 6;
    const discountPercent = 100;

    let amount = 0;
    amount = initialTotal;
    let discount = 0;

    // calculate Discount Discount 
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const today = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    
    if (amount >= 200 && today === 'Friday') {
        discount = amount * (15 / discountPercent);
    } else if (today === 'Friday') {
        discount = amount * (10 / discountPercent);
    } else if (amount >= 200) {
        discount = amount * (8 / discountPercent);
    } else {
        discount = 0;
    }
    
    // Calculate Subtotal
    const subtotal = amount - discount;
    const taxAmount = (subtotal * taxPercentage) / 100;

    // Calculate TotalCost (subtotal + taxamount)
    const totalCost = subtotal + taxAmount;

    // Update totalcost, subtotal, and tax. Display in the cart
    cartAmount.textContent = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    cartDiscount.textContent = discount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    cartSubtotal.textContent = subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    cartTaxAmount.textContent = taxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    cartTotal.textContent = totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}





    



