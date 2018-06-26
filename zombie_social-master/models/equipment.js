var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var equipSchema = mongoose.Schema({
    description: { type: String, required: true },
    defense: { type: Number, required: true },
    category: { type: String, },
    weight: { type: Number, },

});


var donothing = () => {

}

equipSchema.pre("save", function(done) {
    var equip = this;
    if (!equip.isModified("weight")) {
        return done();
    }

});
equipSchema.methods.name = function() {
    return this.description || this.defense;
}

var Equip = mongoose.model("Equipment", equipSchema);
module.exports = Equip;