Vue.component('basket_list', {
    props: ['basket_items', 'img_basket', 'visibility'],
    template: `
            <div class="basket_list" v-show="visibility">
            <basket_item v-for="baskProduct of basket_items" :key="baskProduct.id_product" :img_basket="img_basket" :basketItems="baskProduct"></basket_item>
            <slot></slot>
            </div>
            `
});

Vue.component('basket_item', {
    props: ['img_basket', 'basketItems'],
    template: `
            <div class="basket_item">
                <div class="basket_left">
                    <img class="basket_img" :src="img_basket" :alt="basketItems.product_name" width="200">
                    <h3 class="basket_title">{{ basketItems.product_name }}</h3>
                </div>
                <div class="basket_right">
                    <p class="basket_description">{{ basketItems.price }}</p>
                    <div class="basket_panel">
                        <button class="basket_btn basket_btn-minus" @click="$root.removeProduct(basketItems)">-</button>
                        <p class="basket_count">{{ basketItems.quantity }}</p>
                        <button class="basket_btn basket_btn-plus" @click="$root.addProduct(basketItems)">+</button>
                    </div>
                    <p class="basket_all_price_product">Всего: {{ basketItems.price * basketItems.quantity }}</p>
                </div>
            </div>
            `
})
