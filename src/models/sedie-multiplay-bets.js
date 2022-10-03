import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },

    even: { type: Number, default: 0 },
    odd: { type: Number, default: 0 },
    red3: { type: Number, default: 0 },
    red4: { type: Number, default: 0 },
    white3: { type: Number, default: 0 },
    white4: { type: Number, default: 0 },

    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },

    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
});

export default (modelName) => mongoose.model(modelName, schema);
