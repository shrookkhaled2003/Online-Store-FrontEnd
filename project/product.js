document.addEventListener('DOMContentLoaded', () => {
  // الحصول على معرف المنتج من الرابط
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const userId  = localStorage.getItem('userId'); // افتراضًا أن الـ userId يتم تخزينه في localStorage
  if (productId) {
    // تخزين الـ productId في localStorage
    localStorage.setItem('productId', productId);
  } else {
    console.error('Product ID is missing in URL');
  }

  // جلب بيانات المنتج من API باستخدام الـ productId
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('حدث خطأ في جلب البيانات');
      }
      return response.json();
    })
    .then(product => {
      displayProduct(product); // عرض بيانات المنتج
    })
    .catch(error => {
      console.error('حدث خطأ في جلب البيانات:', error);
    });

  // جلب 4 منتجات من الـ API لعرضهم
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      // أخذ أول 4 منتجات فقط
      const selectedProducts = products.slice(0, 4);
      displayProducts(selectedProducts); // عرض المنتجات
    })
    .catch(error => {
      console.error('حدث خطأ في جلب البيانات:', error);
    });
});

// وظيفة لعرض بيانات المنتج
function displayProduct(product) {
  const productImage = product.image;
  const productTitle = product.title;
  const productPrice = `${product.price} USD`;
  const productDescription = product.description;

  // تحديث المحتوى في الصفحة
  document.getElementById('productImage').src = productImage;
  document.getElementById('productTitle').textContent = productTitle;
  document.getElementById('productPrice').textContent = productPrice;
  document.getElementById('productInfo').textContent = productDescription;

  // إضافة الحدث على زر "Add to Cart"
  const addToCartLink = document.getElementById('addToCartLink');
  if (addToCartLink) {
    addToCartLink.addEventListener('click', (e) => {
      e.preventDefault(); // لمنع الصفحة من إعادة التحميل

      // جلب الكمية من الـ DOM
      const quantity = document.getElementById('quantity').value || 1;

      // استدعاء دالة addToCart مع الـ productId والكمية
      addToCart(product, quantity);
    });
  }
}

function displayProducts(products) {
  const productRow = document.querySelector('.row'); // تحديد العنصر الذي يحتوي على المنتجات

  // مسح المحتوى الحالي داخل العنصر قبل إضافة المنتجات الجديدة
  productRow.innerHTML = '';

  // عرض أول 4 منتجات
  products.slice(0, 4).forEach(product => {
    const productCol = document.createElement('div');
    productCol.classList.add('col');

    productCol.innerHTML = `
      <div class="box_main">
        <a href="view-product.html?id=${product.id}">
          <div class="tshirt_img">
            <img src="${product.image}" alt="${product.title}">
          </div>
        </a>
      </div>
      <div class="detail-image">
        <a href="view-product.html?id=${product.id}">${product.title}</a>
        <h4>${product.price} USD</h4>
      </div>
    `;

    // إضافة العنصر الجديد إلى صف المنتجات
    productRow.appendChild(productCol);
  });
}

// دالة لإضافة المنتج إلى العربة
function addToCart(product, quantity) {
  const userId = localStorage.getItem('userId'); // الحصول على الـ userId من localStorage

  if (!userId) {
    alert('لم يتم العثور على معرف المستخدم. يرجى تسجيل الدخول.');
    return;
  }

  // بناء كائن المنتج الذي سيتم إرساله إلى الـ API
  const cartItem = {
    userId: parseInt(userId), // استخدام id الديناميكي
    products: [
      {
        productId: product.id, // تأكد من أن الـ productId يتم تمريره بشكل صحيح
        quantity: parseInt(quantity)
      }
    ]
  };

  // إرسال الطلب إلى API لإضافة المنتج إلى العربة
  fetch('https://fakestoreapi.com/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  })
    .then(response => response.json())
    .then(data => {
      console.log('تمت إضافة المنتج إلى العربة:', data);
      alert('تم إضافة المنتج إلى العربة بنجاح!');
      showModal();
      
      // تحديث العربة في localStorage بعد إضافة المنتج
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ productId: product.id, quantity: quantity });
      localStorage.setItem('cart', JSON.stringify(cart));
    })
    .catch(error => console.error('حدث خطأ أثناء الاتصال بالـ API:', error));
}

// عرض رسالة النجاح في الـ Modal
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // إغلاق الـ modal عند الضغط على زر الإغلاق
  document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';

  // إغلاق الـ modal عند الضغط خارج النافذة
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
  };
}
