let express =require('express');
let app =  express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let customer = require('./routes/customer');
app.use(customer);

const port =  process.env.port || 3000;
app.listen(port,()=>console.info(`server has started on port ${port}`));