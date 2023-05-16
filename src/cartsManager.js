import fs from 'fs';

class CartManager {
    constructor() {
        this.path = './carts.json';
    };

    //metodo para ver todos los productos
    async getCarts() {
        //leo el archivo donde estan guardados los carritos 
        let dbCarts = await fs.promises.readFile(this.path);
        //parseo dbProducts
        let carts = JSON.parse(dbCarts);
        //muestro todos los productos
        return carts;
    };

    //metodo para buscar un carrito de acuerdo a su ID
    async getCartsByID(cid) {
        let carts = await this.getCarts();
        //busco si existe el valor proporcionado en el parametro
        const searchId = await carts.find(cart => cart.id == cid);
        if (searchId) {
            //si hay coincidencia muestro seachId
            return searchId
        }
    };

    //metodo para añadir un id 
    async addNewId() {
        let carts = await this.getCarts();
        return carts.length + 1;
    };

    //metodo para crear un nuevo carrito
    async createCart() {
        //creo un objeto que contenga un id y un array de productos
        let newCart = {
            id: await this.addNewId(),
            products: []
        }
        let carts = await this.getCarts();
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return newCart;
    };

    //agrego el cart a la base
    async addToCart(pid, cid) {
        let cart;
        let carts = await this.getCarts();
        let searchIndex = await carts.findIndex(cart => cart.id == cid);
        if (searchIndex == -1) {
            return cart;
        }
        //creo un obj q tenga el id del producto y su cantidad que sera actualizable
        let productToCart = {
            id: pid,
            quantity: 1
        }
        //guardo en una variable la clave product de mi carrito para trabajar con ella
        let product = carts[searchIndex].products;
        //busco en le objeto si existe el id del producto nuevo que quiero agregar
        let searchIdOfProductToCart = product.find(product => product.id == productToCart.id)
        //si ya existe el id incremento en 1 el quantity
        if (searchIdOfProductToCart) {
            searchIdOfProductToCart.quantity += 1
        } else {
            //si el id no existe pusheo todo el objeto a products
            product.push(productToCart)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return carts[searchIndex];
    };
};

export default CartManager;