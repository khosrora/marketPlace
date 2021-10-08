// ! get item
const addToCartBtn = document.getElementById("addTocart");
const cartDOM = document.querySelector(".cart__items");
const totalCount = document.querySelectorAll(".cart_quantity");
const totalPrice = document.querySelectorAll(".price");



let cartItems = (JSON.parse(localStorage.getItem("cart___items")) || []);
document.addEventListener("DOMContentLoaded", loadData)



if (addToCartBtn !== null) {
    addToCartBtn.addEventListener("click", e => {
        e.preventDefault();


        // ! get parent 
        var parentElement = document.getElementById("card__item");

        var product = {
            id: parentElement.querySelector("#product__id").value,
            idSeller: parentElement.querySelector("#product__id_Seller").value,
            title: parentElement.querySelector("#product__title").innerText,
            price: parentElement.querySelector(".current_price").innerText,
            image: parentElement.querySelector("#product__image").value,
            quantity: 1,
        }

        let isInCart = cartItems.filter(item => item.id === product.id).length > 0;

        if (!isInCart) {
            cartItems.push(product);
            saveToLocalStorage();
        } else {
            return alert("این محصول در سبد خرید موجود است");
        }
    })

}
// ! save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("cart___items", JSON.stringify(cartItems));
    document.cookie = `cart___items  = ${JSON.stringify(cartItems)};`
}
// ! show product in cart html
function addItemToTheDom(product) {
    cartDOM.insertAdjacentHTML("afterbegin", `
    <tr class="cart__item">
    <td class="product_remove" action='remove'><p class="h2" style="cursor:pointer;color : #0061d1;"><i class="fa fa-trash-o"></i></p></td>
    <td class="product_thumb">
        <a href="#"><img src="/uploads/images/${product.image}" alt=""></a>
        <input type="hidden" name="" id="product__id" value="${product.id}">
    </td>
    <td class="product_name"><a href="#">${product.title}</a></td>
    <td class="product-price">${product.price} تومان</td>
    <td class="product_quantity">
        <label>تعداد</label>
        <input class="product__quantity" min="1" max="100" value="${product.quantity}" type="number" action='count'>
    </td>
    </tr>
    `)
}

// ! calc total price
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * item.price
    })

    document.querySelector(".cart_amount").innerText = total;
    totalPrice.forEach(i => i.innerText = total)
    totalCount.forEach(i => i.innerText = cartItems.length)
}

// ! load data
function loadData() {
    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            addItemToTheDom(product);

            const cartDOMItems = document.querySelectorAll(".cart__item");
            cartDOMItems.forEach(inItem => {
                if (inItem.querySelector("#product__id").value === product.id) {
                    removeItem(inItem, product)
                    priceItem(inItem, product)
                }
            })
        });
        calculateTotal();
        saveToLocalStorage();
    }
}


// ! removeItem
const removeItem = (inItem, product) => {
    inItem.querySelector("[action='remove']").addEventListener("click", () => {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItems = cartItems.filter(newElement => newElement.id !== product.id);
                inItem.remove();
                calculateTotal();
                saveToLocalStorage();
            }
        })
    })
}


// ! priceItem 
const priceItem = (inItem, product) => {
    inItem.querySelector(".product__quantity").addEventListener("click", () => {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItem.quantity = inItem.querySelector(".product__quantity")
                    .value;
                calculateTotal();
                saveToLocalStorage();
            }
        })
    })
}