const express = require('express');
const Jimp = require('jimp')

const bodyParser = require('body-parser')
const fs = require('fs');

var jsonTools = require('./json-tools')
const imgTools = require('./img-tools')
const delay = ms => new Promise(res => setTimeout(res, ms));


require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
const res = require('express/lib/response');
app.use(cors())
//app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json({extended: true }));

app.post('/createImg', async(req,res)=>{

    let createImgParams= {
        msg: req.body.message,
        baseImg: req.body.baseImg,
        time: req.body.time,
        userAddress:req.body.userAddress,
        color: req.body.color
    }

    const createdImage = await imgTools.createImg(createImgParams, async result=>{
        if(result=="Success"){
            await delay(500);//Delay ensures that frontend will query the image after its updated
            res.json("Success")
        }else{
            res.json("Error")
        }
    })



})

app.post('/createImgPath', async(req,res)=>{
    let userAddress = req.body.userAddress
    let msg = req.body.msg
    let alphaNumId = req.body.randomNumber
        //Check if the filepath exists
        if (!fs.existsSync(`./public/nft${alphaNumId}.png`)) {
            //Count number of pics to get tokenId
            jsonTools.totalAmountOfTokens(tokenId=>{
                fs.copyFile(`./public/draft/${userAddress}.png`, `./public/img/${alphaNumId}.png`, (err) => {
                    if (err) {console.log(err)};
                    jsonTools.addTokenToJson(userAddress,msg,alphaNumId)
                    res.json(tokenId)
                    //res.redirect(`https://testnets.opensea.io/assets/rinkeby/${process.env.CONTRACT_ADDRESS}/${tokenId}`)
                    //res.redirect(`https://testnets.opensea.io/assets/rinkeby/0x8f43b4df5123e59b3932c161a87a90c3a5a2dddb/${tokenId}`)
                });
            })
        }else{
            res.json("tokenId exists")
        }
})

app.get('/draft/:address', async (req,res)=>{
    res.sendFile(__dirname + '/public/draft/'+ req.params.address);
})
app.get('/nft/:tokenId', (req,res)=>{
    jsonTools.getMetaData(req.params.tokenId, (result)=>{
        res.send(result)
    })
})

app.get('/img/:tokenId', (req,res)=>{
    res.sendFile(__dirname+`/public/img/${req.params.tokenId}.png`);
})

app.listen(port, ()=>{
    console.log("Listening to port", port)
})

