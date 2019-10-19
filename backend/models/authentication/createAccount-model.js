const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createAccountSchema = new schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: false
    },
    uniqueURIcomponent: {
        type: String,
        required: true,
        unique: true
    }
});

const CreateAccount = mongoose.model('createAccount', createAccountSchema);
module.exports = CreateAccount;

// sign up -> unique link -> (email + link verification) -> successful sign up -> delete schema 