Product=require('../model/product');
Order=require('../model/order');
Client=require('../model/client');
module.exports={
    addOrder(req,res,next){
        client=null;
        var client1={nom:'ksibi4',prenom:'rayen',email:'ksibijaouher@gmail.com',numeroDeTelephone:'52761212'};
        Client.findOne(client1)
        .then((client) => {
            if(client!=null){
              delete req.body._id;
              const thing = new Order({
                date:Date.now().toString(),
                quantity:2,
                product: '60f89a14d39ff92ef4625343',
                client:client._id,

      });
      thing.save()
        .then(() => res.status(201).json({ message: 'order saved !'}))
        .catch(error => res.status(400).json({ error }));
        }
        else{
          console.log('maha2ah');
          const client2=new Client(client1);
            client2.save().then(()=>Client.findOne(client1).then((client3)=>{
              delete req.body._id;
            const thing = new Order({
              date:Date.now().toString(),
              quantity:2,
              product: '60f89a14d39ff92ef4625343',
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