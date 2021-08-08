const axios = require('axios');
const cheerio = require('cheerio');
const Offer = require('./Models/Offer');
const mongoose = require('mongoose');
const EventEmitter = require('events');
require('dotenv').config();


const emitter = new EventEmitter();

const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
      console.log('connected to MongoDB');
    } catch(error) {
      console.log('error connection to MongoDB:', error.message);
    }
  };

emitter.on('StartScrapping', async function(){
 
    connectToMongo();    
    const url = 'http://www.promobit.com.br';
    axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const divOffers = $('#offers > div');

   
    divOffers.each(async function(){
      
      const name =  $(this).find('div.bottom_title > h2 > a');        
      const lastprice = $(this).find('div.info > div.price > span:nth-child(2)');
      const link = $(this).find('a').attr('href');       
      
      if (name == null || lastprice == null || link == null)
          console.log('erro na obtencao de dados');
      else
      {
          const offer = new Offer({
              name:name.text(),
              oldprice:'',
              lastprice: lastprice.text(),
              link: url + link,
              notified: false
          });
          
          Offer.findOne({ 'name': offer.name, 'link': offer.link }, function (err, storedOffer) {
            if (err)
              console.log(err);
            else
            {
              if (storedOffer != null)
              {
                console.log("Ja existe no banco");
              }
              else
              {
                offer.save().catch((err)=> {
                  console.log("Erro ao conectar, erro: " + err)});  
              }
                  
            }        
            });
      } 
    });
    
      

}).catch(console.error);
});

setInterval (async function () {
  emitter.emit('StartScrapping');
},20000);




 




       