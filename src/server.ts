import 'reflect-metadata';
import errorHandler from 'errorhandler';
import app from './app';
import http from 'http';
import { Server } from 'socket.io';


if (process.env.NODE_ENV === 'dev') {
    app.use(errorHandler());
}

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('Press CTRL-C to stop\n');
});

const wsserver = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});


export default server;
