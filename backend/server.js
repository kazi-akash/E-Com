import path from 'path';
import express  from 'express';
import dotenv  from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandeler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
 
dotenv.config();

connectDB();

const app = express();
// app.use(cors());

//dev middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middlewares
app.use(express.json());  //body parser, helps to send post data to local to server as json

// app.get('/', (req, res) => {
//   res.send('Api server running...');
// });

app.use('/api/products', productRoutes); //if api get request then it will send to productRoutes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => 
        res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //making upload folder global so that file(read/write) can get access

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound);  //customized url not found error 
app.use(errorHandeler);  //customized error handeler

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.brightMagenta.bold));