import { generateResult, getSettlementResult as settle, generateRawResultForHash } from "./helpers/result-helper";
import { getBetModel, getResultModel, getRoundModel } from "./models";

const choicesMapper = { even: 1, odd: 2, red3: 3, red4: 4, white3: 5, white4: 6 };
const choices = ["even", "odd", "red3", "red4", "white3", "white4"];
const hedgeBetGroups = [["even", "odd"]];

const gameSettings = {
    durations: {
        wholeRound: 38,
        placingBets: 30,
        lockingBet: 5,
        shakeThePlateDuration: 2,
    },
    choices,
    hedgeBetGroups,
    choicesMapper,
    generateResult,
    settle,
    generateRawResultForHash,
    numberOfRoundHistory: 102,
};

export default [
    {
        ...gameSettings,
        id: 9,
        name: "MiniSeDie",
        configName: "minisedie",
        repositories: {
            roundsRepository: getRoundModel("minisedie_phien"),
            betsRepository: getBetModel("minisedie_cuoc"),
            resultsRepository: getResultModel("minisedie_results"),
        },
    },
    {
        ...gameSettings,
        id: 56,
        name: "MiniSeDie2",
        configName: "minisedie2",
        repositories: {
            roundsRepository: getRoundModel("minisedie2_round"),
            betsRepository: getBetModel("minisedie2_bet"),
            resultsRepository: getResultModel("minisedie2_result"),
        },
    },
    {
        ...gameSettings,
        id: 57,
        name: "MiniSeDie3",
        configName: "minisedie3",
        repositories: {
            roundsRepository: getRoundModel("minisedie3_round"),
            betsRepository: getBetModel("minisedie3_bet"),
            resultsRepository: getResultModel("minisedie3_result"),
        },
    },
    {
        ...gameSettings,
        id: 58,
        name: "MiniSeDie4",
        configName: "minisedie4",
        repositories: {
            roundsRepository: getRoundModel("minisedie4_round"),
            betsRepository: getBetModel("minisedie4_bet"),
            resultsRepository: getResultModel("minisedie4_result"),
        },
    },
];
