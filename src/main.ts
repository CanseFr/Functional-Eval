import {Score, Shot} from "./type";
import {initialState, reducer} from "./context";

/**
 * Determine si le jeu a un gagnant
 */
export const  hasWinner = (score: Score, shots: number): boolean =>{
    const maxShots = 5;

    if (shots < maxShots) {
        const remainingShots = maxShots - Math.ceil(shots / 2);
        return (
            score.teamA > score.teamB + remainingShots ||
            score.teamB > score.teamA + remainingShots
        );
    }

    return score.teamA !== score.teamB;
}

/**
 * Determine gagnant ou si le match continu
 */
export const  determineWinner = (score: Score): string | null =>{
    if (score.teamA > score.teamB) return "Équipe A";
    if (score.teamB > score.teamA) return "Équipe B";
    return null;
}

/**
 * Simule seance de tir au but avec reducer
 */
export const  penaltyShootReducer = (): void =>{
    let state = initialState;

    while (!state.winner) {
        const team = state.shots % 2 === 0 ? "A" : "B";
        const success = Math.random() < 0.7; // 70% chance de scorer
        const shot: Shot = { team, success };

        state = reducer(state, { type: "SHOT", shot });
        console.log(state.history[state.history.length - 1]);

        if (hasWinner(state.score, state.shots)) {
            const winner = determineWinner(state.score);
            state = reducer(state, { type: "SET_WINNER", winner: winner! });
            console.log(`Victoire : ${winner} (Score : ${state.score.teamA}/${state.score.teamB})`);
        }
    }
}

penaltyShootReducer();
