import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import PostsPage from '@/pages/PostsPage.vue';
import About from '@/pages/About.vue';
import SinglePost from '@/pages/SinglePost.vue';
import PostsPageVuexver from '@/pages/PostsPageVuexver.vue';
import PostsPageCompApi from '@/pages/PostsPageCompApi.vue';

const routes = [
  {
    path: '/',
    component: MainPage
  }, {
    path: '/posts',
    component: PostsPage
  }, {
    path: '/about',
    component: About
  }, {
    path: '/posts/:id',
    component: SinglePost
  }, {
    path: '/store',
    component: PostsPageVuexver
  }, {
    path: '/composition',
    component: PostsPageCompApi
  }

];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;