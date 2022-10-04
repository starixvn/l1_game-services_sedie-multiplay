import { SedieMultiplay } from "./game-info";

const userAgent = "axios/0.27.2";

const TotalUserEachGame = 100;

const playerIdPrefix = 999;

const PlayerIds = [
  ...Array(TotalUserEachGame * SedieMultiplay.length).keys(),
].map((value) => `${playerIdPrefix}${String(value).padStart(3, "0")}`);

const BetChoices = ["even", "odd", "red3", "red4", "white3", "white4"];

const BetAmount = 10;

const BetEachUser = {
  min: 10,
  max: 10,
};

export {
  userAgent,
  TotalUserEachGame,
  BetEachUser,
  PlayerIds,
  BetChoices,
  BetAmount,
};
