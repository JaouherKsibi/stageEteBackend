const Category=require('../model/category');
const Product=require('../model/product');
module.exports={
  addCategory(req, res, next){
    delete req.body._id;
    const thing = new Category({
      nom:'laptop1',
      imageUrl:'https://media.ldlc.com/r1600/ld/products/00/05/76/42/LD0005764254_1.jpg'
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
  getCategoryById(req, res, next)  {
    Category.findOne({ _id: req.params.id  })
      .then(cat => res.status(200).json(cat))
      .catch(error => res.status(404).json({ error }));
  },
  UpdateCategory(req, res, next){
    Category.updateOne({ _id: req.params.id }, { nom:'cat1'/*, _id: '60e8c654dacd4021943283bd'/*req.params.id}*/} )
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