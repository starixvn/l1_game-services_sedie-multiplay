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

process.on("SIGINT", () => {
    console.log("Intercepted SIGINT on parent");

    delay(50000).then(() => {
        // Kill/handle your child processes here
        console.log("EXIT SIGINT on parent");

        process.exit(0); // Then exit the main process
    });
});

process.on("SIGHUP", () => {
    console.log("Intercepted SIGHUP on parent");

    delay(50000).then(() => {
        // Kill/handle your child processes here
        console.log("EXIT SIGHUP on parent");

        process.exit(0); // Then exit the main process
    });
});

process.on("SIGTERM", () => {
    console.log("Intercepted SIGTERM on parent");

    delay(50000).then(() => {
        // Kill/handle your child processes here
        console.log("EXIT SIGTERM on parent");

        process.exit(0); // Then exit the main process
    });
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
