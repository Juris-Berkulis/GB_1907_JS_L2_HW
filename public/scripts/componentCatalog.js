Vue.component('products_list', {
    props: ['products', 'img_catalog'],
    template: `
            <div class="products_list">
                <product_item v-for="product of products" :key="product.id_product" :img_product="img_catalog" :productItems="product"></product_item>
            </div>
            `
});

Vue.component('product_item', {
    props: ['img_product', 'productItems'],
    template: `
            <div class="product_item">
                <img class="product_img" :src="img_product" :alt="productItems.product_name" width="200">
                <h3 class="product_title">{{ productItems.product_name }}</h3>
                <p class="product_description">{{ productItems.price }}</p>
                <button class="product_buy_btn" @click="$parent.$parent.addProduct(productItems)">Купить</button>
            </div>
            `
})

//! $parent.$parent.addProduct похож на $root.addProduct, но в первом случае обращение к методу "addProduct" из файла "main.js" идёт через вложенность (к первому родителю, затем ко второму), а во втором случае - напрямую. Различий в выдаваемом результате никаких нет, однако первый вариант работает малость быстрее.
