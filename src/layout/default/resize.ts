import { useAppStore } from '@/store/modules/app'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

const WIDTH = 992

export function useResize() {
  const appStore = useAppStore()

  const { setMenuSetting } = useMenuSetting()

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const handleFullWidthSizing = () => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth

    document.querySelector('body')!.style.width = `calc(100vw - ${scrollbarWidth}px)`
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      appStore.toggleDevice(isMobile() ? 'mobile' : 'desktop')

      if (isMobile()) {
        setMenuSetting({
          collapsed: false,
          withoutAnimation: true,
        })
      }
    }
  }

  onMounted(() => {
    handleFullWidthSizing()
    if (isMobile()) {
      appStore.toggleDevice('mobile')

      setMenuSetting({
        collapsed: false,
        withoutAnimation: true,
      })
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
