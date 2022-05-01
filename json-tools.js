fs = require('fs');
dataDir = './public/data/'

var templateFileName = dataDir + 'template.json';
var template = JSON.parse(fs.readFileSync(templateFileName).toString());

var galleryFileName = dataDir + 'gallery.json';


module.exports = {
    totalAmountOfTokens: function(){
        fs.readdir(dataDir+'nft', (err, files) => {
            return(files.length);
            });

    },
    readGallery: async function(){
        var gallery = JSON.parse(fs.readFileSync(galleryFileName).toString());
        return gallery.tokens
    },
    mintToken: function(tokenId, owner, msg, imgPath){
            newTokenObject = template
            newTokenObject.tokenId = tokenId
            newTokenObject.owner=owner
            newTokenObject.msg=msg
            fs.writeFileSync(`${dataDir}${tokenId}.json`, JSON.stringify(newTokenObject))
    },
    transferOwner: function(tokenId, oldOwner, newOwner) {
        var oldTokenObject = JSON.parse(fs.readFileSync(`${tokenId}.json`).toString());
        if (oldTokenObject.currentOwner == oldOwner){
            const newTokenObject = oldTokenObject
            newTokenObject.currentOwner = newOwner
            newTokenObject.transferHistory.push(
                {
                    "oldOwner":oldOwner,
                    "newOwner":newOwner,
                    "time": new Date()
                }
            )
            fs.writeFileSync(`${tokenId}.json`, JSON.stringify(newTokenObject))
        }
    },
    updateMessage: function(){

    }
 
}