const socket = io();

const products = document.getElementById('products');
const title = document.getElementById('title');
const description = document.getElementById('description');
const category = document.getElementById('category');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const code = document.getElementById('code');
const id = document.getElementById('id');
const newProduct = document.getElementById('new');
const delProduct = document.getElementById('del');
const idToDelete = document.getElementById('idToDelete')

//recibo los datos contenidos en productManager enviados desde el sevidor 

delProduct.addEventListener("click", ()=>{
    let id = idToDelete.value
    socket.emit("delProduct", id)
})

newProduct.addEventListener("click", () => {
    let product = {
      title: title.value,
      description: description.value,
      category: category.value,
      price: price.value,
      code: code.value,
      stock: stock.value,
    };
    const validateProducts = (product) => {
        let isValid = true;
        if (!product.title || !product.description || !product.price || !product.stock || !product.category || !product.code || product.price <= 0) {
            isValid = false;
        }
        return isValid;
    }
    if(!validateProducts(product)){
        alert('Faltan campos por completar/ precio debe ser mayor a cero')
    }else{
        socket.emit("newProduct", product);        
    }
});

socket.on('sendData', data =>{
    //document.getElementById('products').remove();
    const datos = data;
    datos.forEach(element => {
        products.innerHTML += 
        `<tr class="newRow">
            <td>${element.title}</td> 
            <td>${element.description}</td>
            <td>${element.category}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>
            <td>${element.code}</td>
            <td>${element.id}</td>
        </tr>`     
    });
})

