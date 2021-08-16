Vue.component('access_error', {
    data() {
        return {
            errorMessage: 'Не удалось выполнить запрос к серверу!'
        }
    },
    template: `
            <div class="access_error">
                <div class="access_error__text_position">
                    <p class="access_error__description">{{ errorMessage }}</p>
                </div>
            </div>
            `
});