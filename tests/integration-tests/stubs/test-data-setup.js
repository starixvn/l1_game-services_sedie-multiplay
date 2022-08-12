import mongoose from "mongoose";
import { users } from "sc-base-database";
import { middlewares } from "sc-common";
import {
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
    createCurrencyGroupGames,
    normalUser,
} from "sc-game-service-integration-utils";

import configs from "../../../src/app-configs.IGT";
import { getBetModel, getRoundModel } from "../../../src/models";
import { game, gameConfig, currencyData, rounds, userBetData } from "./test-data";

const connectDatabase = async () => {
    await middlewares.database.configureDatabase(mongoose, configs.database);
    await clearAllData();
};

const clearAllData = async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany();
    }
};

const createTestData = async () => {
    await connectDatabase();
    await createExchangeRate();
    await createGameConfig(gameConfig);
    const partnerConfig = await createPartnerConfig(game.id);
    const currency = await createDummyCurrency(partnerConfig.partnerId, currencyData.code, currencyData.name);
    await createCurrencyGroupGames(currency.groupId, game.id, {
        ...gameConfig,
        maxBetPerChoices: { big: gameConfig.maxbet, small: gameConfig.minbet },
    });
    await createDummyUsers(currency);
    await createRounds();
    await createUserBetData();

    console.log("Create game config & dummy user for testing successfully!");

    process.exit(0);
};

const getUserId = async (memberId) => {
    const user = await users.findOne({ "local.memberId": memberId }, { _id: true }).lean();
    return user._id.toString();
};

const createRounds = async () => {
    return getRoundModel("minisedie_phien").insertMany(rounds);
};

const createUserBetData = async () => {
    const userId = await getUserId(normalUser.memberId);
    const betData = userBetData(userId);
    return getBetModel("minisedie_cuoc").insertMany(betData);
};

createTestData();
