const {connect} = require('mongoose');
require("dotenv").config()
module.exports = () => connect(`mongodb+srv://${process.env.MONGODB_PASSWORD}@cluster0.lkd0p.mongodb.net/validation-1?retryWrites=true&w=majority`)