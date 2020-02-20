import request from './request.js';
import API from './api.js';

export default {
    login(params) {
        return request.post(API.login, params)
    },
    logout() {
        localStorage.clear()
    },
    list(params) {
        return request.get(API.cost, params)
    },
    show(id) {
        return request.get(API.costItem(id));
    },
    update(id, params) {
        return request.put(API.costItem(id), params)
    },
    add(params) {
        return request.post(API.cost, params)
    },
    delete(id) {
        return request.delete(API.costItem(id))
    }
}