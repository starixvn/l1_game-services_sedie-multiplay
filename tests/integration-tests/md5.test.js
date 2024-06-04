import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";
import crypto from "crypto";

describe("Verify MD5", () => {
    let driver;
    let md5HashValue = "";

    beforeAll(async () => {
        driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await driver.handleSignedInEvent();
    });

    afterAll(() => {
        driver.close();
    });

    describe("WHEN user join game", () => {
        it("THEN user should receive MD5 hash value", async () => {
            // Arrange
            driver.sendInGameEvent();

            // Act
            const result = await driver.handleGameEvent((inGameData) => inGameData.gameConfigs);
            md5HashValue = result.resultHash.hashValue;

            // Assert
            expect(md5HashValue).not.toBeUndefined();
        });

        describe("WHEN the round is end", () => {
            it("THEN user should receive MD5 raw value having checkSum match md5RawValue", async () => {
                // Act
                const result = await driver.handleGameEvent((data) => data.finish);
                console.log(result);
                const md5RawValue = result.resultHash.rawValue;
                const hash = crypto.createHash("md5").update(md5RawValue).digest("hex");

                // Assert
                expect(md5RawValue).not.toBeNull();
                expect(hash).toBe(md5HashValue);
            }, 40000);
        });
    });
});
