import awilix from "awilix";
import { MultipleGamesContainerRegistry } from "sc-multiple-games-base";
import PlaceBetConsumer from "./consumers/place-bet-consumer";
import { Bot, GameCron, SedieMultiplayProcessBetQueue } from "./crons";
import { SedieMultiplayHttpRouter, SedieMultiplaySocketRouter } from "./routers";
import { BetEventMetric } from "./metrics";
const { asClass, asValue } = awilix;

const oldGameId = 9;

export default class ContainerRegistry extends MultipleGamesContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.registerRepositories(definition.repositories);
        definition.id === oldGameId && this.registerOldGameRouters(definition);

        return this.container;
    }

    registerRepositories(repositories) {
        this.container.register({
            roundsRepository: asValue(repositories.roundsRepository),
            betsRepository: asValue(repositories.betsRepository),
            resultsRepository: asValue(repositories.resultsRepository),
            betLogsRepository: asValue(repositories.betLogsRepository),
            allGamesBetsRepository: asValue(repositories.allGamesBetsRepository),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            betEventMetric: asClass(BetEventMetric).singleton().proxy(),
        });

        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(SedieMultiplayProcessBetQueue).singleton().proxy(),
        });
    }

    registerOldGameRouters() {
        this.container.register({
            httpRouter: asClass(SedieMultiplayHttpRouter),
            socketRouter: asClass(SedieMultiplaySocketRouter).proxy(),
        });
    }
}
