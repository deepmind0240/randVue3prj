import axios from "axios";
 
 export const postModule = {
  state() {
    return {
      posts: [],
      isPostLoading: false,
      searchQueue: "",
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Description" },
      ],
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    sortedSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQueue.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isPostLoading = bool
    },
    setQueue(state, str) {
      state.searchQueue = str
    },
    setSort(state, str) {
      state.selectedSort = str
    },
    setPage(state, num) {
      state.page = num
    },
    setTotalPages(state, num) {
      state.totalPages = num
    },
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit('setTotalPages', Math.ceil(
          response.headers["x-total-count"] / state.limit
        ));
        commit('setPosts', response.data);
      } catch (error) {
        console.log(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit('setTotalPages', Math.ceil(
          response.headers["x-total-count"] / state.limit
        ));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.log(error);
      } 
    },
  },
  namespaced: true
 }