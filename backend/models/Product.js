const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
});

module.exports = mongoose.model('Product', productSchema);
