<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :stroke-width="strokeWidth"
    :stroke="iconColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <component :is="`i-${iconName}`" />
  </svg>
</template>
<script>
import icons from '~/static/components/icons'
export default {
  props: {
    iconName: {
      type: String,
      default: 'arrow-right',
      validator: value => icons.includes(value)
    },
    size: {
      type: String,
      default: '100%'
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    strokeWidth: {
      type: String,
      default: '1.5'
    }
  }
}
</script>
<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
