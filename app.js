//imports
import express from 'express';
import productsRouter from './src/routes/products.js';
import cartsRouter from './src/routes/carts.js';

//iniciamos la app
const app = express();

//seteamos los middlelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//incorporo los routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)


//configuro puerto servidor
const server = app.listen(8080, () => console.log('Server running on port 8080'));
server.on('error', error => console.log(error));