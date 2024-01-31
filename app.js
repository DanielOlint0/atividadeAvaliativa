const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const agendaRoutes = require('./routes/agendaRoutes');
const path = require('path');

dotenv.config();
const app = express();
app.use(methodOverride('_method')); 
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/agenda', agendaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
