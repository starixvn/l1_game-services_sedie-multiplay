import mongoose from "mongoose";
import { users } from "sc-base-database";
import { middlewares } from "sc-common";
import {
    createCurrencyGroupGames,
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
    normalUser,
} from "sc-game-service-integration-utils";

import configs from "../../../src/app-configs.IGT";
import { getBetModel, getRoundModel } from "../../../src/models";
import { currencyData, game, gameConfig, rounds, userBetData } from "./test-data";

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

const createViews = async () => {
    await mongoose.connection.db.createCollection("minisedie_histories", {
        viewOn: "users",
        pipeline: [
            {
                $project: {
                    _id: 0,
                    playerId: { $toString: "$local.memberId" },
                    operatorId: "$local.operatorId"
                },
            },
            {
                $lookup: {
                    from: "minisedie_cuocs",
                    let: {
                        playerId: "$playerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "minisedie_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 9,
                                },
                            },
                        },
                    ],
                    as: "minisedie",
                },
            },
            {
                $lookup: {
                    from: "minisedie2_bets",
                    let: {
                        playerId: "$playerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "minisedie_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 56,
                                },
                            },
                        },
                    ],
                    as: "minisedie2",
                },
            },
            {
                $lookup: {
                    from: "minisedie3_bets",
                    let: {
                        playerId: "$playerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "minisedie_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 57,
                                },
                            },
                        },
                    ],
                    as: "minisedie3",
                },
            },
            {
                $lookup: {
                    from: "minisedie3_bets",
                    let: {
                        playerId: "$playerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "minisedie_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 57,
                                },
                            },
                        },
                    ],
                    as: "minisedie3",
                },
            },
            {
                $lookup: {
                    from: "minisedie4_bets",
                    let: {
                        playerId: "$playerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$paid", true],
                                        },
                                        {
                                            $eq: ["$playerId", "$$playerId"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "minisedie4_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        {
                            $unwind: "$round",
                        },
                        {
                            $set: {
                                gameId: {
                                    $literal: 58,
                                },
                            },
                        },
                    ],
                    as: "minisedie4",
                },
            },
            {
                $set: {
                    minisedie: "$$REMOVE",
                    minisedie2: "$$REMOVE",
                    minisedie3: "$$REMOVE",
                    minisedie4: "$$REMOVE",
                    bet: {
                        $concatArrays: ["$minisedie", "$minisedie2", "$minisedie3", "$minisedie4"],
                    },
                },
            },
            { $unwind: "$bet" },
        ],
    });
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
    await createViews();

    console.log("Create game config & dummy user for testing successfully!");

    process.exit(0);
};

const getUserId = async (playerId) => {
    const user = await users.findOne({ "local.playerId": playerId }, { _id: true }).lean();
    return user._id.toString();
};

const createRounds = async () => {
    return getRoundModel("minisedie_phien").insertMany(rounds);
};

const createUserBetData = async () => {
    const userId = await getUserId(normalUser.playerId);
    const betData = userBetData(userId);
    return getBetModel("minisedie_cuoc").insertMany(betData);
};

createTestData();
