import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)
const isMobile = md.mobile()

if (isMobile) {
  const elementsToHide = document.querySelectorAll('.no-mobile')

  for (let i = 0; elementsToHide.length > i; i++) {
    const elem = elementsToHide[i]
    elem.parentNode.removeChild(elem)
  }
}
