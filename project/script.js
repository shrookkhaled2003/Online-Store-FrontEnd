document.addEventListener('DOMContentLoaded', () => {
    
    fetchCategories();
    
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // طباعة البيانات المستلمة
    displayProducts(data);  // تمرير البيانات إلى الدالة
  })
  .catch(error => console.error('Error:', error));

    
  });
  
  // دالة جلب الفئات
  function fetchCategories() {
    fetch('https://mock.shop/api?query=%7B%20collections(first%3A%2010)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20description%20image%20%7B%20url%20%7D%20%7D%20%7D%20%7D%7D')
      .then(response => response.json())
      .then(data => {
        const categories = data.data.collections.edges.map(edge => edge.node);
        displayCategories(categories.slice(0, 4)); // عرض أول 4 فئات
      })
      .catch(error => console.error('Error fetching categories:', error));
  }
  
  // دالة جلب المنتجات
  /* function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.products && data.data.products.edges) {
          const products = data.data.products.edges;
          displayProducts(products.slice(0, 4)); // عرض أول 4 منتجات
        } else {
          console.error('Invalid product data');
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  } */
  
  // دالة عرض الفئات
  function displayCategories(categories) {
    const categoryContainer = document.querySelector('.row');
    categoryContainer.innerHTML = '';
    
    categories.forEach(category => {
      const imagePath = category.image ? category.image.url : 'images/default.webp';
      
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('col');
      categoryDiv.innerHTML = `
        <div class="box_main">
          <a href="getcollection.html?id=${category.id}">
            <div class="tshirt_img"><img src="${imagePath}" alt="${category.title}"></div>
          </a>
          <a href="getcollection.html?id=${category.id}">${category.title}</a>
          <p>${category.description || 'No description available'}</p>
        </div>
      `;
      categoryContainer.appendChild(categoryDiv);
    });
  }
  
  
  // دالة عرض المنتجات
 // دالة لجلب البيانات من API وعرض المنتجات
 function displayProducts(products) {
  const productGroup = document.querySelector('.product-group');
  productGroup.innerHTML = '';

  // تأكد من أن المنتجات ليست فارغة
  if (!Array.isArray(products) || products.length === 0) {
      console.error("Invalid product data");
      return;
  }

  // عرض أول 4 منتجات فقط
  const limitedProducts = products.slice(0, 4);

  limitedProducts.forEach(product => {
      const title = product.title || 'Untitled';
      const imageUrl = product.image ? product.image : 'images/default.webp';
      const price = product.price ? `${product.price} EGP` : 'N/A';

      const productDiv = document.createElement('div');
      productDiv.classList.add('col1');
      
      // رابط المنتج
      const productLink = `view-product.html?id=${product.id}`;

      productDiv.innerHTML = `
          <div class="box_main1">
              <a href="${productLink}">
                  <div class="tshirt_img1"><img src="${imageUrl}" alt="${title}"></div>
              </a>
              <div class="detail-image1">
                  <a href="${productLink}">${title}</a>
                  <h4>${price}</h4>
              </div>
          </div>
      `;
      productGroup.appendChild(productDiv);
  });
}




 