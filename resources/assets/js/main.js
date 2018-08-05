import Vue from 'vue';
import VueResource from 'vue-resource';
import App from '@root/App.vue';

//add vueresourrce in order to make API calls
Vue.use(VueResource);

import config from '@root/config.js';

Vue.http.options.root = config.API_URL_ROOT;

//central state with stash
import VueStash from 'vue-stash';
Vue.use(VueStash);

new Vue({
	el: '#app',
	data: {
		store: {
			data: {
				filter: 'full',
				status: 'unread',
				category: null,
				feed: null,
				search: null,
				refresh: 0
			},
			modal: false,
			refreshCategories: 0,
			categories: [],
			composedSum: []
		},
		baseUrl : null
	},
	render: h => h(App)
});

// Comment these three for local build.
Vue.config.devtools = true;
Vue.config.debug = true;
Vue.config.silent = true;