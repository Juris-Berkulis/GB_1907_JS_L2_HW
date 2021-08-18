Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img1/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
            <div class="products_list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img = "item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
            </div>
            `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product_item">
                <img class="product_img" :src="img" alt="Some img" width='250'>
                <h3 class="product_title">{{product.product_name}}</h3>
                <p class="product_description">{{product.price}}</p>
                <button class="product_buy_btn" @click="$emit('add-product', product)">Купить</button>
            </div>
            `
})
