Client=require('../model/client');
module.exports={
  deleteClientById(req,res,next){
    Client.deleteOne({ _id: req.params.id })
    .then(() => {res.status(200).json({ message: 'user deleted !'});console.log("ok1");})
    .catch(error => {res.status(400).json({ error });console.log("maha2ah");});
  },
  getClientById(req, res, next)  {

    Client.findOne({ _id: req.params.id  })
      .then((c) => { res.status(200).json(c)})
      .catch(error => res.status(404).json({ error }));
  },
  getAllClients(req,res,next){
    Client.find()
      .then(clients => res.status(200).json(clients))
      .catch(error => res.status(400).json({ error }));
},
    addClient(req,res,next){
    delete req.body._id;
    const client = new Client({
      nom:'ksibi11',
      prenom:'rayen11',
      email:'ksibijaouher@gmail.com',
      numeroDeTelephone:'52761212'
    });
    client.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
    }
}