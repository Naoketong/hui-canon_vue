const PREFIX = '/api';
export default {
    qiniuToken: `${PREFIX}/qiniu-uploadtoken`,
    qiniu_API: "https://upload-z2.qiniup.com",


    user: PREFIX + '/user',
    userItem: (id) => `${PREFIX}/user/${id}`,
    admin_user: PREFIX + '/admin_user',
    admin_userItem: (id) => `${PREFIX}/admin_user/${id}`,
    vehicle: PREFIX + '/vehicle',
    vehicleItem: (id) => `${PREFIX}/vehicle/${id}`,




}