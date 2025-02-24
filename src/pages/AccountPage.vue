<template>
  <h1 class="account">
    Account Id: <InputText class="user-id-input" type="text" v-model="userId" />
    <Button
      @click="updateUserId()"
      iconPos="right"
      icon="pi pi-sync"
      label="Update"
      size="small"
    ></Button>
  </h1>
</template>

<style scoped>
.user-id-input {
  margin-right: 20px;
}
.account {
  color: var(--text-color-contrast);
  padding: 20px;
}
</style>

<script>
import { getUserId, setUserId } from '../services/user.service'
export default {
  data() {
    return {
      userId: getUserId()
    }
  },
  methods: {
    updateUserId() {
      setUserId(this.userId)
    }
  }
}
</script>
