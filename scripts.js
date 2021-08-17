let signin_button = document.querySelector(".login-button");
let signup_button = document.querySelector("#signUp");
let login = document.querySelector(".login-container");
let register = document.querySelector(".register-container");
let container = document.querySelector("#form-box");
let signUpForm = document.querySelectorAll("form")[1];

function signIn(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://lee-buka29.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        storage = window.localStorage;
        storage.setItem("jwt-token", data["access_token"]);
        storage.setItem("username", username);
        storage.setItem("password", password);
        window.location.href = "/home-page.html";
      }
    });
}

function signUp(name, surname, email, username, password) {
  console.log(name);
  console.log(surname);
  console.log(email);
  console.log(username);
  console.log(password);
  fetch("https://lee-buka29.herokuapp.com/register/", {
    method: "POST",
    body: JSON.stringify({
      name: `${name}`,
      surname: `${surname}`,
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function switch_side(e) {
  login.classList.toggle("active");
  register.classList.toggle("active");
  console.log(register.classList);
  if (register.classList.contains("active")) {
    container.style.transform = "translateX(95%)";
  } else {
    container.style.transform = "translateX(0%)";
  }
}

function userInfo(username) {
  fetch(`https://lee-buka29.herokuapp.com/view-profile/'${username}'`, {
    method: "GET",
  })
    .then((res) => res.json)
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("user-id", data.user[0]);
    });
}

userInfo(window.localStorage.getItem("username"));

function showProducts() {
  console.log(window.localStorage["jwt-token"]);
  fetch("https://lee-buka29.herokuapp.com/show-products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.data;
      console.log(products);
      products.forEach((product) => {
        console.log(product);
        document.querySelector(
          ".product-container"
        ).innerHTML += `<div class="product">
                          <div class="product_id"><img src="${product[2]}" alt="${product[1]}" /></div>
                          <h3 class="product_name">${product[1]}</h3>
                          <p class="price">Product Id: ${product[0]}</p>
                          <p class="description">${product[3]}</p>
                          <p class="type">${product[4]}</p>
                          <p class="quantity">${product[5]}</p>
                          <p class="price">${product[6]}</p>
                          <div class="product-buttons">
                            <button class="cart"><i class="fas fa-shopping-cart fa-2x"></i></button>
                          </div>
                        </div>`;
      });
    });
}

showProducts();

function previewFile() {
  const image = document.querySelector('.imageup');
  const file = document.querySelector('#aimage').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    image.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProduct(
  product_name,
  product_image,
  type,
  description,
  quantity,
  price,
  product_id
) {
  fetch("https://lee-buka29.herokuapp.com/create-products/", {
    method: "POST",
    body: JSON.stringify({
      product_name: `${product_name}`,
      product_image: `${product_image}`,
      type: `${type}`,
      description: `${description}`,
      quantity: `${quantity}`,
      price: `${price}`,
      id: `${product_id}`,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function viewProfile() {
  console.log(window.localStorage["jwt-token"]);
  fetch("https://lee-buka29.herokuapp.com/view-profile/<int:user_id>/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      users = data.data;
      console.log(users);
      users.forEach((user) => {
        console.log(user);
        document.querySelector(
          ".profile-container"
        ).innerHTML += `<div class="profile">
                            <h3 class="name">${user[1]} ${user[2]}</h3>
                            <p class="user_id">${user[0]}</p>
                            <p class="user-email">${user[3]}</p>
                            <p class="username">${user[4]}</p>
                            <p class="password">${user[5]}</p>
                            <div class="profile-buttons">
                              <button class="edit">Edit Profile</button>
                              <button class="delete">Delete Profile</button>
                            </div>
                          </div>`;
      });
    });
}

viewProfile();
