const express = require('express');
const app = express();
const cors = require('cors');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const methodOverrive = require('method-override');
const db = require('./config/db');
const route = require('./routes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const port = 3000;

db.connect();

dotenv.config();

app.use(methodOverrive('_method'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));

route(app);
app.listen(port,()=>console.log(`app listening at http://localhost:${port}`))