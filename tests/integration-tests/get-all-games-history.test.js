import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

describe("getAllGamesHistoryTests", () => {
    let driver;

    beforeAll(async () => {
        driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await driver.handleSignedInEvent();
        driver.sendInGameEvent();
        await driver.handleGameEvent((inGameData) => inGameData.remainingTime);
    });

    afterAll(() => {
        driver.close();
    });

    it("should receive history from all games", async () => {
        //normalUserClientDriver.socket.emit("getAllGamesHistory", { page: 1 });

        // Act
        driver.sendGetHistoryEvent();
        const result = await driver.handleGameEvent((historyData) => historyData.history);

        // Assert
        expect(result.history.total).toBeGreaterThan(0);
        expect(result.history.page).toBe(1);
        expect(result.history.pageSize).toBe(8);
        expect(result.history.betLogs.length).not.toBe(0);
    });
});
