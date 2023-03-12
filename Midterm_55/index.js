function createCards() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const products = data['LED Lights'];
      const container = document.getElementById('card-container');

      // Add product cards
      products.forEach(product => {
        // Create row for the card container
        const row = document.createElement('div');
        row.className = 'row';

        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container col-md-4';

        // Create card image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'card-image';
        const image = document.createElement('img');
        image.src = product['image'];
        image.alt = product['productName'];
        imageContainer.appendChild(image);

        // Create card content
        const contentContainer = document.createElement('div');
        contentContainer.className = 'card-content';
        const name = document.createElement('h2');
        name.textContent = product['productName'];
        const wattage = document.createElement('p');
        wattage.textContent = `Wattage: ${product['wattage']}`;
        const lifetime = document.createElement('p');
        lifetime.textContent = `Lifetime: ${product['lifetime']}`;
        const price = document.createElement('p');
        price.textContent = `Price: ${product['price']}`;
        contentContainer.appendChild(name);
        contentContainer.appendChild(wattage);
        contentContainer.appendChild(lifetime);
        contentContainer.appendChild(price);

        // Add image and content to card container
        cardContainer.appendChild(imageContainer);
        cardContainer.appendChild(contentContainer);

        // Add card container to row
        row.appendChild(cardContainer);

        // Add row to page
        container.appendChild(row);
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  createCards();
});
