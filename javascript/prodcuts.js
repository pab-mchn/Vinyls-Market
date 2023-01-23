const productCardContainer = document.getElementById("product-card-container");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

stock.forEach((product) => {
  const productCardContent = document.createElement("div");
  productCardContent.className = "card";
  productCardContent.innerHTML = `
    <img src="${product.img}">
    <h2>${product.name}</h2>
    <h3>${product.price} $</h3>
  `;

  productCardContainer.append(productCardContent);

  const productCardButton = document.createElement("button");
  productCardButton.innerText = "Buy";

  productCardContent.append(productCardButton);

  productCardContent.addEventListener("click", () => {
    const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quanty++;
        }
      });
      cartCounter();
    } else {
      cart.push({
        id: product.id,
        img: product.img,
        name: product.name,
        quanty: product.quanty,
        price: product.price,
      });
      cartCounter();

      saveLocal();
    }
  });
});

const saveLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
