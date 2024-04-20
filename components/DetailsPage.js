import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export class DetailsPage extends HTMLElement {
  constructor() {
      super();
  
      this.root = this.attachShadow({ mode: "open" });
  
      const template = document.getElementById("details-page-template");
      const content = template.content.cloneNode(true);
      const styles = document.createElement("style");
      this.root.appendChild(content);    
      this.root.appendChild(styles);

      async function loadCSS() {
        const request = await fetch("/components/DetailsPage.css");
        styles.textContent = await request.text();
      }
      loadCSS();
  }   

  async renderData() {
      if (this.dataset.id) {
        console.log('** - ', this.dataset.id)
          const product = await getProductById(this.dataset.id);
          console.log('product', product)
          this.root.querySelector("h2").textContent = product.name;
          this.root.querySelector("img").src = `/data/images/${product.image}`;
          this.root.querySelector(".description").textContent = product.description;
          this.root.querySelector(".price").textContent = `$ ${product.price.toFixed(2)} ea`
          this.root.querySelector("button").addEventListener("click", ()=> {
              // TODO addToCart(this.product.id); 
              addToCart(product.id)
              app.router.go('/order');
          })
      } else {
          alert("Invalid Product ID");
      }
  }

  connectedCallback() {
      this.renderData();
  }

}

customElements.define('details-page', DetailsPage)