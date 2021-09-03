const gBuild = require('../../models/injection');

async function main(req, res, next){
    // const uri = MONGO_URL;
    // console.log('body',req.body.URI);
    try {
    await gBuild(req.body.URI,  res.locals.db_tables, res.locals.db_data);
           return next();
    } catch (e) {
        //console.error(e);
    } 
}

module.exports = main;