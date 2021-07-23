const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product_item">
                <img class="product_img" src="img/${item.title}.jpg" alt="${item.title}" width="200">
                <h3 class="product_title">${item.title}</h3>
                <p class="product_description">${item.price}</p>
                <button class="product_buy_btn">Купить</button>
            </div>`
};

//* Для варианта №2:
//* let divProductsList = document.querySelector('.products_list');

const renderPage = (list = products) => {
    document.querySelector('.products_list').innerHTML = list.map(item => renderProduct(item)).join('');
    //* Вариант №2:
    //* const productsList = list.map(item => renderProduct(item));
    //* for (let i = 1; i <= productsList.length; i++) {
    //*     divProductsList.innerHTML += productsList[i - 1];
    //* }
};

renderPage();
