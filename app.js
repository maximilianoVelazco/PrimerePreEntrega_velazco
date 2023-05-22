//imports
import express from 'express';
import productsRouter from './src/routes/products.js';
import cartsRouter from './src/routes/carts.js';
import { Server } from 'socket.io';

//iniciamos la app
const app = express();

//configuro puerto servidor
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));

const socketServer = new Server(httpServer);

//seteamos los middlelware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//incorporo los routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)


socketServer.on('connection', (socket) => {
    console.log(`socket connected`);
})