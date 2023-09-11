var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
// const { parsed: config } = dotenv.config();
// deploy contract
const cors = require('cors');





const apiRoutes = require('./routes');
var User = require('./DB/models/user');
var jwt = require('jsonwebtoken');
// mongoose.connect(config.DB_HOST);

var app = express();

app.use(cors({
    origin: '*'
}));
// app.set('superSecret', config.SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, './web-client/build')));

app.get('/setup', function (req, res) {

    var usr = new User(
    {
        name:'tester',
        password:'tester',
        admin:false
    });

    usr.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
});

app.use('/api', apiRoutes);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/ankit";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

(async () => {
    try{
        const db = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        db.connection.db.dropDatabase();
        app.listen(5000,'0.0.0.0', () => console.log('Listening on port 5000'));
    }catch(e) {
        console.log(e);
    }
})();


// mongoose.connect('mongodb+srv://daiya1:daiya1@cluster0.z24hg1p.mongodb.net/ankit?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(5000, () => console.log(`App is Listening on PORT:5000`)))
//     .catch((error) => console.log(error))

// app.listen(process.env.PORT || 8080, function () {
//     console.log('Example app listening on port 8080!')
// });

