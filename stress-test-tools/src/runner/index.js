import playerPlaceBet from "../handler/bet-handler";
import { PlayerIds, TotalUserEachGame } from "../constants/constants";
import { SedieMultiplay } from "../constants/game-info";

export const start = async () => {
  for (let gameIndex = 0; gameIndex < SedieMultiplay.length; gameIndex++) {
    for (let playerCount = 0; playerCount < TotalUserEachGame; playerCount++) {
      const playerIndex = gameIndex * TotalUserEachGame + playerCount;
      playerPlaceBet(PlayerIds[playerIndex], SedieMultiplay[gameIndex]);
    }
  }
};
