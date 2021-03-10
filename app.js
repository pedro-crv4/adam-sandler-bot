const http = require('https');
const fs = require('fs');
const Twitter = require('twitter');
const Google = require('googleapis').google;
const customSearch = Google.customsearch('v1');

require('dotenv/config');

var photo;
var file = fs.createWriteStream("file.jpg");



const twitterCredentials = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

const googleCredentials = {
    apiKey: process.env.GOOGLE_API_KEY,
    searchEngineId: process.env.SEARCH_ENGINE_ID
}


const T = new Twitter(twitterCredentials);

// async function imageSearch() {

//     try {
//         const response = await customSearch.cse.list({
//             auth: googleCredentials.apiKey,
//             cx: googleCredentials.searchEngineId,
//             q: 'Adam Sandler',
//             searchType: 'image',
//             start: Math.floor(Math.random() * 10),
//             num: 10,
//         });

//         console.log(response.data.items[Math.floor(Math.random() * 10)].link);

//         return new Promise(function(resolve, reject){
//             var request = http.get(response.data.items[Math.floor(Math.random() * 10)].link, function(response) {
//                 response.pipe(file);
//                 response.on('close', function() {
//                     resolve();
//                 });
//                 response.on('end', function() {
//                     resolve();
//                 });
//                 response.on('finish', function() {
//                     resolve();
//                 });
//             })
//         });

//         var data = fs.readFileSync(`${__dirname}/file.jpg`);

//         return T.post('media/upload', { media: data });

//         console.log('Media uploaded');

//         var status = {
//             status: `Eu também gosto do Adam Sandler!`,
//             media_ids: media.media_id_string
//         }
    
//         return T.post('statuses/update', status);

//     } catch (err) {
//         console.log(err);
//     }

//     // console.log(response.data.items[Math.floor(Math.random() * 10)].link);
// }

// imageSearch();

var replyTweet = function() {
    var params = {
        q: 'Adam Sandler',
        result_type: 'recent',
        lang: 'pt'    
    }

    T.get('search/tweets', params, function(err, data) {
        if (!err) {
            let replyId = data.statuses[0].id_str;
            let username = data.statuses[0].user.screen_name;
            
            console.log(data.statuses[0].id);
            

            T.post('statuses/update', { 
                status: `@${username} eu gosto do Adam Sandler também!`,
                in_reply_to_status_id: replyId, 
                username: `@${username}`
            }, (err, data, response) => {
                console.log(data);
                console.log(response);
            });
        } else {
            console.log('Erro ao buscar tweets...');
        }
    });
}

replyTweet();

// var tweetPhoto = function() {
//     axios.get('https://api.unsplash.com/photos/random',{
//         params: {
//             query: 'cute cat'
//         }
//     }).then(function(response) {
//         photo = response.data;
//         return new Promise(function(resolve, reject){
//             var request = http.get(response.data.urls.regular + "&q=40&fit=crop", function(response) {
//                 response.pipe(file);
//                 response.on('close', function() {
//                     resolve();
//                 });
//                 response.on('end', function() {
//                     resolve();
//                 });
//                 response.on('finish', function() {
//                     resolve();
//                 });
//             })
//         })
//     }).then(() => {
//         var data = fs.readFileSync(`${__dirname}/file.jpg`);
    
//         return T.post('media/upload', { media: data })
//     }).then(media => {
//         console.log('Media uploaded');
    
//         var status = {
//             status: `credits to ${photo.user.name} at https://unsplash.com/@${photo.user.username} #cat #cats #cattwitter #gato #gatos #cute`,
//             media_ids: media.media_id_string
//         }
    
//         return T.post('statuses/update', status)
//     }).then(tweet => {
//         console.log(tweet);
//     }).catch(function(error) {
//         console.log(error);
//     });
// }
