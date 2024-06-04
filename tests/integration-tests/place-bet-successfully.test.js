import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("User successfully place a bet", () => {
    const betChoice = "odd";
    const oppositeBetChoice = "even";
    const amount = 100;
    let driver;

    beforeAll(async () => {
        driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await driver.handleSignedInEvent();
    });

    afterAll(() => {
        driver.close();
    });

    describe(`WHEN user place a bet on ${betChoice}`, () => {
        it("THEN user receive endBet with approriate amount", async () => {
            // Arrange
            driver.sendInGameEvent();
            await new Promise((r) => setTimeout(r, 13000));

            // Act
            driver.sendBetEvent(betChoice, amount);
            const result = await driver.handleGameEvent((data) => data.endBet);

            // Assert
            expect(result.endBet).toStrictEqual(amount);
            expect(result.betChoice).toBe(betChoice);
        });

        it(`AND user bet to opposite choice ${oppositeBetChoice}, system should return hedge bet error `, async () => {
            // Act
            driver.sendBetEvent(oppositeBetChoice, amount);
            const result = await driver.handleGameEvent((data) => data.endBet);

            // Assert
            expect(result.endBet).toEqual(-1);
            expect(result.betChoice).toEqual(oppositeBetChoice);
            expect(result.notice.errorCode).toEqual("SB1939");
        });
    });

    describe("THEN the round is end", () => {
        it("user should receive settlement result", async () => {
            // Act
            driver.sendBetEvent(oppositeBetChoice, amount);
            const result = await driver.handleGameEvent((data) => data.finish);

            // Assert
            expect(result.finish.result).not.toBeNull();
            expect(result.finish.settlementResult).not.toBeNull();
        }, 40000);
    });

    describe("THEN user able to get bet history", () => {
        it("should receive bet history", async () => {
            // Act
            driver.sendGetHistoryEvent();
            const result = await driver.handleGameEvent((historyData) => historyData.history);

            // Assert
            expect(result.history.total).toBe(3);
            expect(result.history.betLogs).toBeArrayOfSize(3);
            expect(result.history.betLogs.filter((bet) => bet[betChoice] === amount)).toBeArrayOfSize(1);
        });
    });
});
