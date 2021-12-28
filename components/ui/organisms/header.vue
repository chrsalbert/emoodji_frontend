<template>
  <header class="b-header">
    <div class="b-header__nav">
      <nuxt-link to="/" class="b-header__logo"
        ><img src="~/assets/images/logo.svg?raw"
      /></nuxt-link>
      <div class="b-header__menu">
        <template v-if="user">
          <m-dropdown
            :button="{
              text: user.forename,
              props: {
                chameleon: true,
                class: 'u-truncate'
              }
            }"
          >
            <m-dropdown-menu>
              <m-dropdown-menu-item to="/user/profile" divider>
                Profile
              </m-dropdown-menu-item>
              <m-dropdown-menu-item
                variant="secondary"
                @click.native="logout()"
              >
                Log out
              </m-dropdown-menu-item>
            </m-dropdown-menu>
          </m-dropdown>
        </template>
        <template v-else>
          <a-button to="/signup" ghost>Sign up</a-button>
          <a-button to="/signin">Log in</a-button>
        </template>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Default',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
<style>
.b-header {
  padding: var(--space-8) var(--body-pad);
}
.b-header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.b-header__logo {
  flex-shrink: 0;
  line-height: 0;
}
.b-header__menu {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-width: 0;
}
.u-truncate {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
