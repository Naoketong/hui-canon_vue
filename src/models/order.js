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
        return request.get(API.order, params)
    },
    show(id) {
        return request.get(API.orderItem(id));
    },
    orderFind(id) {
        return request.get(API.orderFind(id))
    },

    update(id, params) {
        return request.put(API.orderItem(id), params)
    },
    modify(id, params) {
        return request.put(API.orderModify(id), params)
    },
    add(params) {
        return request.post(API.order, params)
    },
    delete(id) {
        return request.delete(API.orderItem(id))
    }
}