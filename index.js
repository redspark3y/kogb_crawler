const express = require('express')
const app = express()
const cheerio = require('cheerio');
const axios = require('axios');

const gamesatisURL = "https://www.gamesatis.com/knight-online-goldbar"
const gamesatisSERVER = [
    'ALTAR',
    'VEGA',
    'SIRIUS',
    'ARES',
    'DIEZ',
    'GORDION',
    'OLMYPIA',
    'ROSETTA',
    'DESTAN',
]

const bynogameURL = "https://www.bynogame.com/tr/oyunlar/knight-online/gold-bar"
const bynogameSERVER = [
    'SIRIUS',
    'VEGA',
    'ALTAR',
    'DESTAN',
    'OLMYPIA',
    'ARES',
    'DIEZ',
    'GORDION',
    'ROSETTA',
]

const klasgameURL = "https://www.klasgame.com/goldbar/knightonline/knight-online-gb-goldbar-premium-cash"
const klasgameSERVER = [
    'ZERO',
    'PANDORA',
    'AGARTHA',
    'FELIS',
    'DRYADS',
    'DESTAN',
    'OREADS',
    'MINARK',
    'ZION',
]

const yesilyurtURL = 'https://www.yesilyurtgame.com/oyun-parasi/knight-online-goldbar-gb';
const yesilyurtSERVER = [
    'ALTAR',
    'SIRIUS',
    'VEGA',
    'DESTAN',
    'ROSETTA',
    'OLMYPIA',
    'ARES',
    'DIEZ',
    'GORDION',
    'CYPHER',
    'PATHOS',
]
    

const kopazarURL = 'https://www.kopazar.com/knight-online-gold-bar'

var priceArray = [];

const gamesatisGetir = () => new Promise((resolve, reject) => {
    axios.get(gamesatisURL)
    .then((response) => {
        let $ = cheerio.load(response.data);
        $(".goldbar-form").each(function (i, e) {
            let priceBuy = $(e).find('div.col-xxl-5.col-xl-6.col-lg-7.col-md-10.col-sm-15.col-20.ml-auto.ml-md-0.text-center > span').text();    
            let priceSell = $(e).find('div > div:nth-child(5) > span').text();
            priceArray.push({
                SERVER: gamesatisSERVER[i],
                GAMESATIS_ALIS: priceBuy,
                GAMESATIS_SATIS: priceSell
            })
        })
        resolve(priceArray);
    }).catch(function (e) {
    console.log(e);
    });
})

const bynogameGetir = () => new Promise((resolve, reject) => {
    axios.get(bynogameURL)
    .then((response) => {
        let $ = cheerio.load(response.data);
        for (let i = 1 ; i <= 9; i++) {
            let priceBuy = $(`div.col-md-18.order-1.order-sm-12 > div > div:nth-child(${i}) > div > div > div.col-md-21 > div > div:nth-child(4) > div > div:nth-child(2) > form > button`).text();
            let priceSell = $(`div.col-md-18.order-1.order-sm-12 > div > div:nth-child(${i}) > div > div > div.col-md-21 > div > div.col-md-4 > div > div > div > h3`).text();
            priceBuyFixed = priceBuy.replace(/[^\d.,-]/g,'');
            priceSellFixed = priceSell.replace(/[^\d.,-]/g,'');
            priceArray.push({
                SERVER: bynogameSERVER[i-1],
                BYNOGAME_ALIS: priceBuyFixed,
                BYNOGAME_SATIS: priceSellFixed
            })
        }
        resolve(priceArray);
    }).catch(function (e) {
    console.log(e);
    });
})

const klasgameGetir = () => new Promise((resolve, reject) => {
    axios.get(klasgameURL)
    .then((response) => {
        let $ = cheerio.load(response.data);
        $("tr[class^='object-item-']").each(function (i, e) {
            let priceBuy = $(e).find('td:nth-child(2) > span.font-weight-bold.price > span:nth-child(1)').text();    
            let priceSell = $(e).find('td:nth-child(3) > span.font-weight-bold.price > span:nth-child(1)').text();
            priceArray.push({
                SERVER: klasgameSERVER[i],
                KLASGAME_ALIS: priceBuy,
                KLASGAME_SATIS: priceSell
            })
        })
        resolve(priceArray);
    }).catch(function (e) {
    console.log(e);
    });
})

const kopazarGetir = () => new Promise((resolve, reject) => {
    axios.get(kopazarURL)
    .then((response) => {
        let $ = cheerio.load(response.data);
        for (let i = 1; i <= 9; i++) {
            let serverName = $(`#FormGold${i} > div > div > div > div.col-xl-3.col-lg-4.col-md-10.col-sm-6.col-9 > h2 > a > strong`).text();
            let priceBUY = $(`#FormGold${i} > div > div > div > div.col-xl-6.col-lg-4.col-md-9.col-12 > div > div.col-xl-3.col-lg-6.col-sm-3.col-6.order-1.xl-text-right.text-center > strong`).text();
            let priceSELL = $(`#FormGold${i} > div > div > div > div.col-xl-6.col-lg-4.col-md-9.col-12 > div > div.col-xl-3.col-lg-6.col-sm-3.col-6.order-xl-3.order-lg-2.order-sm-3.order-2.xl-text-right.text-center > strong`).text()
            priceBuyFixed = priceBUY.replace(/[^\d.,-]/g,'');
            priceSellFixed = priceSELL.replace(/[^\d.,-]/g,'');
            priceArray.push({
                SERVER: serverName,
                KOPAZAR_ALIS: priceBuyFixed,
                KOPAZAR_SATIS: priceSellFixed
            })
            resolve(priceArray);
        }
    }).catch(function (e) {
    console.log(e);
    });
})

const yesilyurtGetir = () => new Promise((resolve, reject) => {
    axios.get(yesilyurtURL)
    .then((response) => {
        let $ = cheerio.load(response.data);
        for (let i = 1; i <= 11; i++) {
            let priceBuy = $(`#content > div:nth-child(9) > div:nth-child(${i}) > div:nth-child(3)`).text();
            let priceSell= $(`#content > div:nth-child(9) > div:nth-child(${i}) > div:nth-child(4)`).text();
            priceBuyFixed = priceBuy.replace(/[^\d.,-]/g,'');
            priceSellFixed = priceSell.replace(/[^\d.,-]/g,'');
            if (response.status === 200 && priceBuyFixed != "" && priceSellFixed != "") {
                priceArray.push({
                    SERVER: yesilyurtSERVER[i-1],
                    YESILYURTGAME_ALIS: priceBuyFixed,
                    YESILYURTGAME_SATIS: priceSellFixed
                })
            }
            else {
                priceArray.push({
                    YESILYURTGAME_HATA: "YESILYURT VERI GELMEDI. TEKRAR DENEYİN.",
                })
            }
            resolve(priceArray);
        }
        
    }).catch(function (e) {
    console.log(e);
    });
})

app.get('/fiyat_Getir', (req, res) => {
    kopazarGetir().then((response) => {
        yesilyurtGetir().then((response) => {
            klasgameGetir().then((response) => {
                bynogameGetir().then((response) => {
                    gamesatisGetir().then((response) => {
                        res.send(response);
                    })
                    .finally(() => {
                        priceArray = [];
                    })
                })
            })
        })
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("API Aktif.", this.address().port, app.settings.env);
});
