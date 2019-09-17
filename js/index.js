const cart = new Cart($('#cartModal'));
const productList = new ProductList('products.json',$('.products-container'),cart);

document.querySelector('#find').addEventListener('click', searchWindow);

function searchWindow() {
    let search = document.querySelector('#search').value;
    window.find(search, true, true, true, false, false, true);

}
