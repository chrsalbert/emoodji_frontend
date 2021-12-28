export default {
  props: {
    size: {
      type: String,
      default: null,
      validator: value => ['xs', 'sm', 'lg', 'xl', '2xl'].includes(value)
    },
    invalid: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  methods: {
    onFocus () {
      this.$emit('focus')
    },
    onBlur () {
      this.$emit('blur')
    }
  },
  mounted () {
    this.$emit('input', this.value)
  }
}
