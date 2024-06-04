import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("User able to join game", () => {
    let driver;

    beforeAll(async () => {
        driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await driver.handleSignedInEvent();
    });

    afterAll(() => {
        driver.close();
    });

    describe("GIVEN user join game", () => {
        it("should receive game configs when ingame", async () => {
            // Arrange
            const expectedOdds = { even: 1.96, odd: 1.96, red3: 3.75, red4: 14.4, white3: 3.75, white4: 14.4 };
            driver.sendInGameEvent();

            // Act
            const result = await driver.handleGameEvent((inGameData) => inGameData.gameConfigs);

            // Assert
            expect(result.gameConfigs.odds).toStrictEqual(expectedOdds);
            expect(result.roundHistory).toBeArrayOfSize(2);
        });
    });
});
