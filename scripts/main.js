const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
    constructor(container='.products_list'){
        this.container = container;
        this.goods = [];
        this._fetchProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render(); // вывод товаров на страницу.
                this.getSum();
            });
    }

    _fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render()); // Аналог для block.innerHTML += item.render();, но работает быстрее.
        }
    }

    getSum() {
        let sum = 0;
        this.goods.forEach(item => {
            sum += item.price;
        })
        document.querySelector('.products').insertAdjacentHTML("beforeend", `Сумма товаров: ${sum} руб.`);
    }
}

class ProductItem{
    constructor(product) {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.imgSrc = `img/${product.product_name}.jpg`;
        this.imgAlt = `${product.product_name}`;
        this.imgWidth = "200";
    }
    render() {
        return `<div class="product_item">
                    <img class="product_img" src="${this.imgSrc}" alt="${this.imgAlt}" width="${this.imgWidth}">
                    <h3 class="product_title">${this.title}</h3>
                    <p class="product_description">${this.price}</p>
                    <button class="product_buy_btn">Купить</button>
                </div>`
    }
}

class Basket {
    addProduct() {
        //! TODO: заглушка.
    }

    removeProduct() {
        //! TODO: заглушка.
    }

    changeProduct() {
        //! TODO: заглушка.
    }

    render() {
        //! TODO: заглушка.
    }
}

class itemInBasket {
    render() {
        //! TODO: заглушка.
    }
}

let list = new ProductList();
