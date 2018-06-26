var mongoose = require("mongoose");

var eqipamientoSchema = mongoose.Schema({
    description: { type: String, required: true },
    defense: { type: Number, required: true },
    category: { type: String, required: true },
    weight: { type: Number, required: true }
});

eqipamientoSchema.pre("save", function(done) {
    var equip = this;
    if (!equip.isModified("weight")) {
        return done();
    }

});

eqipamientoSchema.methods.name = function() {
    return this.description || this.defense;
}

var equipamiento = mongoose.model("equipment", eqipamientoSchema);
module.exports = equipamiento;