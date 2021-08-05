const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const show_basket = new Vue({
    el: ".show_basket",
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        basketUrl: '/getBasket.json',
        showBasket: false,
        basketProducts: [],
        imgBasket: 'https://via.placeholder.com/200x150',
        userSearch: '',
        filrerProducts: [],
    },
    methods: {
        //* Вариант 2 для открытия и закрытия корзины вместо showBasket (для работы методов необходимо для .btn_cart и .basket_close для атрибутов @click поставить значения basketOpen() и basketClose(), соответственно. А в стилях для классов .basket_list и .basket_close добавить display: none).
        //* basketOpen() {
        //*     const btnBasketClose = document.querySelector('.basket_close');
        //*     btnBasketClose.style.display = 'block';
        //*     const divBasketList = document.querySelector('.basket_list');
        //*     divBasketList.style.display = 'block';
        //* },
        //* basketClose() {
        //*     const btnBasketClose = document.querySelector('.basket_close');
        //*     btnBasketClose.style.display = 'none';
        //*     const divBasketList = document.querySelector('.basket_list');
        //*     divBasketList.style.display = 'none';
        //* },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filrerProducts = this.products.filter(product => regexp.test(product.product_name));
        }
        // addProduct(product){
        //     console.log(product.id_product);
        // }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.$data.products.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
                    this.$data.filrerProducts.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
                }
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.basketProducts.push(el);
                }
        });
    }
})


// const btnBasket = document.querySelector('.btn_cart');
// btnBasket.onclick = () => {
//     const btnBasketClose = document.querySelector('.basket_close');
//     btnBasketClose.style.display = 'block';
//     const divBasketList = document.querySelector('.basket_list');
//     divBasketList.style.display = 'block';
// };

// const btnBasketClose = document.querySelector('.basket_close');
// btnBasketClose.onclick = () => {
//     const btnBasketClose = document.querySelector('.basket_close');
//     btnBasketClose.style.display = 'none';
//     const divBasketList = document.querySelector('.basket_list');
//     divBasketList.style.display = 'none';
// };

// class ProductList{
//     constructor(container='.products_list'){
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data];
//                 this.render(); // вывод товаров на страницу.
//                 // this.getSum();
//             });
//     }

//     _fetchProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
    
//     render() {
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", item.render()); // Аналог для block.innerHTML += item.render();, но работает быстрее.
//         }
//     }

//     // getSum() {
//     //     let sum = 0;
//     //     this.goods.forEach(item => {
//     //         sum += item.price;
//     //     })
//     //     document.querySelector('.products').insertAdjacentHTML("beforeend", `Сумма товаров: ${sum} руб.`);
//     // }
// }

// class ProductItem{
//     constructor(product) {
//         this.title = product.product_name;
//         this.id = product.id_product;
//         this.price = product.price;
//         this.imgSrc = `img/${product.product_name}.jpg`;
//         this.imgAlt = `${product.product_name}`;
//         this.imgWidth = "200";
//     }
//     render() {
//         return `<div class="product_item">
//                     <img class="product_img" src="${this.imgSrc}" alt="${this.imgAlt}" width="${this.imgWidth}">
//                     <h3 class="product_title">${this.title}</h3>
//                     <p class="product_description">${this.price}</p>
//                     <button class="product_buy_btn">Купить</button>
//                 </div>`
//     }
// }

// class Basket {
//     constructor(container='.basket_list'){
//         this.container = container;
//         this.basket_products = [];
//         this._fetchBasketProducts()
//             .then(data => { //data - объект js
//                 this.basket_products = [...data.contents];
//                 this.render(); // вывод товаров корзины на страницу.
//             });
//     }

//     _fetchBasketProducts() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
    
//     render() {
//         const block = document.querySelector(this.container);
//         for(let product of this.basket_products){
//             const item = new itemInBasket(product);
//             block.insertAdjacentHTML("beforeend", item.render()); // Аналог для block.innerHTML += item.render();, но работает быстрее.
//         }
//     }

//     // addProduct() {
//     //     //! TODO: заглушка.
//     // }

//     // removeProduct() {
//     //     //! TODO: заглушка.
//     // }

//     // changeProduct() {
//     //     //! TODO: заглушка.
//     // }

//     // render() {
//     //     //! TODO: заглушка.
//     // }
// }

// class itemInBasket {
//     constructor(product) {
//         this.title = product.product_name;
//         this.id = product.id_product;
//         this.price = product.price;
//         this.imgSrc = `img/${product.product_name}.jpg`;
//         this.imgAlt = `${product.product_name}`;
//         this.imgWidth = "200";
//         this.count = product.quantity;
//     }
//     render() {
//         return `<div class="basket_item">
//                     <div class="basket_left">
//                         <img class="basket_img" src="${this.imgSrc}" alt="${this.imgAlt}" width="${this.imgWidth}">
//                         <h3 class="basket_title">${this.title}</h3>
//                     </div>
//                     <div class="basket_right">
//                         <p class="basket_description">${this.price}</p>
//                         <div class="basket_panel">
//                             <button class="basket_btn basket_btn-minus">-</button>
//                             <p class="basket_count">${this.count}</p>
//                             <button class="basket_btn basket_btn-plus">+</button>
//                         </div>
//                     </div>
//                 </div>`
//     }

//     // render() {
//     //     //! TODO: заглушка.
//     // }
// }

// let list = new ProductList();
// let listBasket = new Basket();
