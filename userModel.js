let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let registrationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
});

let Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
