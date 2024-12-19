import {Action, State} from "../type";


export const initialState: State = {
    score: { teamA: 0, teamB: 0 },
    history: [],
    shots: 0,
    winner: null,
};

/**
 * Reucer pour gerer état séance de tirs au but.
 */
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SHOT": {
            const { shot } = action;
            const updatedScore = {
                teamA: shot.team === "A" ? state.score.teamA + (shot.success ? 1 : 0) : state.score.teamA,
                teamB: shot.team === "B" ? state.score.teamB + (shot.success ? 1 : 0) : state.score.teamB,
            };

            const newHistoryEntry = `Tir ${state.shots + 1} : Score : ${updatedScore.teamA}/${updatedScore.teamB} (Équipe A : ${shot.team === "A" ? (shot.success ? "+1" : "0") : "0"} | Équipe B : ${shot.team === "B" ? (shot.success ? "+1" : "0") : "0"})`;

            return {
                ...state,
                score: updatedScore,
                history: [...state.history, newHistoryEntry],
                shots: state.shots + 1,
            };
        }
        case "SET_WINNER": {
            return {
                ...state,
                winner: action.winner,
            };
        }
        default:
            return state;
    }
}