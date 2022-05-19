export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const VNodes: any = []
    if (props.icon) {
      VNodes.push(h(resolveComponent('el-icon'), null, () => h(resolveComponent(props.icon))))
    }

    if (props.title) {
      VNodes.push(h('span', null, props.title))
    }
    return () => VNodes
  }
})
