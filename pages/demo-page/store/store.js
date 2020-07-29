import qs from "qs"
import element from 'element-ui';
const $message = element.Message;
const $query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
import { } from '../service';

const state = {
    isLoading: false
};

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    }
};

const actions = {
    setLoading({ commit }, payload) {
        commit('setLoading', payload);
    },
    async init({ commit, dispatch }, payload) { }
};

export default {
    state,
    mutations,
    actions
}