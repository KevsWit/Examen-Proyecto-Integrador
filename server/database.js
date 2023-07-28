const mongoose=require('mongoose');
const URI='mongodb://127.0.0.1:27017/tienda';
mongoose.connect(URI)
.then(db=> console.log('BD conectada'))
.catch(err => console.error(err));
module.exports=mongoose;