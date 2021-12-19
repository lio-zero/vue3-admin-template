// import defaultSettings from '@/settings'

const title = 'Vue Blog Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
