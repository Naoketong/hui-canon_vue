const PREFIX = '/api';
export default {
    user: PREFIX + '/user',
    userItem: (id) => `${PREFIX}/user/${id}`,
    admin_user: PREFIX + '/admin_user',
    admin_userItem: (id) => `${PREFIX}/admin_user/${id}`,
    vehicle: PREFIX + '/vehicle',
    vehicleItem: (id) => `${PREFIX}/vehicle/${id}`,




}