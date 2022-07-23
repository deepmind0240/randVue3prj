<template>
  <form @submit.prevent>
    <h4>Post smthng</h4>
    <base-input v-focus v-model="post.title" type="text" placeholder="Title" />
    <base-input v-model="post.body" type="text" placeholder="Description" />
    <base-button style="align-self: flex-end; margin-top: 15px" @click="createPost">Add a post</base-button>
  </form>
</template>

<script>
export default {
  emits: ['create'],
  data() {
    return {
      post: {
        id: null,
        title: '',
        body: ''
      }
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        id: null,
        title: '',
        body: ''
      }
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>
