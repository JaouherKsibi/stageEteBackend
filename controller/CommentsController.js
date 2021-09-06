const Comment=require('../model/Comment');
//const Product=require('../model/product');
module.exports={
  addComment(req, res, next){
    delete req.body._id;
    console.log(req.body);
    
    const thing = new Comment({
      nom:'ksibi',
      email:'ksibijaouher@gmail.com',
      phoneNumber:'52761212',
      message:'mon message',
      seen:false
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Comment enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  },
  getAllComments(req, res, next){
    Comment.find()
      .then(Comments => res.status(200).json(Comments))
      .catch(error => res.status(400).json({ error }));
  },
  getAllSeenComments(req, res, next){
    Comment.find({seen:true})
      .then(Comments => res.status(200).json(Comments))
      .catch(error => res.status(400).json({ error }));
  },
  getCommentById(req, res, next)  {
    Comment.findOne({ _id: req.params.id  })
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(404).json({ error }));
  },
  UpdateComment(req, res, next){
    Comment.updateOne({ _id: req.params.id },{seen:true}/*req.body*/ )
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      },
      getNbNotSeenComments(req, res, next)  {
        Comment.find({seen:false})
          .then(comment => res.status(200).json(comment.length))
          .catch(error => res.status(404).json({ error }));
      },
  deleteComment(req, res, next){
      Comment.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Comment deleted !'}))
      .catch(error => res.status(400).json({ error }));
    }
    
}