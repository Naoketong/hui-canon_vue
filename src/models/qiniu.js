import request from './request.js';
import API from "./api.js";

const qiniu = {
    qiniu: function() {
        return request.get(API.qiniuToken);
    },
    upload: function(file) {
        return new Promise(resolve => {
            this.qiniu().then(res => {
                const key = "hui-canon/" + Date.now() + "_" + file.name;
                let token = res.token;
                let domain = res.domain;
                let formData = new FormData();
                formData.append("file", file);
                formData.append("key", key);
                formData.append("token", token);
                request
                    .post(API.qiniu_API, formData, {
                        headers: { "Content-Type": "multiple/form-data" }
                    })
                    .then(res => {
                        let imageUrl = domain + res.key;
                        resolve(imageUrl);
                    });
            });
        });
    }
};

export default qiniu;