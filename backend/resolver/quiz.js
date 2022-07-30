var request = require('request');

module.exports = {
    getQuizes: async () => {
        let a = await (new Promise((resolve, reject) => {
            request(`https://quizapi.io/api/v1/questions?apiKey=${process.env.QUIZAPI_TOKEN}&limit=5`, function(error, response, body) {
                console.log(response.body);
                resolve(response.body);
            });    
        }))
        return a
        
    },

    // getQuestion: (quizes, index) => {
    //     const quiz = quizes[index];
        
    //     return 'Hello world!';
    // },
};
