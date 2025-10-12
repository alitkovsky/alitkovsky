import { defineComponent } from ".";

export default defineComponent(() => ({
    loaded: false,
    destroyed: false,
    async load() {
        const elements = document.querySelectorAll<HTMLElement>('.load-more:not(.loaded) ~ *')
        const nextElements = [];
        let found = false;
        let i = 0;
        while (!found && i < elements.length) {
            if (elements[i].classList.contains('load-more')) {
                found = true;
            } else {
                nextElements.push(elements[i]);
                elements[i].style.opacity = '0';
                i++;
            }
        }

        this.loaded = true;
        this.$dispatch('load-more');
        await this.$nextTick();
        this.$dispatch('load-more');
        setTimeout(() => {
            this.$dispatch('load-more');
        }, 400);
        setTimeout(() => {
            this.destroyed = true
        }, 600)
    }
}))