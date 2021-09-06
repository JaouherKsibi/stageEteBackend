Product=require('../model/product');
Order=require('../model/order');
Client=require('../model/client');
module.exports={
    addOrder(req,res,next){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = dd + '/' + mm + '/' + yyyy;
        client=null;
        var client1={nom:'ksibi1',prenom:'rayen',email:'ksibijaouher@gmail.com',numeroDeTelephone:'52761212'};
        Client.findOne(client1)
        .then((client) => {
            if(client!=null){
              console.log('client existe');
              delete req.body._id;
              const thing = new Order({
                date:today,
                quantity:2,
                seen:false,
                product: '6134a7ad1161a53a709a623e',
                client:client._id,

      });
      thing.save()
        .then(() => res.status(201).json({ message: 'order saved !'}))
        .catch(error => res.status(400).json({ error }));
        }
        else{
          console.log("client n'existe pas");
          const client2=new Client(client1);
            client2.save().then(()=>Client.findOne(client1).then((client3)=>{
              delete req.body._id;
            const thing = new Order({
              date:today,
              quantity:2,
              seen:false,
              product: '6134a7ad1161a53a709a623e',
              client:client3._id,

            });
            thing.save()
              .then(() => res.status(201).json({ message: 'order saved !'}))
              .catch(error => res.status(400).json({ error }));
                  }
                    
                  ).catch(error=>res.status(400).json(error))).catch(error=>res.status(400).json(error));
                  console.log('maha2ah2');
            
        }        
    })
        .catch(error => res.status(400).json({ error }));
    },
    getAllOrders2(req,res,next){
      Order.find().then(orders => res.status(200).json(orders))
      .catch(error => res.status(400).json({ error }));
  },

    getAllOrders(req,res,next){
        Order.find().populate('client').populate({ 
            path: 'product',
            populate: {
              path: 'category',
              model: 'Category'
            } 
         }).exec(function(err,orders1){
            
            res.status(200).json(orders1)});
    },
    getAllSeenOrders(req,res,next){
      Order.find({seen:true}).populate('client').populate({ 
        path: 'product',
        populate: {
          path: 'category',
          model: 'Category'
        } 
     }).exec(function(err,orders1){
        
        res.status(200).json(orders1)});
  },
  getAllNotSeeOrders(req,res,next){
    Order.find({seen:false}).populate('client').populate({ 
      path: 'product',
      populate: {
        path: 'category',
        model: 'Category'
      } 
   }).exec(function(err,orders1){
      
      res.status(200).json(orders1)});
},
getAllNotSeeOrdersNumber(req,res,next){
  Order.find({seen:false}).then(orders=>res.status(200).json(orders.length))
  .catch(error => res.status(400).json({ error }));
},
getAllOrdersNumber(req,res,next){
  Order.find().then(orders=>res.status(200).json(orders.length))
  .catch(error => res.status(400).json({ error }));
},
updateOrder(req,res,next){
  Order.updateOne({ _id: req.params.id },req.body )
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      
},
    getAllOrdersByClient(req,res,next){
        Order.find({client:req.params.idClient}).populate('client').populate({ 
            path: 'product',
            populate: {
              path: 'category',
              model: 'Category'
            } 
         }).exec(function(err,orders1){
            
            res.status(200).json(orders1)});
    },
    deleteOrder(req, res, next){
        Order.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Order deleted !'}))
          .catch(error => res.status(400).json({ error }));
      }
}