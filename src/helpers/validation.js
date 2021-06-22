// Pour les règles de validation
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, min, max, email, alpha } from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';

export default function registerValidation(Vue) {
    // Pour les règles avec validate
    Object.keys(rules).forEach(rule => {
        extend(rule, rules[rule]);
    });

    // Réécriture des règles
    extend('required', {
        ...required,
        message: 'Le champ {_field_} est requis'
    });
    extend('min', {
        ...min,
        message: 'Pas assez de caractères pour {_field_}'
    });
    extend('max', {
        ...max,
        message: 'Trop de caractères pour {_field_}'
    });
    extend('email', {
        ...email,
        message: 'Ne correspond pas à une adresse email valide'
    });
    extend('alpha', {
        ...alpha,
        message: 'uniquement des lettres'
    });
    ///
    Vue.component('ValidationObserver', ValidationObserver);
    Vue.component('ValidationProvider', ValidationProvider);
}