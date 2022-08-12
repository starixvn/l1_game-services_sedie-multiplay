import { Core } from "sc-game-base";
import mongoose from "mongoose";

export default (modelName) => mongoose.model(modelName, Core.Models.ResultSchema);
