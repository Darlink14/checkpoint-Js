// Initialise le panier avec des articles présélectionnés
let cart = [
    { name: 'Produit 1', price: 10, quantity: 1, favorite: false },
    { name: 'Produit 2', price: 20, quantity: 2, favorite: false }
];

// Fonction pour afficher le contenu du panier
function displayCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = ''; // Vide la liste avant de la recharger

    let total = 0;

    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ${product.price}€ x ${product.quantity}`;

        // Bouton pour augmenter la quantité
        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.onclick = function() {
            product.quantity += 1;
            saveCart();
            displayCart();
        };

        // Bouton pour diminuer la quantité
        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.onclick = function() {
            if (product.quantity > 1) {
                product.quantity -= 1;
                saveCart();
                displayCart();
            }
        };

        // Bouton pour supprimer l'article
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Supprimer';
        removeButton.onclick = function() {
            removeFromCart(index);
        };

        // Bouton pour marquer comme favori
        const favoriteButton = document.createElement('span');
        favoriteButton.textContent = '👍';
        favoriteButton.classList.add('favorite');
        if (product.favorite) {
            favoriteButton.classList.add('active');
        }
        favoriteButton.onclick = function() {
            product.favorite = !product.favorite;
            saveCart();
            displayCart();
        };

        listItem.appendChild(decrementButton);
        listItem.appendChild(incrementButton);
        listItem.appendChild(favoriteButton);
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);

        total += product.price * product.quantity;
    });

    // Afficher le total
    document.getElementById('cart-total').textContent = `Total: ${total}€`;
}

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
    cart.splice(index, 1); // Retire l'article à l'index spécifié
    saveCart();
    displayCart();
}

// Fonction pour sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Charger le panier depuis le localStorage lors du chargement de la page
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
    }
    displayCart();
}

// Charger le panier lors du chargement de la page
window.onload = loadCart;