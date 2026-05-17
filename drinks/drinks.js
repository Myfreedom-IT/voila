const cards = document.querySelector('.boxs')


const renderInformaton = (info) => {
    console.log(info)


    for (let i = 0; i < info.length; i++) {
          let sButton = info[i].s ? `<button class="button-size" data-id="${info[i].id}" data-size-key="s" data-volume="${info[i].s.size}" data-price="${info[i].s.price}" data-photo="${info[i].img}">Маленький</button>`: ''
        let mButton = info[i].m ? `<button class="button-size" data-id="${info[i].id}" data-size-key="m" data-volume="${info[i].m.size}" data-price="${info[i].m.price}" data-photo="${info[i].img}">Средний</button>`: ''
        let lButton = info[i].l ? `<button class="button-size" data-id="${info[i].id}" data-size-key="l" data-volume="${info[i].l.size}" data-price="${info[i].l.price}" data-photo="${info[i].img}">Большой</button>`: ''
        let sSize = info[i].s ? `<p>S: объём ${info[i].s.size}мл, цена ${info[i].s.price}руб </p>` : ''
        let mSize = info[i].m ? `<p>M: объём ${info[i].m.size}мл, цена ${info[i].m.price}руб</p>` : ''
        let lSize = info[i].l ? `<p>L: объём ${info[i].l.size}мл, цена ${info[i].l.price}руб</p>` : ''
        let description = info[i].description ? `  <div class='info-box'><h4>Cостав:</h4> <div> <p class="info">${info[i].description}</p> </div> </div>` : ''

        const template = `
        <div class="box">
             <div class="box-img">
                 <img src="${info[i].img}" alt="">
                 <h3 class="name-product">${info[i].name}</h3> 
            </div>        
            ${description}
            <div class="buttons-size">
                 ${sButton}
                 ${mButton}
                 ${lButton}
            </div>
            <div class="info-volume-price">
            ${sSize}
            ${mSize}
            ${lSize}
             </div>     
              <button class="button-buy">Добавить в корзину</button> 
            </div>
            
     
    `
        cards.innerHTML += template

    }
    initBasket()
}
fetch("./drinks.json")
    .then((response) => response.json())
    .then((info) => {
        renderInformaton(info)
    })



function initBasket() {
    document.addEventListener('click', (event) => {
        const clickedElement = event.target

        // выбор размера
        if (clickedElement.classList.contains('button-size')) {
            const currentCard = clickedElement.closest('.box')
            const sizeButtons = currentCard.querySelectorAll('.button-size')

            sizeButtons.forEach(button => {
                button.classList.remove('active')
            })

            clickedElement.classList.add('active')
            currentCard.dataset.id = clickedElement.dataset.id
            currentCard.dataset.sizeKey = clickedElement.dataset.sizeKey
            currentCard.dataset.volume = clickedElement.dataset.volume
            currentCard.dataset.price = clickedElement.dataset.price
            currentCard.dataset.photo = clickedElement.dataset.photo
        }

        // добавление в корзину
        if (clickedElement.classList.contains('button-buy')) {
            const currentCard = clickedElement.closest('.box')

            if (!currentCard.dataset.sizeKey) {
                const noInBusket = document.querySelector('.no-in-busket')
                noInBusket.classList.add("open")

                setTimeout(() => {
                    noInBusket.classList.remove("open")
                }, 1700)

                return
            }

            const product = {
                id: Number(currentCard.dataset.id),
                name: currentCard.querySelector('.name-product').innerText,
                price: Number(currentCard.dataset.price),
                 photo: currentCard.dataset.photo,
                volume: Number(currentCard.dataset.volume),
                size: currentCard.dataset.sizeKey
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