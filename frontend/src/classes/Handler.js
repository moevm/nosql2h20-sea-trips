import Vue from 'vue';

export default class Handler {
    static #duration = 1500;

    static Success(response, text) {
        //console.log(response);
        Vue.notify({
            type: 'success',
            text: text,
            duration: this.#duration
        });
    }

    static Error(error, text = '') {
        console.log(error);
        if (text !== '') {
            Vue.notify({
                type: 'error',
                text: text,
                duration: this.#duration
            });
        }
    }

    static Warn(text) {
        Vue.notify({
            type: 'warn',
            text: text,
            duration: this.#duration
        });
    }
}
