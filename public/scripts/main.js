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
        filterProducts: [],
        checkConnectUrl: '/addToBasket.json',
        accessError: false
    },
    methods: {
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filterProducts = this.products.filter(product => regexp.test(product.product_name));
        },
        // addProduct(product){
        //     this.getJson(`${API + this.checkConnectUrl}`) //* 3 строки проверки связи с сервером.
        //         .then(data => { //* 3 строки проверки связи с сервером.
        //             if(data.result === 1){ //* 3 строки проверки связи с сервером.
        //                 let find = this.basketProducts.find(el => el.id_product === product.id_product);
        //                 if(find){
        //                     find.quantity++;
        //                 } else {
        //                     const newProductBasket = Object.assign({quantity: 1}, product); //* Создание нового объекта на основании двух, указанных в параметрах.
        //                     this.basketProducts.push(newProductBasket)
        //                 }
        //             }
        //         })
        // },
        addProduct(product){
            let find = this.basketProducts.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const newProductBasket = Object.assign({quantity: 1}, product); //* Создание нового объекта на основании двух, указанных в параметрах.
                this.postJson(`/api/cart`, newProductBasket)
                    .then(data => {
                        if(data.result === 1){
                            this.basketProducts.push(newProductBasket)
                        }
                    })
            }
        }
        },
        // removeProduct(product){
        //     this.getJson(`${API + this.checkConnectUrl}`) //* 3 строки проверки связи с сервером.
        //         .then(data => { //* 3 строки проверки связи с сервером.
        //             if (data.result === 1) { //* 3 строки проверки связи с сервером.
        //                 if(product.quantity > 1){
        //                     product.quantity--;
        //                 } else {
        //                     this.basketProducts.splice(this.basketProducts.indexOf(product), 1);
        //                 }
        //             }
                    
        //         })
        // },
        removeProduct(product){
            if(product.quantity > 1){
                product.quantity--;
            } else {
                this.basketProducts.splice(this.basketProducts.indexOf(product), 1);
            }
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.accessError = true;
                })
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.accessError = true;
                })
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.accessError = true;
                })
        },
    mounted(){
        // this.getJson(`${API + this.catalogUrl}`)
        //     .then(data => {
        //         for(let el of data){
        //             this.$data.products.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
        //             this.$data.filterProducts.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
        //         }
        //     });
        // this.getJson(`${API + this.basketUrl}`)
        //     .then(data => {
        //         for(let el of data.contents){
        //             this.basketProducts.push(el);
        //         }
        //     });
        
        // this.getJson('/api/products')
        //     .then(data => {
        //         for(let el of data){
        //             this.$data.products.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
        //             this.$data.filterProducts.push(el); //* $data указывает явно на обращение к массиву из data, но, если нет в данном блоке переопределения этого массива, то можно обойтись и без $data.
        //         }
        //     });
        // this.getJson(`/api/cart`)
        //     .then(data => {
        //         for(let el of data.contents){
        //             this.basketProducts.push(el);
        //         }
        //     });
            
            
        this.fetchProducts('/api/products')
            .then(data => {
                this.products = [...data];
                this.filterProducts = this.products;
            });
        this.fetchProducts('/api/cart')
            .then(data => {
                this.basketProducts.push({amount: data.amount, countGoods: data.countGoods});
                this.basketProducts.push(data.contents);
            });
    },
})
