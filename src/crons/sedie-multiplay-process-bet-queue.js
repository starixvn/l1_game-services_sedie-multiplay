import { Core } from "sc-game-base";

export default class SedieMultiplayProcessBetQueue extends Core.Crons.ProcessBetQueue {
    constructor({
        definition,
        gameData,
        placeBetPublisher,
        placeBet,
        logService,
        betsRepository,
        betLogsRepository,
        userInfosRepository,
        baseMetrics,
        betEventMetric,
    }) {
        super({
            definition,
            gameData,
            placeBetPublisher,
            placeBet,
            logService,
            betsRepository,
            betLogsRepository,
            userInfosRepository,
            baseMetrics,
        });

        this.betEventMetric = betEventMetric;
    }

    async proceedBet(player, payload) {
        this.betEventMetric.collectEventLatency(payload);

        return super.proceedBet(player, payload);
    }
}
