
export default [
  { path: '/', component: () => import('pages/Home') },
  { path: '/Characters', component: () => import('pages/Characters') },
  { path: '/Login', component: () => import('pages/Login') },
  { path: '/Register', component: () => import('pages/Register') },
  { path: '/Account', component: () => import('pages/Account') },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
