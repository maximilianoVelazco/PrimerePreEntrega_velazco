const socket = io();

socket.emit('mesage', 'mensaje desde el cliente')