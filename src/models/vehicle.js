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
        return request.get(API.vehicle, params)
    },
    show(id) {
        return request.get(API.vehicleItem(id));
    },
    update(id, params) {
        return request.put(API.vehicleItem(id), params)
    },
    add(params) {
        return request.post(API.vehicle, params)
    },
    delete(id) {
        return request.delete(API.vehicleItem(id))
    }
}