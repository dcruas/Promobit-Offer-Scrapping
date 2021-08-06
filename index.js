const axios = require('axios');
const cheerio = require('cheerio');
const Offer = require('./Models/Offer')

var offer = new Offer('','','','');

var offerlist = new Array();

const url = 'http://www.promobit.com.br/';
axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const divOffers = $('#offers > div');

     
    divOffers.each(function(){
        
        const name =  $(this).find('div.bottom_title > h2 > a');        
        if (name != null)
            offer.name = name.text();

        const lastprice = $(this).find('div.info > div.price > span:nth-child(2)');
        if (name != lastprice)
            offer.lastprice = lastprice.text(); 

        const link = $(this).find('a').attr('href');
        if (link != null)
            offer.link = url + link;

        
        if (offer.link === '' || offer.name === '' || offer.link === '')
            console.log('erro na obtencao de dados');
        else
        {
            offerlist.push(offer);
            console.log(offer)    
        }
        //offer.oldPrice = $(this).find('.jogador-posicao').text();
      
        });

}).catch(console.error);