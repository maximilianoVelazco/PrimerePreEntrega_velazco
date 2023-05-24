//imports
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productsRouter from './src/routes/products.js';
import cartsRouter from './src/routes/carts.js';
import viewsRouter from './src/routes/views.router.js';
import ProductManager from './src/productManager.js';
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

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars')

//incorporo los routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


//websockets
socketServer.on('connection', async (socket) => {
    console.log(`socket connected`);

    //instancio product managet
    const productManager = new ProductManager();

    //envio los datos contenidos en productManager al cliente
    socket.emit('sendData', await productManager.getProducts())

    //recibo el nuevo producto
    socket.on("newProduct", async (data) => {
            data.status = true;
            data.id = await productManager.addNewId();
            await productManager.addProduct(data); 
    });

    //elimino un producto por su id
    socket.on('delProduct', async (id) =>{
        await productManager.deletePoduct(id);
    })
})