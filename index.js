const express = require('express');
const Jimp = require('jimp')

const bodyParser = require('body-parser')



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

app.get('/search/:msg', async (req,res)=>{
    console.log(req.params.msg)
    console.log("HI")
    res.send("hi")
})

app.post('/createImg', async(req,res)=>{
    console.log("Called API for create Img", req.body.message)
    const [text, imgLink, userAddress, time, color] = [req.body.message, req.body.baseImg, req.body.userAddress, req.body.time, req.body.color]

    console.log(req.body.message.split('\n'))

    //const message = text.concat('\n', time)



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
            image.print(dateFont, 10, 300, time, 360)
            .write(`./public/draft/${userAddress}.png`); // save
            res.json('Create Img Success')

          })



    });

})

app.get('/draft/:address', (req,res)=>{
    console.log("draft called")
    res.sendFile(__dirname + '/public/draft/'+ req.params.address);
})
app.get('/nft/:tokenId', (req,res)=>{
    res.sendFile(`./public/nft/${req.params.tokenId}`);
})

app.listen(port, ()=>{
    console.log("Listening to port", port)
})

