<template>
  <div class="navbar">
    <div @click="$router.push('/')">rand vue 3 posts</div>
    <div class="navBtns">
      <base-button @click="$router.push('/posts')">Posts</base-button>
      <base-button style="margin-left: 20px" @click="$router.push('/store')">Posts w/ vuex</base-button>
      <base-button style="margin-left: 20px" @click="$router.push('/composition')">Posts w/ Composition</base-button>
      <base-button style="margin-left: 20px" @click="$router.push('/about')">About</base-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: #F9EBC8;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navBtns {
  margin-left: auto;
}
</style>