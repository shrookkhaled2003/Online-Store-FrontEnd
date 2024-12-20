document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
  });
  
  function fetchCategories() {
    fetch('https://mock.shop/api?query=%7B%20collections(first%3A%2010)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20description%20image%20%7B%20url%20%7D%20%7D%20%7D%20%7D%7D')
      .then(response => response.json())
      .then(data => {
        const categories = data.data.collections.edges.map(edge => edge.node);
        displayCategories(categories); // Display all categories
      })
      .catch(error => console.error('Error fetching categories:', error));
  }
  
  function displayCategories(categories) {
    const categoryContainer = document.querySelector('.row');
    categoryContainer.innerHTML = '';
    
    categories.forEach(category => {
      const imagePath = category.image ? category.image.url : 'images/default.webp';
      
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('col');
      categoryDiv.innerHTML = `
        <div class="box_main">
          <a href="${category.id}.html">
            <div class="tshirt_img"><img src="${imagePath}" alt="${category.title}"></div>
          </a>
          <a href="${category.id}.html">${category.title}</a>
          <p>${category.description || 'No description available'}</p>
        </div>
      `;
      categoryContainer.appendChild(categoryDiv);
    });
  }
  