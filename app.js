//imports
import express, { Router } from 'express';
import productsRouter from './src/routes/products.js';
import cartsRouter from './src/routes/carts.js';
import homeRouter from './src/routes/home.js';
import { Server } from 'socket.io';

//iniciamos la app
const app = express();

//configuro puerto servidor
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));

const socketServer = new Server(httpServer);

//seteamos los middlelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//incorporo los routes
app.use('/', homeRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)


socketServer.on('connection', (socket) => {
    console.log(`socket connected`);

    socket.on('message', data =>{
        console.log(data)
    })
})