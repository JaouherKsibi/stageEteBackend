//importation of bibliotheque 
const Product=require('../model/product');
const Category=require('../model/category');
const CategoryController=require('../controller/CategoryController');
const product = require('../model/product');
module.exports={
    // ajouter un produit
    addProduct(req, res, next){
      delete req.body._id;
      const thing = new Product(req.body);
      thing.save()
        .then(() => res.status(201).json({ message: 'Product saved !'}))
        .catch(error => res.status(400).json({ error }));
    },
    //getting all products 
    getAllProducts(req,res,next){
        Product.find().populate('category').exec(function(err,products){console.log(products) ;res.json(products);res.status(200)});
    },
    getNbProducts(req,res,next){
      Product.find().then(products=>res.status(200).json(products.length)).catch(error=>res.status(400).json(error));
  },
    getProductById(req, res, next)  {
      Product.findOne({ _id: req.params.id  }).populate('category').exec(function(err,product){res.status(200).json(product)});
    },
    UpdateProduct(req, res, next){
      console.log(req.params)
      Product.updateOne({ _id: req.params.id },req.body )
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
        },
    deleteProduct(req, res, next){
      Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    },
    deleteProductsByIdCategory(req,res,next){
      
        Product.deleteMany({category:req.params.idCategory})
        .then(()=>{res.status(200).json({message:'all objects having this category id were deleted '})})
        .catch(error=>res.status(400).json({error}));
    }
  }
