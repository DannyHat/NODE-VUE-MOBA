const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	url: { type: String}
})

module.exports = mongoose.model('Item', schema)