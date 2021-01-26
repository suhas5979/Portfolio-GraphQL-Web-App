const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./models/Comment');
require('./services/passport');
const { graphqlHTTP } = require('express-graphql');
const cookieSession = require('cookie-session');
const schema = require('./schema/schema');

// mongoDB setup 
mongoose.connect(keys.mongoDB.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log("connected to mongo instance"));
mongoose.connection.on('error', (err) => console.log("something went wrong with mongo instance", err));


const app = express();

app.use( cookieSession({
    keys:['sfdsfsfsdfssdf'],
    maxAge: 24*30*60*60*1000
}))
app.use(passport.initialize());
app.use(passport.session());
// auth routes for authentication services
require('./routes/authRoutes')(app);


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));