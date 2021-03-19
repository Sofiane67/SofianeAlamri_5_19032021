const productsContainer = document.querySelector("#products");

export default class Home{
    static renderProducts(product){
        
        product.map(product => {
            const html =
                `
                <a href="pages/produit.html?id=${product._id}" class="card">
                    <figure class="camera">
                        <div class="camera__img-box">
                            <img src="${product.imageUrl}" alt="" class="camera__img">
                        </div>
                        <figcaption class="camera__caption">
                            <p class="camera__name">${product.name}</p>
                            <p class="camera__description">${product.description}</p>
                            <p class="camera__price">${product.price}</p>
                        </figcaption>
                    </figure>
                </a>
                `
            productsContainer.insertAdjacentHTML("afterbegin", html);
        })
    }
}