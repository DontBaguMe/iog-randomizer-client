type Switch = 'On' | 'Off'

export interface WeightSelection {
    Difficulty: 'Easy' | 'Normal' | 'Hard' | 'Extreme'
    Goal: 'DarkGaia' | 'RedJewelHunt' | 'ApocalypseGaia' | 'RandomGaia'
    Statues: '0' | '1' | '2' | '3' | '4' | '5' | '6' | 'Random'
    StatuesReq: 'GameChoice' | 'PlayerChoice' | 'Random'
    StartingLocation: 'SouthCape' | 'Safe' | 'Unsafe' | 'ForcedUnsafe'
    Logic: 'Completable' | 'Beatable' | 'Chaos'
    OpenWorld: Switch
    Zelda3Mode: Switch
    AllowGlitches: Switch
    HealthVariant: 'None' | 'OHKO' | 'RedJewelMadness'
    EarlyFirebird: Switch
    Enemizer: 'None' | 'Limited' | 'Balanced' | 'Full' | 'Insane'
    BossShuffle: Switch
    TownShuffle: Switch
    DungeonShuffle: Switch
    OverworldShuffle: Switch
    CoupledExits: Switch
    Spoilers: Switch
    Flute: 'Start' | 'Shuffle' | 'Fluteless'
    OrbRando: Switch
    DarkRooms: 'None' | 'Few' | 'Some' | 'Many' | 'All'
    CursedRooms: Switch
    InfiniteInventory: Switch
}
