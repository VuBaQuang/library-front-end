import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Libary - Kma'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
