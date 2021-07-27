class ProductList{
    constructor(container='.products_list'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render(); // вывод товаров на страницу.
        this.getSum();
    }
    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
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
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.imgSrc = `img/${product.title}.jpg`;
        this.imgAlt = `${product.title}`;
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
