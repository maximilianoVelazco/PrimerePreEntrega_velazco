import { Router } from "express";
import ProductManager from "../productManager.js";
const homeRouter = Router();

//instancio ProductManager
const productManager = new ProductManager();

homeRouter.get('/', async (req, res) =>{
    let productos = await productManager.getProducts();
    res.send(productos)
})
export default homeRouter;