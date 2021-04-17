type Switch = 'On' | 'Off'

export interface WeightSelection {
    Difficulty: 'Easy' | 'Normal' | 'Hard' | 'Extreme'
    Goal: 'DarkGaia' | 'RedJewelHunt' | 'ApocalypseGaia' | 'RandomGaia'
    Statues: '0' | '1' | '2' | '3' | '4' | '5' | '6' | 'Random'
    StartingLocation: 'SouthCape' | 'Safe' | 'Unsafe' | 'ForcedUnsafe'
    Logic: 'Completable' | 'Beatable' | 'Chaos'
    OpenWorld: Switch
    Zelda3Mode: Switch
    AllowGlitches: Switch
    HealthVariant: 'None' | 'OHKO' | 'RedJewelMadness'
    EarlyFirebird: Switch
    Enemizer: 'None' | 'Limited' | 'Balanced' | 'Full' | 'Insane'
    BossShuffle: Switch
    EntranceShuffle: 'None' | 'Coupled' | 'Uncoupled'
    OverworldShuffle: Switch
    Spoilers: Switch
}
