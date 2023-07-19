const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// tell mongoose to create/update the schema. 'user' is the name
mongoose.model('users', userSchema);