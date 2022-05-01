const express = require('express');
const Jimp = require('jimp')

const bodyParser = require('body-parser')
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

/*
    Jimp.read(imgLink, async function (err, image) {
        console.log("Creating img now")
        if(err){
            console.log("ERROR")
            res.send("Invalid image")
        }
        if(color=='black'){
            var font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            var dateFont = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        }else{
            var font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            var dateFont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        }
        image
          .resize(360, 360) // resize
          .quality(60) // set JPEG quality
          .print(font, 10, 40, text, 360, (err, img, {x,y})=>{
            img.print(dateFont, 10, 300, time, 360)
            .write(`./public/draft/${userAddress}.png`); // save
            res.json('Create Img Success')

          })
    });
*/
})


//IMG PATH
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

