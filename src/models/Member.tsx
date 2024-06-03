import { Position } from "./Position.tsx";

export interface Member {
    id: number;
    name: string;
    age: number;
    position: Position;
    team_id?: number
}
