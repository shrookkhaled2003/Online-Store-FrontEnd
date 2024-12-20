document.addEventListener('DOMContentLoaded', () => {
    // جلب المنتجات من الـ API
    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then(response => response.json())
        .then(data => {
            console.log(data);  // طباعة البيانات المستلمة
            displayProducts(data);  // تمرير البيانات إلى دالة العرض
        })
        .catch(error => console.error('Error:', error));
});

// دالة عرض المنتجات
function displayProducts(products) {
    const productGroup = document.querySelector('.row');
    productGroup.innerHTML = ''; // مسح المحتوى السابق

    // تأكد من أن المنتجات ليست فارغة
    if (!Array.isArray(products) || products.length === 0) {
        console.error("Invalid product data");
        return;
    }

    // عرض المنتجات
    products.forEach(product => {
        const title = product.title || 'Untitled';
        const imageUrl = product.image || 'images/default.webp';
        const price = product.price ? `${product.price} EGP` : 'N/A';

        const productDiv = document.createElement('div');
        productDiv.classList.add('col');

        // رابط المنتج
        const productLink = `view-product.html?id=${product.id}`;

        productDiv.innerHTML = `
            <div class="box_main">
                <a href="${productLink}">
                    <div class="tshirt_img"><img src="${imageUrl}" alt="${title}"></div>
                </a>
            </div>
            <div class="detail-image">
                <a href="${productLink}">${title}</a>
                <h4>${price}</h4>
            </div>
        `;
        
        productGroup.appendChild(productDiv);
    });
}
