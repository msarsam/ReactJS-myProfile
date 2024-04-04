import { proxy, useSnapshot } from 'valtio';

const Store = proxy({ 
    currentPage: 'home',
    currentPath: '/',
    isLoggedIn : false,
    userID: null,
    token: window.token,
    custOptions:{},
    ip:{},    
    Feeds:[]
})

export default Store;
