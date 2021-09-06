const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//const Category = require('./model/category');
const CategoryController = require('./controller/CategoryController');
const ProductController = require('./controller/ProductsController');
const ClientsController = require('./controller/clientsController');
const OrderController=require('./controller/ordersController');
const authController=require('./controller/AuthController');
const commentsController=require('./controller/CommentsController');
console.log('ok');
app.use(cookieParser());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://root:root123456789@stage2.rv4ul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => {console.log('Connexion à MongoDB échouée !');console.log(err);});
// utiliser le cros pour eviter le probleme de securite 
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  /********************************************** */
  //          partie gestion de categories
  /********************************************** */
  // ajouter une categorie 
  //app.use('/api/getAlllCategory',(res,req,next)=>controllerCategory.addCategory(res,req,next))
app.post('/api/addCategory', (req, res, next) => CategoryController.addCategory(req,res,next)); 
// recuperer une liste de toutes les categories 
app.use('/api/getAllCategories', (req, res, next) => CategoryController.getAllCategories(req,res,next));
  // recuperer une seule categorie  
app.use('/api/getCategoryById/:id', (req, res, next) => CategoryController.getCategoryById(req,res,next));
app.use('/api/UpdateCategory/:id', (req, res, next) => CategoryController.UpdateCategory(req,res,next)); 
  app.use('/api/deleteCategory/:id', (req, res, next) => CategoryController.deleteCategory(req,res,next)); 
  app.use('/api/getNbCategories', (req, res, next) => CategoryController.getNbCategories(req,res,next));
 
  
  //********************************** */fin de parti gestion category 

  /********************************************* */
  //                 partie gestion de produit 
  /********************************************* */
  // ajouter un Produit 
app.post('/api/addProduct', (req, res, next) => ProductController.addProduct(req,res,next));
// recuperer une liste de tous les produits 
app.get('/api/getAllProducts', (req, res, next) => ProductController.getAllProducts(req,res,next));
  // recuperer un seule produit  
app.use('/api/getProductById/:id', (req, res, next) => ProductController.getProductById(req,res,next));
app.post('/api/UpdateProduct/:id', (req, res, next) => ProductController.UpdateProduct(req,res,next)); 
app.post('/api/deleteProduct/:id', (req, res, next) => ProductController.deleteProduct(req,res,next)); 
app.use('/api/deleteProductsByCategory/:idCategory',(req,res,next)=>ProductController.deleteProductsByIdCategory(req,res,next))
app.get('/api/getNbProducts', (req, res, next) => ProductController.getNbProducts(req,res,next));
   
// fin gestion de produit 
  




/************************************************************************ */
                               // partie de gestion de client 
/************************************************************************ */
  ///////////////////////////////////ajouter un client //////////////////////////////////
app.use('/api/addClient',(req,res,next)=>ClientsController.addClient(req,res,next));
app.use('/api/getAllClients',(req,res,next)=>ClientsController.getAllClients(req,res,next));
app.use('/api/getClientById/:id',(req,res,next)=>ClientsController.getClientById(req,res,next));
app.use('/api/deleteClientById/:id',(req,res,next)=>ClientsController.deleteClientById(req,res,next));




//                              fin gestion de client 


/************************************************************************ */
                               // partie de gestion de commandes 
/************************************************************************ */

app.use('/api/addOrder',(req,res,next)=>OrderController.addOrder(req,res,next));
app.use('/api/getAllOrders',(req,res,next)=>OrderController.getAllOrders(req,res,next));
app.use('/api/getAllOrders2',(req,res,next)=>OrderController.getAllOrders2(req,res,next));
app.use('/api/getOrdersByClient/:idClient',(req,res,next)=>OrderController.getAllOrdersByClient(req,res,next));
app.get('/api/deleteOrder/:id',(req,res,next)=>OrderController.deleteOrder(req,res,next));
app.use('/api/getSeenOrders',(req,res,next)=>OrderController.getAllSeenOrders(req,res,next));
app.use('/api/getNotSeenOrders',(req,res,next)=>OrderController.getAllNotSeeOrders(req,res,next));
app.post('/api/updateOrder/:id',(req,res,next)=>OrderController.updateOrder(req,res,next));

app.get('/api/getAllNotSeeOrdersNumber',(req,res,next)=>OrderController.getAllNotSeeOrdersNumber(req,res,next));
app.get('/api/getAllOrdersNumber',(req,res,next)=>OrderController.getAllOrdersNumber(req,res,next));


/////////////////////////////////fin gestion de commandes
/************************************************* *//*

                            authentification 
/***************************************************** */
//register
app.use('/api/register',(req,res,next)=>authController.register(req,res,next));
app.post('/api/login',(req,res,next)=>authController.login(req,res,next));
app.use('/api/logout',(req,res,next)=>authController.logout(req,res,next))




/********************* debut partie gestion de Commentaire  */

app.use('/api/getAllComments',(req,res,next)=>commentsController.getAllComments(req,res,next));
app.use('/api/addComment',(req,res,next)=>commentsController.addComment(req,res,next));
app.use('/api/getComment/:idComment',(req,res,next)=>commentsController.getCommentById(req,res,next));
app.get('/api/deleteComment/:id',(req,res,next)=>commentsController.deleteComment(req,res,next));
app.use('/api/updateComment/:id',(req,res,next)=>commentsController.UpdateComment(req,res,next))
app.use('/api/getAllSeenComments',(req,res,next)=>commentsController.getAllSeenComments(req,res,next));
app.use('/api/getNbNotSeenComments',(req,res,next)=>commentsController.getNbNotSeenComments(req,res,next));


/********************* fin partie gestion de Commentaire  */
module.exports = app;