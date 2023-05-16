import { Router } from "express";
import CartManager from "../cartsManager.js";
const cartsRouter = Router();

//instancio CartManager
const cartManager = new CartManager();


//GET 

//veo todos los carts existentes
cartsRouter.get('/', async (req, res) => {
    let carts = await cartManager.getCarts();
    res.send(carts);
})

//veo un cart segun su id
cartsRouter.get('/:cid', async (req, res) => {
    let cid = req.params.cid;
    let carts = await cartManager.getCartsByID(cid);
    !carts ? res.status(400).send({ status: 'error', msg: 'cart id not found' }) : res.send(carts)
})

//POST
//creo un cart vacio
cartsRouter.post('/', async (req, res) => {
    let carts = await cartManager.createCart();
    res.send({ status: 'success', msg: 'se añadio un nuevo carrito' })
});

//agrego productos al cart segun pid y cid
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    let { cid } = req.params;
    let { pid } = req.params;
    let newProductToCarts = await cartManager.addToCart(pid, cid);
    !newProductToCarts ? res.status(400).send({ status: 'error', msg: 'error, cart not found' }) :
        res.send({ status: 'success', msg: 'se añadio un nuevo carrito' })
});

export default cartsRouter; 