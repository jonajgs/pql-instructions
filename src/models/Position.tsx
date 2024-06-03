export const SEEKER = "Seeker";
export const CHASER = "Chaser";
export const KEEPER = "Keeper";
export const BEATER = "Beater";

export type Position =
    typeof SEEKER |
    typeof CHASER |
    typeof KEEPER |
    typeof BEATER;

const SpecialAbility = {
    [SEEKER]: "Enhanced Vision",
    [BEATER]: "Power Swing",
    [CHASER]: "",
    [KEEPER]: "",
};

export const getSpecialAbility = (position: Position) => SpecialAbility[position];
