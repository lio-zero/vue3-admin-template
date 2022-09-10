import Icon from './src/Icon.vue'
import SvgIcon from './src/SvgIcon.vue'
import ElIcon from './ElIcon'

export function setupElIcon(app) {
  for (const key in ElIcon)
    app.component(key, ElIcon[key])
}

export { Icon, SvgIcon }

export default Icon
