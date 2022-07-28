let express =require('express');
let app =  express();
var cors = require('cors');

app.use(cors());

let bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));

let customer = require('./routes/customer');
app.use(customer);

const port =  process.env.port || 3000;
app.listen(port,()=>console.info(`server has started on port ${port}`));