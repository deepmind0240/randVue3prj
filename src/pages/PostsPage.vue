<template>
  <div>
    <h1>List of contents</h1>
    <base-input v-focus v-model="searchQueue" placeholder="Search..."></base-input>
    <div class="appBtns">
      <base-button @click="showDialog"> Create a post </base-button>
      <drop-menu v-model="selectedSort" :options="sortOptions"></drop-menu>
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
import axios from "axios";
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
      posts: [],
      dialogIsVisible: false,
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
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert("Error!");
      } finally {
        this.isPostLoading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert("Error!");
      } 
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // }
  },

  // infinite list
  mounted() {
    this.fetchPosts();
  },

  // sort and search
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQueue.toLowerCase())
      );
    },
  },
  // watch: {
  //   page() {
  //     this.fetchPosts()
  //   }
  // },
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
