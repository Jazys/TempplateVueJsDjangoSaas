import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "Home" */ '@/views/Home'),
      meta: {       
        allowAnonymous: true,
        user_group: ['', 'admin'],
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "Login" */ '@/views/Login'),
      meta: {        
        allowAnonymous: true,
        user_group: ['', 'admin'],
      }
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () =>
        import(/* webpackChunkName: "Passwordreset" */ '@/views/PasswordReset'),
      meta: {        
        allowAnonymous: true,
        user_group: ['', 'admin'],
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "Register" */ '@/views/Register'),
      meta: {       
        allowAnonymous: true,
        user_group: ['', 'admin'],
      }
    },
   
  ],
})


router.beforeEach((to, from, next) => {

 
  //check if a user state
  var loggedIn = localStorage.getItem('user');

  if (loggedIn != null)
    loggedIn = JSON.parse(localStorage.getItem('user'));

  var userRole = '';

  //user have on role only
  if (loggedIn != null) {
    if ("roles" in loggedIn && JSON.parse(loggedIn).user.roles[0] != null)
      userRole = JSON.parse(loggedIn).user.roles[0];
  }

  
  if (to.name == 'sign' && loggedIn != null) {
    next({ path: '/' })
  }
  else if (!to.meta.allowAnonymous && loggedIn == null) {
    next({
      path: '/sign',
      query: { redirect: to.fullPath }
    })
  }
  else {
    if (to.meta.user_group.includes(userRole))
      next()
    else
      window.alert("Not Authorized");
  }
})

export default router