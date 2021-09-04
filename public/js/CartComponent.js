// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img1/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        // remove(item){
        //     this.$parent.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //             }
        //         })
        // },
        // minusItem(item){
        //     this.$parent.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 if (item.quantity > 1) {
        //                     item.quantity--;
        //                 } else {
        //                     this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //                 }
        //             }
        //         })
        // }
        minusProduct(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.remove(product);
            }
        },
        remove(product) {
            this.$parent.delJson(`/api/cart/${ product.id_product }`, product)
                .then(data => {
                    if (data.result) {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    } else {
                        console.log('error!');
                    }
                })
        },
    },
    template: `
            <div>
                <button class="basket_close" type="button" @click="showCart=false" v-show="showCart">
                    <span class="basket_x">+</span>
                </button>
                <button class="btn_cart" type="button" @click="showCart=true">Корзина</button>
                <div class="basket_list" v-show="showCart">
                    <cart-item v-for="item of cartItems" 
                    :key="item.id_product" 
                    :img="item.imgPath" 
                    :cart-item="item" 
                    @remove="remove" 
                    @minus="minusProduct" 
                    @add="addProduct">
                    </cart-item>
                    <div class="space_in_basket" v-if="!cartItems.length">
                        <p class="space_in_basket__paragraph">Корзина пуста</p>
                    </div>
                </div>
            </div>
            `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
            <div class="basket_item">
                <div class="basket_left">
                    <img class="basket_img" :src="img" alt="Some img" width='150'>
                    <h3 class="basket_title">{{ cartItem.product_name }}</h3>
                </div>
                <div class="basket_right">
                    <p class="basket_description">{{ cartItem.price }} $ / 1 шт.</p>
                    <div class="basket_panel">        
                        <button class="basket_btn basket_btn-minus" @click="$emit('minus', cartItem)">-</button>
                        <p class="basket_count"> {{ cartItem.quantity }}</p>
                        <button class="basket_btn basket_btn-plus" @click="$emit('add', cartItem)">+</button>
                    </div>
                    <p class="basket_all_price_product">{{cartItem.quantity*cartItem.price}}</p>
                    <button class="basket_btn_del" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>
            `
})
