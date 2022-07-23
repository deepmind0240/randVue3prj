<template>
  <div>
    <h1>List of contents</h1>
    <base-input v-focus v-model="searchQueue" placeholder="Search..."></base-input>
    <div class="appBtns">
      <base-button> Create a post </base-button>
      <drop-menu v-model="selectedSort" :options="sortOptions"></drop-menu>
    </div>

    <base-dialog v-model:show="dialogIsVisible">
      <post-form></post-form>
    </base-dialog>
    <post-list
      :posts="sortedSearchedPosts"
      v-if="!isPostLoading"
    ></post-list>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import DropMenu from "@/components/UI/DropMenu.vue";
import usePosts from '@/hooks/usePosts';
import useSorted from '@/hooks/useSorted';
import useSearchedAndSorted from '@/hooks/useSearchedAndSorted'

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
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Description" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostLoading } = usePosts(10)
    const { selectedSort, sortedPosts } = useSorted(posts) 
    const { searchQueue, sortedSearchedPosts } = useSearchedAndSorted(sortedPosts)

    return {
    posts, 
    totalPages, 
    isPostLoading,
    selectedSort, 
    sortedPosts,
    searchQueue, 
    sortedSearchedPosts
    }
  }
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
