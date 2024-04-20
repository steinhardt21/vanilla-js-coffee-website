const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach(a => {
      a.addEventListener("click", event => {
        event.preventDefault()
        // const url = a.href
        // const url2 = a.getAttribute("href")
        const url3 = event.target.getAttribute("href")
        Router.go(url3)
      })
    })
    // Event Handler fo URL changes
    window.addEventListener("popstate", event => {
      Router.go(event.state.route, false)
    })

    // Check the initial URL
    Router.go(location.pathname)
  },
  go: (route, addToHistory = true) => {
    console.log("Going to: ", route)

    if(addToHistory) {
      history.pushState({ route }, '', route)
    }

    console.log('history ', history.state)

    let pageElement = null
    console.log('router ', route)

    switch(route) {
      case "/":
        pageElement = document.createElement("menu-page")
        break;
      case "/order":
        pageElement = document.createElement("order-page")
        pageElement.textContent = "order"
        break;
      default: 
        if(route.startsWith("/product-")) {
          console.log('**** ciao')
          pageElement = document.createElement("details-page")
          pageElement.textContent = "Details"

          const paramdId = route.substring(route.lastIndexOf("-") + 1)
          pageElement.dataset.id = paramdId
        }
        
    }

    const cache = document.querySelector("main")

    cache.childNodes[0].remove()
    cache.appendChild(pageElement)

    window.scrollX = 0
    window.screenY = 0
  }
}

export default Router