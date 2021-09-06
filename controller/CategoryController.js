const Category=require('../model/category');
const Product=require('../model/product');
module.exports={
  addCategory(req, res, next){
    delete req.body._id;
    console.log(req.body);
    
    const thing = new Category({
      nom:req.body.nom,
      imageUrl:req.body.imageUrl
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  },
  getAllCategories(req, res, next){
    Category.find()
      .then(categories => res.status(200).json(categories))
      .catch(error => res.status(400).json({ error }));
  },
  getNbCategories(req, res, next){
    Category.find()
      .then(categories => res.status(200).json(categories.length))
      .catch(error => res.status(400).json({ error }));
  },
  getCategoryById(req, res, next)  {
    Category.findOne({ _id: req.params.id  })
      .then(cat => res.status(200).json(cat))
      .catch(error => res.status(404).json({ error }));
  },
  UpdateCategory(req, res, next){
    Category.updateOne({ _id: req.params.id },req.body )
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      },
  deleteCategory(req, res, next){
    Product.deleteMany({category:req.params.id})
    .then(()=>{
      Category.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'category deleted !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error=>res.status(400).json({ error }))
    /*a la supression d'une categorie tous les produits ayants cette categorie vont etre supprimés */
  }
}