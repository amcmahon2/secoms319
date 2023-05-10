const mongoose = require('mongoose')
const ReactFormDataSchema = new mongoose.Schema({
    title: {type: String},
  dueDate: {
    day: {type: Number},
    month: {type: Number},
    year: {type: Number}
},
    description: {type: String},
    category: {type: String},
    color: {type: String} //hex color value
} ,
{ collection: "tasks" }
)
const Product = mongoose.model('Task', ReactFormDataSchema)
module.exports = Product