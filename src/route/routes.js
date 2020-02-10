import Login from '@/pages/Login'
import User from '@/pages/User'
import Order from '@/pages/order'
import Rent from '@/pages/rent'
import Cost from '@/pages/cost'
import Over from '@/pages/over'
import Admin_user from '@/pages/admin_user'
import Vehicle from '@/pages/vehicle'


export default [{
        path: '/',
        redirect: { name: 'Login' }
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
        path: '/admin/vehicle',
        name: 'Vehicle',
        component: Vehicle
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
        path: '/admin/rent',
        name: 'Rent',
        component: Rent,
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