import express from "express";
import ProductManager from "../productManager.js";
const viewsRouter = express.Router();

const productManager = new ProductManager();

let errorMsg = 'Perdón, parece que no hay nada que mostrar'

viewsRouter.get(`/`, async (req, res) => {
    let products = await productManager.getProducts();
    products ? res.render("home", {products, style: 'index.css'}) : res.render("home", { errorMsg })
  })

viewsRouter.get('/realTimeProducts', async(req, res) =>{
    let products = await productManager.getProducts()
    products ? res.render("realtimeProducts", {}) : res.render("realTimeProducts", { errorMsg })
})  


export default viewsRouter;