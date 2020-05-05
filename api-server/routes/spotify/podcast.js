let express = require('express');
let router = express.Router();
const https = require('https');
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


router.get('/byid', (req, res1) => {

    // let url = "https://open.spotify.com/episode/4K2oUl8LQ4qMth0nJxnhrI";
    // https.get(url, res => {
    //     let html = '';
    //     res.on('data', line => html += line);
    //     res.on('end', () => {
    //         const dom = new JSDOM(html);
    //         // console.log(html);
    //         console.log(dom.window.document.querySelector('#main-header').textContent);
    //
    //     });
    // });


    //
    // request('https://open.spotify.com/episode/4K2oUl8LQ4qMth0nJxnhrI', (e, response, body) => {
    //     if (e) {
    //         console.error(e)
    //         res.send('error')
    //     }
    //
    //     try {
    //         var document = jsdom.jsdom(body)
    //         console.log(document.getElementById('main').innerHTML);
    //
    //     } catch (e) {
    //         console.error(e)
    //         res.send('error')
    //     }
    // })



});


module.exports = router;
