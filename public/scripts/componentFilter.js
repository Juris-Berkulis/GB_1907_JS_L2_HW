Vue.component('search', {
    template: `
            <form class="search" action="#" @submit.prevent="$parent.filter">
                <input class="search__input" type="text" placeholder="Фильтр" v-model="$parent.userSearch">
                <button class="search__btn" type="submit">Найти</button>
            </form>
            `
})
