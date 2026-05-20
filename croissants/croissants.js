const cards = document.querySelector('.boxs')


// cards.addEventListener('click', (event) => {
//     const clickedElement = event.target;
//    card.forEach(item => {
//     if(item === clickedElement){
//         item.classList.add('active')
//     }else{
//         item.classList.remove('active')
//     }
//    })
// })




const renderInformaton = (info) => {
    console.log(info)

    
    for (let i = 0; i < info.length; i++) {

        const template = `
        <div class="box">
             <div class="box-img">
                 <img src="${info[i].img}" alt="">
            </div>
                <h3 class="name-product">${info[i].name}</h3>
            <p class= "price">Цена - ${info[i].price}руб </p>
              <button class="button-buy" data-id="${info[i].id}" data-price="${info[i].price}"  data-photo="${info[i].img}">Добавить в корзину</button> 
            </div>                                           
    `
        cards.innerHTML += template
        
    }
    initBasket()
}
fetch("./croissants.json")
    .then((response) => response.json())
    .then((info) => {
        renderInformaton(info)
    })

const blockMenu = document.getElementById('menu')
const main = document.querySelector('main')

document.addEventListener('click', (event) => {
    const clickedElement = event.target
     if(clickedElement.matches('.btn-menu-open')){
        // main.style.marginRight = '250px';
        blockMenu.classList.add('open')
    }
    if(clickedElement.matches(".btn-close-block")){
        // main.style.marginRight = '0';
        blockMenu.classList.remove('open')
    }  
})

function initBasket() {
    document.addEventListener('click', (event) => {
        const clickedElement = event.target


        // добавление в корзину
        if (clickedElement.classList.contains('button-buy')) {
            const currentCard = clickedElement.closest('.box')
             currentCard.dataset.id = clickedElement.dataset.id
             currentCard.dataset.price = clickedElement.dataset.price
             currentCard.dataset.photo = clickedElement.dataset.photo

            const product = {
                id: Number(currentCard.dataset.id),
                name: currentCard.querySelector('.name-product').innerText,
                price: Number(currentCard.dataset.price),
                photo: currentCard.dataset.photo
            }

            let basket = JSON.parse(localStorage.getItem('basket')) || []

            basket.push(product)
            localStorage.clear()
            localStorage.setItem('basket', JSON.stringify(basket))

            const inBusket = document.querySelector('.in-busket')
            inBusket.classList.add("open")

            setTimeout(() => {
                inBusket.classList.remove("open")
            }, 1700)

            console.log(basket)
        }
    })
}
