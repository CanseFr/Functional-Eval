export type Shot = {
    team: "A" | "B";
    success: boolean;
};

export type State = {
    score: Score;
    history: string[];
    shots: number;
    winner: string | null;
};

export type Action =
    | { type: "SHOT"; shot: Shot }
    | { type: "SET_WINNER"; winner: string };


export type Score = { teamA: number; teamB: number };
