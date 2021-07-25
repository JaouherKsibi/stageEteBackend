Client=require('../model/client');
module.exports={
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