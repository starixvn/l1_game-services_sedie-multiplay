import awilix from "awilix";
import { MultipleGamesContainerRegistry } from "sc-multiple-games-base";
import PlaceBetConsumer from "./consumers/place-bet-consumer";
import Bot from "./crons/bot";
import GameCron from "./crons/game-cron";
import { SedieMultiplayHttpRouter } from "./routers/sedie-multiplay-http-routers";
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
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
        });
    }

    registerOldGameRouters() {
        this.container.register({
            httpRouter: asClass(SedieMultiplayHttpRouter),
        });
    }
}
