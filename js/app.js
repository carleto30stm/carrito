const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');
const listaProducto = document.querySelector('#lista-producto');
const agregarCarrito = document.querySelector('.agregar-carrito');

let articulos = [];

eventListener();
function eventListener() {
    listaProducto.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', borrarArticulo);
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulos = [];
        muestraHtml();
    })
}


function borrarArticulo(e) {
    if(e.target.classList.contains('borrar-producto')){    
        const productoId = e.target.getAttribute('data-id');
        articulos = articulos.filter( articulo => articulo.id !== productoId);
        muestraHtml();
      
    };
}

// funciones
function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const datosProducto = e.target.parentElement.parentElement;

        leerProducto(datosProducto);
    };
    
}
function leerProducto(articulo) {
    const productoObj = {
        img: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('p span').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulos.some(producto =>producto.id === productoObj.id)
    if(existe){
        const produtos = articulos.map(producto =>{
            if(producto.id === productoObj.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        })
        articulos =[...produtos];
    }else{
        articulos = [...articulos, productoObj];
        console.log(articulos);
    }
    muestraHtml();
}
function muestraHtml() {
    limpiarHtml()
    articulos.forEach(producto =>{
        const{img,titulo,precio,cantidad,id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${img}" width="100" >
        </td>
        <td>
            ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href="#" class="borrar-producto" data-id="${id}">X</a>
        </td>
        `
        contenedorCarrito.appendChild(row)
    })
}
function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}