document.querySelector('#account').addEventListener('click', addWindowAccount );

function addWindowAccount(){
    document.querySelector('.overlay').style.display = 'flex';
}
document.querySelector('#close').addEventListener('click', closeWindowAccount );

function closeWindowAccount(){
    document.querySelector('.overlay').style.display = 'none';
}
document.querySelector('#backet').addEventListener('click', addWindowBacket );

function addWindowBacket(){
    document.querySelector('.backet').style.display = 'flex';
}
document.querySelector('#close-backet').addEventListener('click', closeWindowBacket );

function closeWindowBacket(){
    document.querySelector('.backet').style.display = 'none';
}
// document.querySelector('#bags').addEventListener('click', bagsCatalog );

// function bagsCatalog(){
//     document.querySelector('.container-bags').style.display = 'flex';
//     document.querySelector('.container-bananas').style.display = 'none';
// }
// document.querySelector('#bananas').addEventListener('click', bananasCatalog );

// function bananasCatalog(){
//     document.querySelector('.container-bags').style.display = 'none';
//     document.querySelector('.container-bananas').style.display = 'flex';
// }



let d = document,
    itemBox = d.querySelectorAll('.product'),
		cartCont = d.getElementById('cart_content');
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}
function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}
function addToCart(e){
	this.disabled = true;
	var cartData = getCartData() || {},
			parentBox = this.parentNode,
			itemId = this.getAttribute('data-id'),
			title = parentBox.querySelector('.title').innerHTML,
			price = parentBox.querySelector('.price').innerHTML;
	if(cartData.hasOwnProperty(itemId)){
		cartData[itemId][2] += 1;
	} else {
		cartData[itemId] = [title, price, 1];
	}
	if(!setCartData(cartData)){
		this.disabled = false;
		cartCont.innerHTML = 'Товар доданий в корзину.';
	}
	return false;
}
for(let i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.buy'), 'click', addToCart);
}
function openCart(e){

	let cartData = getCartData(),
			totalItems = '';
	console.log(JSON.stringify(cartData));
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Назва</th><th>Ціна</th><th>К-ть</th></tr>';
		for(let items in cartData){
			totalItems += '<tr>';
			for(let i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '</tr>';
		}
		totalItems += '<table>';
		cartCont.innerHTML = totalItems;
	} else {
		cartCont.innerHTML = 'Корзина порожня';
	}
	return false;
}
addEvent(d.getElementById('backet'), 'click', openCart);
addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очищена.';
});
