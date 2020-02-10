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
        return request.get(API.admin_user, params)
    },
    show(id) {
        return request.get(API.admin_userItem(id));
    },
    update(id, params) {
        return request.put(API.admin_userItem(id), params)
    },
    add(params) {
        return request.post(API.admin_user, params)
    },
    delete(id) {
        return request.delete(API.admin_userItem(id))
    }
}