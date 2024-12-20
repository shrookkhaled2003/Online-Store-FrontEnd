document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // الحصول على العربة من localStorage
  
  if (cart.length === 0) {
    document.getElementById('cartMessage').textContent = 'عربتك فارغة!';
  } else {
    cart.forEach(item => {
      // جلب بيانات المنتج من API باستخدام الـ productId
      fetch(`https://fakestoreapi.com/products/${item.productId}`)
        .then(response => {
          // التحقق من أن الاستجابة كانت ناجحة (status 200)
          if (!response.ok) {
            throw new Error('حدث خطأ في الاتصال بالـ API');
          }
          return response.json(); // تحويل الاستجابة إلى JSON
        })
        .then(product => {
          displayCartItem(product, item.quantity); // عرض تفاصيل المنتج في العربة
        })
        .catch(error => {
          console.error('حدث خطأ في جلب البيانات:', error);
        });
    });
  }
});

// دالة لعرض تفاصيل المنتج في العربة
function displayCartItem(product, quantity) {
  const cartContainer = document.getElementById('cartContainer');
  
  // تحقق مما إذا كان المنتج موجودًا بالفعل في العربة
  let existingItem = document.querySelector(`#product-${product.id}`);

  if (existingItem) {
    // إذا كان المنتج موجودًا بالفعل، قم بتحديث الكمية فقط
    const quantityInput = existingItem.querySelector('#quantity');
    quantityInput.value = quantity;
  } else {
    // إذا كان المنتج غير موجود، قم بإنشاء عنصر جديد
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('product-container');
    cartItemDiv.id = `product-${product.id}`; // إضافة ID مميز للمنتج

    // هيكل العرض الذي طلبته
    cartItemDiv.innerHTML = `
      <!-- Product Image Section -->
      <div class="product-image">
        <img src="${product.image}" alt="Product Image">
      </div>

      <!-- Product Details Section -->
      <div class="product-details">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price} USD</div>
        <div class="product-shipping">Shipping calculated at checkout.</div>

        <!-- Quantity Selector -->
        <div class="quantity-container">
          <label for="quantity">Quantity</label>
          <div class="quantity-selector">
            <button class="quantity-button" id="decrement-${product.id}">−</button>
            <input type="text" id="quantity" class="quantity-input" value="${quantity}" readonly>
            <button class="quantity-button" id="increment-${product.id}">+</button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="button-container">
          <div class="add-to-cart">
            <a href="#" id="addToCartLink">Add to cart</a>
          </div>
          <div class="buy-now">
            <a href="contact.html">Buy it now</a>
          </div>
        </div>

        <!-- Product Information -->
        <div class="product-info">${product.description}</div>
      </div>

      <!-- Product Care Instructions -->
      <div class="product-care">
        <strong>Product Care:<br></br></strong>
        <ul id="productCare">
          <li>It's preferable to dry clean all our products.</li>
          <li>Avoid Washing Machine.</li>
          <li>Do not use bleach.</li>
          <li>Wash inside out.</li>
        </ul>
      </div>
    `;

    // إضافة العنصر إلى الحاوية
    cartContainer.appendChild(cartItemDiv);

    // إضافة أحداث الأزرار الخاصة بالكمية
    const decrementButton = document.getElementById(`decrement-${product.id}`);
    const incrementButton = document.getElementById(`increment-${product.id}`);

    decrementButton.addEventListener('click', () => {
      let quantityInput = document.querySelector(`#product-${product.id} #quantity`);
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateCart(product.id, quantity);
      }
    });

    incrementButton.addEventListener('click', () => {
      let quantityInput = document.querySelector(`#product-${product.id} #quantity`);
      let quantity = parseInt(quantityInput.value);
      quantity++;
      quantityInput.value = quantity;
      updateCart(product.id, quantity);
    });
  }
}

// دالة لتحديث العربة في localStorage
function updateCart(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex !== -1) {
    // تحديث الكمية في العربة
    cart[itemIndex].quantity = quantity;
  }

  // تخزين العربة المحدثة في localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}
document.addEventListener('DOMContentLoaded', () => {
  // جلب المنتجات من API
  fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
          console.log(data);  // طباعة البيانات المستلمة
          displayProducts(data.slice(0, 4));  // عرض أول 4 منتجات فقط
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
