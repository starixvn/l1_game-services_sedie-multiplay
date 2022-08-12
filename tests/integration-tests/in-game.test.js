import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

jest.setTimeout(10000);

describe("when user join game", () => {
    let driver;
    beforeAll((done) => {
        driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        driver.handleSignedInEvent(() => {
            done();
        });
    });

    afterAll(() => {
        driver.close();
    });

    afterEach(() => {
        driver.socket.removeAllListeners(socketOptions.gameName);
    });

    const expectedUser = {
        UID: 1,
        avatarId: 1,
        currency: "$US",
        name: "NormalUser",
        rate: 1,
        red: 25000,
        type: false,
    };

    it("should return game configuration odds", (done) => {
        // Act
        driver.sendInGameEvent();

        // Assert
        driver.handleInGameEvent((inGameData) => {
            console.log(inGameData);
            if (inGameData?.gameConfigs) {
                expect(inGameData.gameConfigs.odds).toStrictEqual({
                    odd: 1.96,
                    even: 1.96,
                    red3: 3.75,
                    red4: 14.4,
                    white3: 3.75,
                    white4: 14.4,
                });

                done();
            }
        });
    });

    it("should return user information", (done) => {
        // Act
        driver.sendInGameEvent();

        // Assert
        driver.handleInGameEvent((inGameData) => {
            if (inGameData?.user?.UID) {
                expect(inGameData.user).toStrictEqual(expectedUser);
                done();
            }
        });
    });

    it("should return round history", (done) => {
        // Act
        driver.sendInGameEvent();

        // Assert
        driver.handleInGameEvent((inGameData) => {
            if (inGameData?.roundHistory) {
                expect(inGameData.roundHistory).not.toBeEmpty();
                done();
            }
        });
    });
});
