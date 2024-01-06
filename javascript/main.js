
// creo producto
const Producto = function(id,tipoDeProducto, marca, tamanio, precio,img,stock) {
    this.id = id
    this.tipoDeProducto = tipoDeProducto;
    this.marca = marca;
    this.tamanio = tamanio;
    this.precio = precio;
    this.img = img
    this.stock = stock
}
//creo productos
let producto1 = new Producto(1,"Tabla", "pyzel", "6.0 fts", 700, `../assets/tabla-pyzel-1.jpeg`,1 );
let producto2 = new Producto(2,"Tabla", "pyzel", "5.9 fts", 900, `../assets/tabla-pyzel-2.webp`,1);
let producto3 = new Producto(3,"Tabla", "lost", "6.4 fts", 1000,`../assets/tabla-lost-1.jpeg`,1);
let producto4 = new Producto(4,"Tabla", "lost", "5.8 fts", 1200,`../assets/tabla-lost-2.webp`,1);
let producto5 = new Producto(5,"Traje de neoprene", "oneil", "  XL ", 400,`../assets/trajeDeNeoprene-oneill-1.webp`,1);
let producto6 = new Producto(6,"Traje de neoprene", "oneil", " XT ", 250,`../assets/trajeDeNeoprene-oneill-2.webp`,1);
let producto7 = new Producto(7,"Traje de neoprene", "billabonf", " MT ", 380,"../assets/trajeDeNeoprene-billabong-1.jpeg",1);
let producto8 = new Producto(8,"Traje de neoprene", "billabong", " XS ", 300,"../assets/trajeDeNeoprene-billabong-2.webp",1);
let producto9 = new Producto(9,"Quillas", "fcs", " L", 100 ,"../assets/quillas-fcs-1.webp",1);
let producto10 = new Producto(10,"Quillas", "fcs", "M", 120 ,"../assets/quillas-fcs-2.webp",1);
let producto11 = new Producto(11,"Quillas", "fcs", "M", 110 ,"../assets/quillas-fcs-3.jpeg",1);
let producto12 = new Producto(12,"Quillas", "fcs", "S", 90 ,"../assets/quillas-fcs-4.jpeg",1)

let lista = [producto1, producto2, producto3, producto4, producto5, producto6, producto7,producto8,producto9,producto10,producto11,producto12];

//carrito de compras
const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const entrarCarrito = document.getElementById("entrar-carrito")


//entrar al carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

lista.forEach((product) =>{
    let content = document.createElement("div")
    content.className = "card"
    content.innerHTML = `
    <img src="${product.img}">
    <p class = "tipoColor"> ${product.tipoDeProducto}</p>
    <p class = "marcaColor"> Marca: ${product.marca}</p>
    <p class = "tamanio" > Tamaño: ${product.tamanio}</p>
    <p class="price"> Precio: ${product.precio}</p>
    `
    shopContent.appendChild(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className= "comprar"
    content.append(comprar)

    comprar.addEventListener("click", () => {

    const repetido  = carrito.some((productoRepetido) => productoRepetido.id === product.id)
    console.log(repetido)
        if (repetido === true){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.stock++
                }
            })
        } else{ 
        carrito.push({
            id:product.id,
            img:product.img,
            tipo:product.tipoDeProducto,
            marca:product.marca,
            precio:product.precio,
            stock:product.stock
        })
        }
        console.log(carrito) 
        guardalocal()
    })
})
const carritoAdds = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = ("modal-header")
    modalHeader.innerHTML = `
            <h1 class = "modal-header-title"> carrito </h1>
    `
    modalContainer.append(modalHeader)


    const modalButton = document.createElement("p")
    modalButton.innerText = ("X")
    modalButton.className = ("modal-header-button")
    modalButton.addEventListener("click",() => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalButton)


    carrito.forEach((product) => {
        console.log(product)
        
        let carritoContent = document.createElement("div")
    
        carritoContent.className = ("modal-content")
        carritoContent.innerHTML = `

        <img src = "${product.img} ">
        <p>${product.productoTipo}</p>
        <p>${product.marca} </p>
        <p> ${product.precio}$usd </p>
        <span class = "restar"> - </span>
        <p> cantidad:${product.stock}</p>
        <span class = "sumar"> + </span>
        <p> total: ${product.stock*product.precio}
        
        `
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", ()=> {
            if (product.stock !== 1)
            product.stock --;
            carritoAdds()
            guardalocal()
            
        })
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", ()=> {
            product.stock++
            carritoAdds()
            guardalocal()
        })

        let eliminarProductoDelCarrito = document.createElement("span")
        eliminarProductoDelCarrito.innerHTML = "❌"
        eliminarProductoDelCarrito.className = "delete-product"
        carritoContent.append(eliminarProductoDelCarrito)

        eliminarProductoDelCarrito.addEventListener("click",eliminarCarrito)
    })

    const total = carrito.reduce((acumulador,el) => acumulador + el.precio * el.stock, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "carrito-total"
    totalCompra.innerHTML = ` total a pagar: ${total} $`
    modalContainer.append(totalCompra)
};

verCarrito.addEventListener("click", carritoAdds)

const eliminarCarrito = () =>{
    const foundId = carrito.find((element) => element.id)
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId 
    })
    carritoAdds()
    guardalocal()
    
}

const guardalocal = ()=>{
    localStorage.setItem("carrito", JSON.stringify (carrito))
}
JSON.parse(localStorage.getItem("carrito"))




