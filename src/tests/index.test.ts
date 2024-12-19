import { describe, it, expect } from "@jest/globals";
import {Action, Score, State} from "../type";
import {initialState, reducer} from "../context";
import {determineWinner, hasWinner} from "../main";


describe("Reducer", () => {
    it("should update score and history correctly on SHOT action", () => {
        const state: State = { ...initialState };
        const action: Action = { type: "SHOT", shot: { team: "A", success: true } };
        const updatedState = reducer(state, action);

        expect(updatedState.score.teamA).toBe(1);
        expect(updatedState.score.teamB).toBe(0);
        expect(updatedState.history.length).toBe(1);
        expect(updatedState.history[0]).toContain("Tir 1 : Score : 1/0");
        expect(updatedState.shots).toBe(1);
    });

    it("should set the winner correctly on SET_WINNER action", () => {
        const state: State = { ...initialState };
        const action: Action = { type: "SET_WINNER", winner: "Équipe A" };
        const updatedState = reducer(state, action);

        expect(updatedState.winner).toBe("Équipe A");
    });
});

describe("hasWinner", () => {
    it("should return true if an early winner is determined", () => {
        const score: Score = { teamA: 3, teamB: 0 };
        expect(hasWinner(score, 4)).toBe(true);
    });

    it("should return false if no winner can be determined yet", () => {
        const score: Score = { teamA: 1, teamB: 1 };
        expect(hasWinner(score, 2)).toBe(false);
    });

    it("should return true after 5 shots if scores differ", () => {
        const score: Score = { teamA: 4, teamB: 3 };
        expect(hasWinner(score, 10)).toBe(true);
    });
});

describe("determineWinner", () => {
    it("should return 'Équipe A' if team A has more goals", () => {
        const score: Score = { teamA: 3, teamB: 2 };
        expect(determineWinner(score)).toBe("Équipe A");
    });

    it("should return 'Équipe B' if team B has more goals", () => {
        const score: Score = { teamA: 2, teamB: 3 };
        expect(determineWinner(score)).toBe("Équipe B");
    });

    it("should return null if scores are equal", () => {
        const score: Score = { teamA: 3, teamB: 3 };
        expect(determineWinner(score)).toBeNull();
    });
});
