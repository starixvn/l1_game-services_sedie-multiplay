import { errorUser, GameClientDriver, internalServerErrorUser, normalUser } from "sc-game-service-integration-utils";

import gameSettings from "../../src/game-settings";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

describe("when user place bet", () => {
    let driver;
    describe("when place bet successful", () => {
        beforeAll(async (done) => {
            driver = await initDriverAndPlaceBet(normalUser);
            done();
        });

        afterAll(() => {
            driver.close();
        });

        it("should return current user ticket result", (done) => {
            const expectedEndBetResponse = {
                ownBets: { odd: 100 },
                endBet: 100,
                betChoice: "odd",
                freeBet: false,
                user: { maxBet: 2000, minBet: 1, red: 24250, scoins: 0 },
            };

            // Assert
            driver.handleEndBetEvent((endBetData) => {
                if (endBetData.endBet) {
                    expect(endBetData).toStrictEqual(expectedEndBetResponse);
                    done();
                }
            });
        });
    });

    describe("when API has internal server error", () => {
        beforeAll(async (done) => {
            driver = await initDriverAndPlaceBet(internalServerErrorUser);
            done();
        });

        afterAll(() => {
            driver.close();
        });

        it("should return api error to client", () => {
            // Assert
            driver.handleEndBetEvent((endBetData) => {
                console.log(endBetData);
                if (endBetData.endBet === -1) {
                    expect(endBetData.apiError.isPlaceBetFailed).toEqual(true);
                    done();
                }
            });
        });
    });

    describe("When API response error", () => {
        beforeAll(async (done) => {
            driver = await initDriverAndPlaceBet(errorUser);
            done();
        });

        afterAll(() => {
            driver.close();
        });

        it("should return api error to client", () => {
            // Assert
            driver.handleEndBetEvent((endBetData) => {
                if (endBetData.endBet === -1) {
                    expect(endBetData.betChoice).toEqual("odd");
                    expect(endBetData.apiError.errorCode).toEqual("SB1900");
                    expect(endBetData.apiError.isPlaceBetFailed).toEqual(true);
                    done();
                }
            });
        });
    });

    afterEach(() => {
        driver.socket.removeAllListeners(socketOptions.gameName);
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

    return new Promise((resolve, reject) => {
        let receivedRemainingTime = false;
        const driver = new GameClientDriver(socketOptions, initUserSession(user));
        driver.handleSignedInEvent(() => {
            driver.sendInGameEvent();
        });
        driver.handleInGameEvent((inGameData) => {
            if (!receivedRemainingTime && inGameData.remainingTime) {
                receivedRemainingTime = true;
                setTimeout(() => {
                    driver.sendBetEvent(betChoice, amount);
                }, getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                resolve(driver);
            }
        });
    });
};
