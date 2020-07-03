const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');


module.exports.init = async ({ expressApp, dbUrl }) => {
    const mongoConnection = await mongooseLoader({ dbUrl: dbUrl });
    if (mongoConnection)
        console.log('[+] Connected MongoDB');
    else
        return false;
    await expressLoader({ app: expressApp });
    console.log('[+] Express Initialized');
    return true;

}