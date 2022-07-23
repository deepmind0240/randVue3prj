import { ref, computed } from 'vue';

export default function useSearchedAndSorted(sortedPosts) {
  const searchQueue = ref('')
  const sortedSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) => post.title.toLowerCase().includes(searchQueue.value.toLowerCase())
      );
  })

  return {
    searchQueue, sortedSearchedPosts
  }
} 