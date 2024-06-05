import { MultipleGamesSocketRouter } from "sc-multiple-games-base";

export class SedieMultiplaySocketRouter extends MultipleGamesSocketRouter {
    init(socketClient) {
        super.init(socketClient);

        this.socketClient.on("ping", (callback) => {
            callback();
        });
    }
}
