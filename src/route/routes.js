import Login from '@/pages/Login'
import User from '@/pages/User'
import User_details from '@/pages/User_details'
import Order from '@/pages/order'
import Cost from '@/pages/cost'
import Admin_user from '@/pages/admin_user'
import Vehicle from '@/pages/vehicle'
import Vehicle_details from '@/pages/vehicle_details'
import Over from '@/pages/over'
import Order_details from '@/pages/order_details'


export default [{
        path: '/',
        // redirect: { name: 'Login' },
    },
    {
        path: '/admin',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin/user',
        name: 'User',
        component: User,
    },
    {
        path: '/admin/user/:id',
        name: 'User_details',
        component: User_details,
    },
    {
        path: '/admin/vehicle',
        name: 'Vehicle',
        component: Vehicle,
    },
    {
        path: '/admin/vehicle/:id',
        name: 'Vehicle_details',
        component: Vehicle_details,
    },
    {
        path: '/admin/over',
        name: 'Over',
        component: Over,
    },
    {
        path: '/admin/order',
        name: 'Order',
        component: Order,

    },
    {
        path: '/admin/order/:id',
        name: 'Order_details',
        component: Order_details,

    },
    {
        path: '/admin/cost',
        name: 'Cost',
        component: Cost,
    },
    {
        path: '/admin/admin_user',
        name: 'Admin_user',
        component: Admin_user,
    },
    // {
    //     path: '/admin/',
    //     name: '',
    //     component: 
    // },

]