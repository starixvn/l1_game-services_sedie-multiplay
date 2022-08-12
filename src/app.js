import { GameDefinition } from "sc-multiple-games-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import MiniSedieMultiplayApp from "./mini-sedie-multiplay-app";

const run = async () => {
    const definitions = gameSettings.map((gameSetting) => new GameDefinition(gameSetting));
    const app = new MiniSedieMultiplayApp("Mini Sedie Multiplay", appConfigs);
    await app.run();
    app.startGames(definitions);
};

run();
