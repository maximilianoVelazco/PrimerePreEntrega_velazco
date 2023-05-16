import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = './products.json';
    };

    async addNewId() {
        let products = await this.getProducts();
        let addNewId = products.length + 1
        return addNewId;
    }

    //agrego un nuevo producto
    async addProduct(product) {
        let products = await this.getProducts();
        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        return product
    };

    //metodo para ver todos los productos
    async getProducts() {
        //leo el archivo donde estan guardados los productos
        let dbProducts = await fs.promises.readFile(this.path);
        //parseo dbProducts
        let products = JSON.parse(dbProducts);
        //muestro todos los productos
        return products;
    };

    //metodo para buscar un producto de acuerdo a su ID
    async getProductsByID(el) {
        let products = await this.getProducts();
        //busco si existe el valor proporcionado en el parametro
        const searchId = await products.find(product => product.id == el);
        if (searchId) {
            //si hay coincidencia muestro seachId
            return searchId
        }
        //mensaje si no hay coincidencia
        console.log('El ID consutado no corresponde con ningun producto en la base de datos')
    };

    //metodo para actualizar alguna clave del poducto seleccionado por su id
    async updateProduct(pid, newValue) {

        let products = await this.getProducts();
        //busco si existe el id y guardo su indice si existe
        let searchIndex = await products.findIndex(product => product.id == pid);
        //mensaje si el id no existe
        if (searchIndex == -1) {
            return ("El id no corresponde a ninguno de la base")
            //accion si existe el id    
        }
        //busco en los productos el indice y su clave y le asigno un valor nuevo
        products[searchIndex].title = newValue.title;
        products[searchIndex].description = newValue.description;
        products[searchIndex].price = newValue.price;
        products[searchIndex].code = newValue.code;
        products[searchIndex].stock = newValue.stock;

        //reescribo el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products;
    };
    //metodo para eliminar un producto a partir de su id
    async deletePoduct(pid) {

        let products = await this.getProducts();
        let searchIndex = await products.findIndex(product => product.id == pid);
        if (searchIndex !== -1) {
            products.splice(searchIndex, 1);
        }
        else { console.log("El id no corresponde a ninguno de la base") };
        //reiniciar el valor de los id de cada producto despues de eliminar uno
        for (let i = 0; i < products.length; i++) {
            products[i].id = i + 1;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products
    };
};

let producto = new ProductManager;

//AGREGA UN NUEVO PRODUCTO
//producto.addProduct("Naranja", "Esta es la descripcion de una Naranja", 500, "Foto de una naranja", 4264, 183)
//producto.addProduct("Uva", "Esta es la descripcion de una uva", 540, "Foto de una uva", 4154, 450);//--> este no va a agregar el producto porque el price no tiene el formato correcto
//producto.addProduct("Manzana", "Esta es la descripcion de una manzana", 500, "Foto de una manzana", 4263, 21); //--> este addProduct dara error por repetir el codigo
//producto.addProduct("Frutilla", "Esta es la descripcion de una frutilla", 380, "Foto de una frutilla", 5874, 700);

//MUESTRA TODA LA LISTA DE PRODUCTOS
//console.table(await producto.getProducts());

//BUSCA UN PRODUCTO MEDIANTE SU ID
//console.log(await producto.getProductsByID(5))

//CAMBIA EL VALOR DE UN PRODUCTO MEDIANTE SU ID, SU CLAVE Y EL VALOR NUEVO DE LA CLAVE A CAMBIAR
//let cambiar = await producto.updateProduct(4, "title", "Durazno")
//console.log(cambiar)

//ELIMINA UN PRODUCTO DE LA LISTA A PARTIR DE SU ID
//console.log(await producto.deletePoduct(4));

export default ProductManager;