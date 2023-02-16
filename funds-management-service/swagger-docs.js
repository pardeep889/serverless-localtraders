const fs = require('fs');
const data = fs.readFileSync('./swaggerdocs.json');

module.exports.handler = async (request) => {
 
    const jsonData = JSON.parse(data);
    return {
        statusCode: 200,
        body: JSON.stringify(jsonData),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};
