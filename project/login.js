function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // إرسال البيانات إلى API لتسجيل الدخول
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful:', data);
        alert('Login successful!');

        // البحث عن الـ id باستخدام الـ email
        fetch('https://fakestoreapi.com/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === email); // البحث عن المستخدم باستخدام البريد الإلكتروني
                if (user) {
                    // تخزين الـ userId في localStorage
                    localStorage.setItem('id', user.id);
                     console.log('id', user.id)
                    // تحويل المستخدم إلى index.html بعد تخزين الـ id
                    window.location.href = 'index.html';
                } else {
                    alert('User not found');
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                alert('Error fetching users');
            });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    });
}

function register() {
    // استرجاع القيم من الحقول
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    // التحقق من أن جميع الحقول ممتلئة
    if (!name || !username || !email || !password) {
        alert('Please fill in all the fields!');
        return;
    }

    const url = 'https://fakestoreapi.com/users';

    // تقسيم الاسم إلى firstName و lastName
    const [firstName, lastName] = name.split(' ');

    // بيانات المستخدم
    const userData = {
        email: email,
        username: username,
        password: password,
        name: {
            firstname: firstName || '',
            lastname: lastName || ''
        },
        address: {
            city: "unknown",
            street: "unknown",
            number: 0,
            zipcode: "00000",
            geolocation: {
                lat: "0",
                long: "0"
            }
        },
        phone: "000-000-0000"
    };

    // إرسال البيانات إلى API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered successfully:', data);
        alert('Registration successful!');
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Registration failed!');
    });
    // إعادة التوجيه إلى index.html
    window.location.href = 'index.html';
}

