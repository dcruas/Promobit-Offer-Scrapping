const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    name:String,
    oldprice:String,
    lastprice:String,
    link:String,
    time : { type : Date, default: Date.now },
    servernotified : {type: Array, default: []}
});


const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;

