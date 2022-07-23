<template>
  <div>
    <h1>List of contents</h1>
    <base-input v-focus :model-value="searchQueue" @update:model-value="setQueue" placeholder="Search..."></base-input>
    <div class="appBtns">
      <base-button @click="showDialog"> Create a post </base-button>
      <drop-menu :model-value="selectedSort" @update:model-value="setSort" :options="sortOptions"></drop-menu>
    </div>

    <base-dialog v-model:show="dialogIsVisible">
      <post-form @create="createPost"></post-form>
    </base-dialog>
    <post-list
      :posts="sortedSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    ></post-list>
    <div v-else>Loading...</div>
    <div v-intersection="fetchMorePosts" class="observer"></div>
    <!-- <div class="pageContainer">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ currentPage: page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import DropMenu from "@/components/UI/DropMenu.vue";
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    PostForm,
    PostList,
    BaseButton,
    BaseInput,
    DropMenu
  },
  data() {
    return {
      dialogIsVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setQueue: 'post/setQueue',
      setSort: 'post/setSort'
    }),
    ...mapActions({
      fetchMorePosts: 'post/fetchMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogIsVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      searchQueue: state => state.post.searchQueue,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedSearchedPosts: 'post/sortedSearchedPosts'
    })
  },
};
</script>

<style scoped>

.appBtns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.pageContainer {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  margin-right: 15px;
}

.currentPage {
  background-color: rgb(36, 105, 36);
  border: 1px solid teal;
}

.observer {
  height: 30px;
}
</style>
