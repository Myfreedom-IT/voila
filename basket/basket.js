const cards = document.querySelector(".boxs");
const nullBasket = document.querySelector(".Null-basket");
const payBox = document.querySelector(".pay-box")
const sum = document.querySelector(".sum")
const boxPopup = document.querySelector('.popup')
// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    renderCart();
    quantityHandler();
});


function normalizeCart() {
    const cart = JSON.parse(localStorage.getItem('basket')) || [];

    const uniqueMap = {};

    cart.forEach(item => {
        if (uniqueMap[item.id]) {
            uniqueMap[item.id].quantity += item.quantity || 1;
        } else {
            uniqueMap[item.id] = {
                ...item,
                quantity: item.quantity || 1
            };
        }
    });

    const newCart = Object.values(uniqueMap);

    localStorage.setItem('basket', JSON.stringify(newCart));

    return newCart;
}

function renderCart() {
    console.log('renderCart вызвана');
    const savedData = localStorage.getItem('basket');
    // const savedData = el;
    console.log('Данные из localStorage:', savedData);

    if (savedData) {
        const cart = normalizeCart();
        if (!cart.length) {
            cards.innerHTML = '';
            nullBasket.classList.remove('close');
            nullBasket.classList.add('open');
            payBox.classList.add("close")
            return;
        } else {
             payBox.classList.remove("close")
            if (nullBasket) nullBasket.classList.remove('open');
            console.log('Распарсенная корзина:', cart);
            const total = getTotalSum(cart);
            sum.textContent = `Итого: ${total} руб`;
            if (cards) {
                cards.innerHTML = '';
                cart.forEach(item => {
                    let volume = item.volume ? `<p>Объем одного: ${item.volume} мл</p>` : '';
                    const template = `
                    <div class="boxs">
                 <div class="box">
                        <div class="box-img">
                            <img src="${item.photo}" alt="${item.name}">
                            <h3 class="name-product">${item.name}</h3>
                        </div>
                        <div class="main-box">
                        <div class="info-box">
                            ${volume}
                            <p>Цена за один: ${item.price} руб</p>
                            <p>Количество: ${item.quantity}</p>
                            <p>Сумма: ${item.price * item.quantity} руб</p>
                        </div>   
                        <div class="box-button">
                            <button class="quantity-button minus" data-id="${item.id}">-</button>
                            <button class="quantity-button plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    </div>
            </div>
                   

                        
                `;
                    cards.innerHTML += template;

                });
            }
        }
    }
}

document.addEventListener('click', (event) => {
    const clickedElement = event.target
    if(clickedElement.matches(".popup")){
        boxPopup.classList.remove("open")
    } 
    if (clickedElement.matches('.button-buy')) {
        boxPopup.classList.add("open")
    }
    if (clickedElement.matches('.btn-close')) {
        boxPopup.classList.remove("open")
    }
})

function getTotalSum(cart) {
    return cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
}

function quantityHandler() {
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.classList.contains("plus") && !target.classList.contains("minus")) {
            return;
        }
        const id = target.dataset.id;
        let cart = JSON.parse(localStorage.getItem('basket')) || [];
        cart = cart.map(item => {
            if (item.id == id) {
                if (target.classList.contains("plus")) {
                    return {
                        ...item,
                        quantity: (item.quantity || 1) + 1
                    };
                }
                if (target.classList.contains("minus")) {
                    return {
                        ...item,
                        quantity: (item.quantity || 1) - 1
                    };
                }
            }
            return item;
        });

        // удаляем товары с quantity <= 0
        cart = cart.filter(item => item.quantity > 0);
        localStorage.setItem('basket', JSON.stringify(cart));
        renderCart(); // перерисовываем корзину
    });
}