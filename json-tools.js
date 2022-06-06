fs = require('fs');
dataDir = './public/data'

var galleryFileName = dataDir + '/gallery.json';


module.exports = {
    getMetaData: function(tokenStringId, callback){

        const file = JSON.parse(fs.readFileSync(`${dataDir}/nft/${tokenStringId}.json`).toString());
        callback(file)
    },
    totalAmountOfTokens: function(callback){

        var gallery = JSON.parse(fs.readFileSync(galleryFileName).toString());
        gallery.tokens.length
        const returnable = gallery.tokens.length
        callback(returnable);
    },
    addTokenToJson: function(owner, msg, alphaNumId){
        console.log("addtokentoJson")
        this.totalAmountOfTokens(tokenId => {
            newTokenObject = {}
            newTokenObject.tokenId = tokenId
            newTokenObject.alphaNumId = alphaNumId
            newTokenObject.owner=owner
            newTokenObject.description=msg
            newTokenObject.image = `https://blockchainstories.xyz/api/img/${alphaNumId}`
            newTokenObject.attributes=[
                {
                    "trait_type": "Date", 
                    "value": new Date().toDateString() 
                  }, 
                  {
                    "trait_type": "Message", 
                    "value": msg
                  }
            ]
            fs.writeFileSync(`${dataDir}/nft/${alphaNumId}.json`, JSON.stringify(newTokenObject))
            var gallery = JSON.parse(fs.readFileSync(`${dataDir}/gallery.json`).toString());
            gallery.tokens.push(newTokenObject)

            fs.writeFileSync(`${dataDir}/gallery.json`, JSON.stringify(gallery))
        })

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