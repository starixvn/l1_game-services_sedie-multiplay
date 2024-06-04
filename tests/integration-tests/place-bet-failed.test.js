import { errorUser, GameClientDriver, internalServerErrorUser } from "sc-game-service-integration-utils";

import gameSettings from "../../src/game-settings";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

describe("USER failed to place a bet", () => {
    let driver;

    describe("WHEN API has internal server error", () => {
        beforeAll(async () => {
            driver = await initDriverAndPlaceBet(internalServerErrorUser);
        });

        afterAll(() => {
            driver.close();
        });

        it("THEN return api error to client", async () => {
            // Act
            const result = await driver.handleGameEvent((data) => data.endBet);

            // Assert
            expect(result.apiError.isPlaceBetFailed).toEqual(true);
        });
    });

    describe("WHEN API response error", () => {
        beforeAll(async () => {
            driver = await initDriverAndPlaceBet(errorUser);
        });

        afterAll(() => {
            driver.close();
        });

        it("THEN return api error to client", async () => {
            // Act
            const result = await driver.handleGameEvent((data) => data.endBet);

            // Assert
            expect(result.betChoice).toEqual("odd");
            expect(result.apiError.errorCode).toEqual(3002);
            expect(result.apiError.isPlaceBetFailed).toEqual(true);
        });
    });
});

const getTimeOutToBet = (remainingTime, durations) => {
    let timeout = 0;
    if (remainingTime <= durations.lockingBet) {
        timeout = durations.wholeRound - durations.placingBets + remainingTime + 5;
    } else if (remainingTime > durations.placingBets) {
        timeout = durations.wholeRound - durations.placingBets + 5;
    }

    return timeout;
};

const initDriverAndPlaceBet = (user) => {
    const betChoice = "odd";
    const amount = 100;

    return new Promise(async (resolve, reject) => {
        const driver = new GameClientDriver(socketOptions, initUserSession(user));
        await driver.handleSignedInEvent();
        await driver.sendInGameEvent();

        const { remainingTime } = await driver.handleGameEvent((inGameData) => inGameData.remainingTime);

        setTimeout(() => {
            driver.sendBetEvent(betChoice, amount);
        }, getTimeOutToBet(remainingTime, gameSettings[0].durations) * 1000);
        resolve(driver);
    });
};
