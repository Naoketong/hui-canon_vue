const PREFIX = '/api';
export default {
    qiniuToken: `${PREFIX}/qiniu-uploadtoken`,
    qiniu_API: "https://upload-z2.qiniup.com",
    login: PREFIX + '/login',
    user: PREFIX + '/user',
    userItem: (id) => `${PREFIX}/user/${id}`,
    admin_user: PREFIX + '/admin_user',
    admin_userItem: (id) => `${PREFIX}/admin_user/${id}`,
    vehicle: PREFIX + '/vehicle',
    vehicleItem: (id) => `${PREFIX}/vehicle/${id}`,
    vehicleLevel: `${PREFIX}/vehicle/level`,
    cost: PREFIX + '/cost',
    orderFind: (id) => `${PREFIX}/order/phone/${id}`,
    costItem: (id) => `${PREFIX}/cost/${id}`,
    order: PREFIX + '/order',
    orderState: PREFIX + '/order/state',
    orderItem: (id) => `${PREFIX}/order/${id}`,
    orderModify: (id) => `${PREFIX}/order/modify/${id}`,




}