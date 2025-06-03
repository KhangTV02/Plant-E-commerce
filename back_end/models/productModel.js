const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    plantName: { type: String, required: true },
    scientificName: { type: String, required: true },
    category : [String],
    plantImage: [{ type: String, required: true }],
     description : String,
    price: { type: Number, required: true, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    isDeleted: { type: Boolean, default: false }
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel