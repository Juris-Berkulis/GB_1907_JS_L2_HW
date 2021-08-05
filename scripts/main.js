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
        checkConnectUrl: '/addToBasket.json'
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
        },
        addProduct(product){
            this.getJson(`${API + this.checkConnectUrl}`) //* 3 строки проверки связи с сервером.
                .then(data => { //* 3 строки проверки связи с сервером.
                    if(data.result === 1){ //* 3 строки проверки связи с сервером.
                        let find = this.basketProducts.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            const newProductBasket = Object.assign({quantity: 1}, product); //* Создание нового объекта на основании двух, указанных в параметрах.
                            this.basketProducts.push(newProductBasket)
                        }
                    }
                })
        },
        removeProduct(product){
            this.getJson(`${API + this.checkConnectUrl}`) //* 3 строки проверки связи с сервером.
                .then(data => { //* 3 строки проверки связи с сервером.
                    if (data.result === 1) { //* 3 строки проверки связи с сервером.
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.basketProducts.splice(this.basketProducts.indexOf(product), 1);
                        }
                    }
                    
                })
        },
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
