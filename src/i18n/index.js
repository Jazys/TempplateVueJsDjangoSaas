// Imports
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Messages
import fr from '@/i18n/messages/fr.json'
import en from '@/i18n/messages/en.json'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages: { fr, en },
})

