import Store from './services/Store.js'
import { loadData } from './services/Menu.js'
import Router from './services/Router.js'

// Link my Web Components
import { MenuPage } from './components/MenuPage.js'
import { OrderPage } from './components/OrderPage.js'
import { DetailsPage } from './components/DetailsPage.js'
import ProductItem from './components/ProductItem.js'

window.app = {}
app.store = Store
app.router = Router

window.addEventListener("DOMContentLoaded", () => {
  loadData()
  app.router.init()

  navigateEvent.intercept({
    async handler() {
      const html = await getHTMLFragment(url.pathname)
  
      // If the browser doesn't support this API, update the DOM as usual
      if (!document.createDocumentTransition) {
        updateTheDOMSomehow(html)
        return
      }
  
      // Otherwise, update the DOM within a transition
      const transition = document.createDocumentTransition()
      transition.start(() => updateTheDOMSomehow(html))
    },
  })
})

window.addEventListener("appcartchange", event => {
  const badge = document.getElementById("badge")
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0)

  badge.textContent = qty
  badge.hidden = qty === 0
})