let express =  require('express');
let router = express.Router();

let CustomerModel = require('../models/customer');
router.post('/customer',(req,res)=>{
    let customer = new CustomerModel(req.body);
    customer.save()
      .then((doc)=>{
          res.status(201).send(doc);
      })
      .catch((error)=>{
          res.status(500).send(error);
      })
})
router.get('/customer',async(req,res)=>{
    const customers = await CustomerModel.find()
	res.send(customers)
})

router.put('/customer',(req,res)=>{
    CustomerModel.findOneAndUpdate({ email: req.body.email }, req.body,{ new: true })
      .then((doc)=>{
          res.status(201).send(doc);
      })
      .catch((error)=>{
          res.status(500).send(error);
      })
})
router.delete('/customer',(req,res)=>{
    CustomerModel.findOneAndRemove({ email: req.query.email })
      .then((doc)=>{
          res.status(201).send(doc);
      })
      .catch((error)=>{
          res.status(500).send(error);
      })
})
module.exports = router;
 