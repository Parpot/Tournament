const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Preposito: Criar a tabela user com cada campo
 * Falta discutir quais os campos para armazenar na base de dados.
 */
const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Password:{
        type: String,
        required: true,
    },
    Role:{
        type: Number,
        required:true,
        default: 1
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;