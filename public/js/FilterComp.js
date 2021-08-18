Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
            <form class="search" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input class="search__input" type="text" v-model="userSearch">
                <button class="search__btn" type="submit">Найти</button>
            </form>
            `
})
