import Vue from 'vue';
import Router from 'vue-router';
import UserSelect from '@/components/UserSelect';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'UserSelect',
            component: UserSelect,
        },
    ],
});
