const openCartButton = document.getElementById("open-cart-button");
const cartModalContainer = document.getElementById("cart-modal-container");
const cartItemsCounter = document.getElementById("cart-items-counter");

const displayCart = () => {
  cartModalContainer.innerHTML = "";
  cartModalContainer.style.display = "flex";

  const cartModalHeader = document.createElement("div");
  cartModalHeader.className = "cart-modal-header";
  cartModalHeader.innerHTML = `
    <h1 class="cart-modal-header-title">Cart.</h1>
  `;

  cartModalContainer.append(cartModalHeader);

  const cartModalHeaderbutton = document.createElement("h1");
  cartModalHeaderbutton.innerText = "x";
  cartModalHeaderbutton.className = "cart-modal-header-button";

  cartModalHeader.append(cartModalHeaderbutton);

  cartModalHeaderbutton.addEventListener("click", () => {
    cartModalContainer.style.display = "none";
  });

  cart.forEach((product) => {
    const cartModalContent = document.createElement("div");
    cartModalContent.className = "cart-modal-content";
    cartModalContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <span class="decrese-product-quanty"> - </span>
        <p>${product.quanty}</p>
        <span class="incrise-product-quanty"> + </span>
        <p> ${product.quanty * product.price} $</p>
        <span class="delete-product">❌</span>
      `;

    cartModalContainer.append(cartModalContent);

    const decreseQunaty = cartModalContent.querySelector(".decrese-product-quanty");

    decreseQunaty.addEventListener("click", () => {
      if (product.quanty !== 1) {
        product.quanty--;
      }
      saveLocal();
      displayCart();
      cartCounter();
    });

    const incriseQuanty = cartModalContent.querySelector(".incrise-product-quanty");
    incriseQuanty.addEventListener("click", () => {
      product.quanty++;
      saveLocal();
      displayCart();
      cartCounter();
    });

    const deleteProduct = cartModalContent.querySelector(".delete-product");

    deleteProduct.addEventListener("click", () => {
      deleteCartProduct(product.id);
    });
  });

  const totalBuying = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

  const cartModalBotton = document.createElement("div");
  cartModalBotton.className = "cart-modal-botton";
  cartModalBotton.innerHTML = `total: ${totalBuying} $`;
  cartModalContainer.append(cartModalBotton);
};

openCartButton.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = cart.find((element) => element.id === id);

  cart = cart.filter((cartId) => {
    return cartId !== foundId;
  });

  saveLocal();
  displayCart();
  cartCounter();
};

const cartCounter = () => {
  cartItemsCounter.style.display = "block";

  const carritoLength = cart.reduce((acc, el) => acc + el.quanty, 0);

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cartItemsCounter.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

cartCounter();
