const Jimp = require('Jimp')


module.exports = {
    createImg: async function(params){
        Jimp.read(params.baseImg, async function (err, image) {
            var font = await Jimp.loadFont(params.color=='black' ? Jimp.FONT_SANS_32_BLACK : Jimp.FONT_SANS_32_WHITE);
            var dateFont = await Jimp.loadFont(dateFontColor = params.color=='black' ? Jimp.FONT_SANS_16_BLACK : Jimp.FONT_SANS_16_WHITE);
            await image
              .resize(360, 360) // resize
              .quality(60) // set JPEG quality
              .print(font, 10, 40, params.msg, 360, (err, img, {x,y})=>{
                img.print(dateFont, 10, 300, params.time, 360)
                .write(`./public/draft/${params.userAddress}.png`); // save
              })
            }) 
            return "success"
    }
}
