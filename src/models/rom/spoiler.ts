export interface Item {
    location: string
    name: string
}

export interface Spoiler {
    version: string
    seed: string
    date: string
    goal: string
    start_location: string
    logic: string
    difficulty: string
    statues_required: number[]
    boss_order: number[]
    kara_location: string
    jeweler_amounts: number[]
    inca_tiles: number[]
    hieroglyph_order: number[]
    items: Item[]
}
