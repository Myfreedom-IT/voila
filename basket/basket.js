const cards = document.querySelector(".boxs");
const nullBasket = document.querySelector(".Null-basket");
const payBox = document.querySelector(".pay-box")


// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, отрисовываем корзину');
    renderCart()
});




function addToCart(newProduct) {
    console.log('addToCart вызвана с товаром:', newProduct);
    let cart = [];
    console.log('Текущая корзина до добавления:', cart);
    
    let existingIndex = cart.some(item => item.id === newProduct.id)
        if(existingIndex) {
        newProduct.quantity += 1;
        console.log('Товар уже есть, увеличиваем количество до:', newProduct.quantity);
    } else {
        newProduct.quantity = 1;
        cart.push(newProduct)
        console.log('Новый товар добавлен');
        console.log(cart)
        console.log('Корзина сохранена в localStorage:', cart);
        
    }
    return
}
function renderCart() {
    console.log('renderCart вызвана');
    const savedData = localStorage.getItem('basket');
    // const savedData = el;
    console.log('Данные из localStorage:', savedData);
    
    if (savedData) {
        const cart = JSON.parse(savedData);
        //  const cart = savedData
        console.log('Распарсенная корзина:', cart);
        
        if (cards) {
            cards.innerHTML = '';
            
            cart.forEach(item => {
                let volume = item.volume ? `<p>Объем одного: ${item.volume} мл</p>` : '';
                addToCart(item)
                const template = `
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
                            <button class="quantity-button -">-</button>
                            <button class="quantity-button +">+</button>
                        </div>
                    </div>
                    </div>
                        
                `;
                cards.innerHTML += template;
                
            });
           
        } else {
            console.warn('Элемент .boxs не найден на этой странице');
        }
    } else {
        console.log('localStorage пуст, показываем заглушку');
            nullBasket.classList.remove('close');
            nullBasket.classList.add('open');
    }
     quanity()
}
function quanity() {
document.addEventListener("click", (event) => {
    const clickedElement = event.target
    if(clickedElement.classList.contains('+')){
        clickedElement.quanity += 1
    } else if(clickedElement.classList.contains('-')){
        clickedElement.quanity -= 1
        if(clickedElement.quanity === 0){
            let cart = JSON.parse(localStorage.getItem('basket')) || [];
            cart = cart.filter(item => item.id !== clickedElement.id)
        }
    }
    renderCart()
})
}



// Для теста (раскомментируйте, если нужно)
// addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });
// addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });


// const cards = document.querySelector(".boxs");
// const nullBasket = document.querySelector(".null-busket");

// function addToCart(newProduct) {
//     if (!newProduct || !newProduct.id) {
//         console.error('Ошибка: товар не передан или отсутствует id');
//         return;
//     }
    
//     let cart = JSON.parse(localStorage.getItem('basket')) || [];
//     const existingIndex = cart.findIndex(item => item.id === newProduct.id);
    
//     if (existingIndex !== -1) {
//         cart[existingIndex].quantity += 1;
//     } else {
//         newProduct.quantity = 1;
//         cart.push(newProduct);
//     }
    
//     localStorage.setItem('basket', JSON.stringify(cart));
//     renderCart();
// }

// function renderCart() {
//     const savedData = localStorage.getItem('basket');
//     console.log('Данные из localStorage:', savedData); // Для отладки
    
   
    
        
//         cart.forEach(item => {
//             let volume = item.volume ? `<p>Объем одного: ${item.volume} мл</p>` : '';
            
//             const template = `
//                 <div class="box">
//                     <div class="box-img">
//                         <img src="${item.photo}" alt="${item.name}">
//                         <h3 class="name-product">${item.name}</h3>
//                     </div>
//                     <div>
//                         ${volume}
//                         <p>Цена за один: ${item.price} руб</p>
//                         <p>Количество: ${item.quantity}</p>
//                         <p>Сумма: ${item.price * item.quantity} руб</p>
//                     </div>
//                 </div>
//             `;
            
//             cards.innerHTML += template;
//         });
//     } else {
//         nullBasket.classList.add('open');
//     }
// }

// // Сначала очищаем корзину для теста (раскомментируйте, если нужно)
// // localStorage.removeItem('basket');

// // Тестовые вызовы (после того, как все функции объявлены)
// // console.log('=== Начинаем тестовые добавления ===');
// // addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });
// // addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });
// // addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });
// // addToCart({ id: 1, name: 'Тест', price: 100, volume: 200, photo: 'test.jpg' });


