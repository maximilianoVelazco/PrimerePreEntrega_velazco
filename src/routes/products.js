import { Router } from "express";
import ProductManager from "../productManager.js";
import { validateProducts } from "../utils/index.js";
const productsRouter = Router();

//instancio ProductManager
const productManager = new ProductManager();

//GET
productsRouter.get('/', async (req, res) => {
    let productos = await productManager.getProducts();
    res.send(productos);
})


productsRouter.get('/limited', async (req, res) => {
    let productos = await productManager.getProducts();
    let { limit } = req.query;
    let acotarProductos = limit ? productos.slice(0, limit) : productos;
    res.send(acotarProductos);
})

productsRouter.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let producto = await productManager.getProductsByID(pid);
    producto ? res.send(producto) : res.send('El id ingresado no existe o no es valido')
})
//FIN GET

//POST
//nuevo producto
productsRouter.post('/', async (req, res) => {
    let product = req.body;

    if (!validateProducts(product)) {
        res.status(400).send({
            status: 'error', msg: 'faltan campos por completar/ precio debe ser mayor a cero'
        })
    }
    product.status = true;
    product.id = await productManager.addNewId();

    await productManager.addProduct(product);
    res.send({ msg: 'producto agregado' })
});
//FIN POST   

//PUT
//actualizar producto
productsRouter.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    let newValue = req.body;
    let updateProduct = await productManager.updateProduct(pid, newValue);
    if (!updateProduct) {
        res.status(400).send({ status: 'error', msg: 'faltan campos por completar/ precio debe ser mayor a cero' })
    }
    res.send({ status: 'success', msg: 'update successfully' })
})
//FIN PUT

//DELETE
productsRouter.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    let deletePoduct = await productManager.deletePoduct(pid);
    if (!deletePoduct) {
        res.status(400).send({ status: 'error', msg: 'no se pudo eliminar el producto' })
    }
    res.send({ status: 'success', msg: 'el producto se elimino satifactoriamente' })
})
//FIN DELETE

export default productsRouter;


