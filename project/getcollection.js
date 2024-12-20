document.addEventListener('DOMContentLoaded', () => {
    // الحصول على معرّف الفئة من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id'); // معرّف الفئة

    if (categoryId) {
        // جلب المنتجات بناءً على معرّف الفئة
        fetch(`https://mock.shop/api?query=%7B%20collection(id%3A%20%22${categoryId}%22)%20%7B%20id%20handle%20title%20description%20image%20%7B%20id%20url%20%7D%20products(first%3A%2020)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20featuredImage%20%7B%20id%20url%20%7D%20%7D%20%7D%20%7D%20%7D%7D`)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // طباعة البيانات المستلمة
            displayProducts(data.data.collection.products.edges);  // تمرير البيانات إلى دالة العرض
        })
        .catch(error => console.error('Error:', error));
    }
});

// دالة عرض المنتجات
function displayProducts(products) {
    const productGroup = document.querySelector('#searchResults');
    productGroup.innerHTML = '';

    // تأكد من أن المنتجات ليست فارغة
    if (!Array.isArray(products) || products.length === 0) {
        console.error("Invalid product data");
        return;
    }

    products.forEach(product => {
        const title = product.node.title || 'Untitled';
        const imageUrl = product.node.featuredImage ? product.node.featuredImage.url : 'images/default.webp';

        const productDiv = document.createElement('div');
        productDiv.classList.add('col');

        // رابط المنتج
        const productLink = `view-product.html?id=${product.node.id}`;

        productDiv.innerHTML = `
            <div class="box_main">
                <a href="${productLink}">
                    <div class="tshirt_img"><img src="${imageUrl}" alt="${title}"></div>
                </a>
            </div>
            <div class="detail-image">
                <a href="${productLink}">${title}</a>
            </div>
        `;
        
        productGroup.appendChild(productDiv);
    });
}
