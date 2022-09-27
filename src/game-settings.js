import { generateResult, getSettlementResult as settle, generateRawResultForHash } from "./helpers/result-helper";
import { getBetModel, getResultModel, getRoundModel } from "./models";
import { allGamesHistoriesModel } from "sc-multiple-games-base";

const choicesMapper = { even: 1, odd: 2, red3: 3, red4: 4, white3: 5, white4: 6 };
const choices = ["even", "odd", "red3", "red4", "white3", "white4"];
const hedgeBetGroups = [["even", "odd"]];
const gameNamePrefix = "MiniSeDie";
const allGamesBetsRepository = allGamesHistoriesModel("megakeno_histories");

const normalGameDurations = {
    wholeRound: 38,
    placingBets: 30,
    lockingBet: 5,
    shakeThePlateDuration: 2,
};

const extendGameDurations = {
    wholeRound: 43,
    placingBets: 35,
    lockingBet: 5,
    shakeThePlateDuration: 2,
};

const buildGameSettings = (gameId, gameName, overrideSettings = {}) => ({
    id: gameId,
    name: gameName,
    configName: gameName.toLowerCase(),
    repositories: {
        roundsRepository: getRoundModel(`${gameName.toLowerCase()}_round`),
        betsRepository: getBetModel(`${gameName.toLowerCase()}_bet`),
        resultsRepository: getResultModel(`${gameName.toLowerCase()}_result`),
        allGamesBetsRepository,
    },
    choices,
    hedgeBetGroups,
    choicesMapper,
    generateResult,
    settle,
    generateRawResultForHash,
    numberOfRoundHistory: 100,
    ...overrideSettings,
});

export default [
    buildGameSettings(9, gameNamePrefix, {
        repositories: {
            roundsRepository: getRoundModel(`${gameNamePrefix.toLowerCase()}_phien`),
            betsRepository: getBetModel(`${gameNamePrefix.toLowerCase()}_cuoc`),
            resultsRepository: getResultModel(`${gameNamePrefix.toLowerCase()}_results`),
            allGamesBetsRepository,
        },
        durations: normalGameDurations,
    }),
    buildGameSettings(56, `${gameNamePrefix}2`, {
        durations: normalGameDurations,
    }),
    buildGameSettings(57, `${gameNamePrefix}3`, {
        durations: extendGameDurations,
    }),
    buildGameSettings(58, `${gameNamePrefix}4`, {
        durations: extendGameDurations,
    }),
];
