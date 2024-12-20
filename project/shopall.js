document.addEventListener('DOMContentLoaded', () => {
  // عرض المنتجات عند تحميل الصفحة
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        displayProducts(data); // تم تعديل الدالة لتعمل مع البيانات بشكل صحيح
      } else {
        console.error('No valid product data found.');
      }
    })
    .catch(error => console.error('Error fetching products:', error));
});

// دالة لعرض المنتجات
function displayProducts(products) {
  const productContainer = document.querySelector('.fashion_section_2 .row');
  
  // مسح المنتجات السابقة في الحاوية
  productContainer.innerHTML = '';
  
  // تكرار المنتجات وعرضها
  products.forEach(product => {
    const productImage = product.image;
    const productTitle = product.title;
    const productDescription = product.description;
    const productPrice = product.price + ' USD';
    
    const productHTML = `
      <div class="col">
        <div class="box_main">
          <a href="view-product.html?id=${product.id}">
            <div class="tshirt_img">
              <img src="${productImage}" alt="${productTitle}">
            </div>
          </a>
        </div>
        <div class="detail-image">
          <a href="view-product.html?id=${product.id}">${productTitle}</a>
          <p style="height: 60px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${productDescription}</p>
          <h4>${productPrice}</h4>
        </div>
      </div>
    `;
    
    // إضافة المنتج الجديد إلى الحاوية
    productContainer.innerHTML += productHTML;
  });
}
