import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#0E1726",
                secondary: "#131B2E",
                accent: "#202B43"
            }
        }
    }
});
