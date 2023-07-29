const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type:Number, default:0 },
});

// tell mongoose to create/update the schema. 'user' is the name
mongoose.model('users', userSchema);