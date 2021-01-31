import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import fileUpload = require('express-fileupload');

// Routes
import indexRoutes from './routes'
import tasksRoutes from './routes/tasks'
import contactsRoutes from './routes/contacts'


class Application {

    app: express.Application;
    appRoot;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.appRoot = path.resolve(__dirname);
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs')
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(fileUpload({tempFileDir: '/public/csv',}));
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/tasks', tasksRoutes);
        this.app.use('/contacts', contactsRoutes);
        this.app.use(express.static(path.join(__dirname, 'public'))); 
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

export default Application;