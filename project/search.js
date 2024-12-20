document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector("button");
    const productsContainer = document.getElementById("products-container");

    // عند الضغط على زر البحث
    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "") return;

        // طلب البيانات من API
        const url = `https://fakestoreapi.com/products`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // فلترة المنتجات بناءً على كلمة البحث
                const filteredProducts = data.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                updateProductsContainer(filteredProducts);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    });

    function updateProductsContainer(products) {
        productsContainer.innerHTML = ""; // Clear existing products
    
        if (products.length === 0) {
            productsContainer.innerHTML = "<p>No matching products found.</p>";
            return;
        }
    
        // إضافة تنسيق grid للمنتجات
        productsContainer.style.display = 'grid';
        productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        productsContainer.style.gap = '20px';
        productsContainer.style.padding = '20px';
        productsContainer.style.justifyItems = 'center';

        products.forEach(product => {
            const title = product.title || "No title available";
            const description = product.description || "No description available";
            const price = product.price || "N/A"; // Assuming price exists in the API response
            const image = product.image || 'default-image.jpg'; // Fallback image

            const productHTML = `
                <div class="col" style="background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;">
                    <a href="view-product.html?id=${product.id}">
                        <div class="tshirt_img">
                            <img src="${image}" alt="${title}" style="width: 100%; height: auto; border-radius: 10px;">
                        </div>
                    </a>
                    <div class="detail-image" style="padding: 10px;">
                        <a href="view-product.html?id=${product.id}" style="font-size: 18px; font-weight: bold; color: #333;">${title}</a>
                        <h4 style="color: #b74b4b;">${price}</h4>
                        <p style="font-size: 14px; color: #666;">${description}</p>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });
    }
});
