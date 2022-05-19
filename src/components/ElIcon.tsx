export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const VNode: any = []
    if (props.icon) {
      VNode.push(
        h(
          resolveComponent('el-icon'),
          {
            size: 20
          },
          () => h(props.icon)
        )
      )
    }
    return () => VNode
  }
})
