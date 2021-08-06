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
         offer.name = $(this).find('div.bottom_title > h2 > a').text();
         //offer.oldPrice = $(this).find('.jogador-posicao').text();
         offer.lastprice = $(this).find('div.info > div.price > span:nth-child(2)').text();
         offer.link = 'http://www.promobit.com.br' +$(this).find('a').attr('href');
         offerlist.push(offer);


         console.log(offer)});

}).catch(console.error);