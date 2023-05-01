const { Onfido, Region } = require("@onfido/api");




const onfido = new Onfido({
    apiToken: "api_sandbox.n5lXjksXIRs.gk7Fl8osPOBDYR509p2Vu9-eTEIX-kM6",
    // Supports Region.EU, Region.US and Region.CA
    region: Region.EU,
});


module.exports = {
    onfido: onfido
}