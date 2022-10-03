import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";
import crypto from "crypto";

describe("Verify MD5", () => {
    let normalUserClientDriver;
    let md5HashValue = "";

    beforeAll(() => {
        normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
    });

    afterAll(() => {
        normalUserClientDriver.close();
    });

    beforeEach(() => {
        normalUserClientDriver.off(normalUserClientDriver.gameName);
    });

    describe("WHEN user join game", () => {
        it("THEN user should receive MD5 hash value", (done) => {
            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.resultHash?.hashValue) {
                    md5HashValue = inGameData.resultHash.hashValue;
                    expect(md5HashValue).not.toBeUndefined();

                    done();
                }
            });
        });

        describe("WHEN the round is end", () => {
            it("THEN user should receive MD5 raw value having checkSum match md5RawValue", async (done) => {
                // Assert
                normalUserClientDriver.handleEndGameEvent((endBetData) => {
                    if (endBetData?.resultHash?.rawValue) {
                        const md5RawValue = endBetData.resultHash.rawValue;
                        const hash = crypto.createHash("md5").update(md5RawValue).digest("hex");

                        expect(md5RawValue).not.toBeNull();
                        expect(hash).toBe(md5HashValue);

                        done();
                    }
                });
            }, 40000);
        });
    });
});
