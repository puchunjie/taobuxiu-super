<template>
  <div>
    <authToBeList></authToBeList>
    <authList></authList>
  </div>
</template>

<script>
import authToBeList from './authToBeList'
import authList from './authList'
  export default {
    components: {
      authToBeList,
      authList
    }
  }
</script>