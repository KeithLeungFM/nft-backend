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



app.get('/', async (req,res)=>{
    console.log("HI")
    res.send("hi")
})

app.get('/test', async (req,res)=>{

    let createImgParams= {
        msg: "message",
        baseImg:"https://images.unsplash.com/photo-1650351858876-eec34590260c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        time: new Date().toDateString(),
        userAddress:"Address",
        color:"white"
    }
    imgTools.createImg(createImgParams)
})

app.get('/new', async(req,res)=>{
    //Return newest listings ie the OLDEST JSONS
})

app.post('/search', async(req,res)=>{
    //Return listing based on param DATE, MSG
    const searchParams = req.body //.date .msg

})

app.post('/gallery', async(req,res)=>{
    //
    const galleryParams = req.body // .startToken, .numberOfTokens

    let result = await jsonTools.readGallery()
    res.json(result)


})

app.post('/createImg', async(req,res)=>{
    console.log("createi mg casllsed")

    let createImgParams= {
        msg: req.body.message,
        baseImg: req.body.baseImg,
        time: req.body.time,
        userAddress:req.body.userAddress,
        color: req.body.color
    }
    console.log(createImgParams.msg)
    await imgTools.createImg(createImgParams)
    await delay(500);//Delay ensures that frontend will query the image after its updated
    res.json("Create Img Success")
})

app.post('/createImgPath', async(req,res)=>{
    let userAddress = req.body.userAddress
    let randomNumber = req.body.randomNumber
    try {
        //Check if the filepath exists
        if (!fs.existsSync(`./public/nft${randomNumber}.png`)) {
            console.log("GOT HERE")
            //Count number of pics to get tokenId
            fs.readdir("./public/nft", (err, files) => {
                let tokenId = files.length -1
                fs.copyFile(`./public/draft/${userAddress}.png`, `./public/nft/${randomNumber}.png`, (err) => {
                    if (err) {console.log(err)};
                    res.json(tokenId)
                  });
              });
        }else{
            res.json("tokenId path exists")
        }
      } catch(err) {
        console.error(err)
      }



})


app.post('/withdraw', async(req,res)=>{
    
})

app.get('/draft/:address', async (req,res)=>{
    console.log("draft called")
    res.sendFile(__dirname + '/public/draft/'+ req.params.address);
})
app.get('/nft/:tokenId', (req,res)=>{
    res.sendFile(__dirname+`/public/nft/${req.params.tokenId}.png`);
})

app.listen(port, ()=>{
    console.log("Listening to port", port)
})

