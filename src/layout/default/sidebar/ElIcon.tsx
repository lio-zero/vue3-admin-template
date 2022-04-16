import { h, resolveComponent } from 'vue'
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
      VNode.push(h(resolveComponent('el-icon'), null, () => h(resolveComponent(props.icon))))
    }
    return () => VNode
  }
})
