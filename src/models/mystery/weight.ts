import { BooleanSwitch } from './boolean-switch'
import { Difficulty } from './difficulty'
import { Enemizer } from './enemizer'
import { Flute } from './flute'
import { Goal } from './goal'
import { HealthVariant } from './health-variant'
import { Logic } from './logic'
import { StartingLocation } from './starting-location'
import { Statues } from './statues'
import { StatuesReq } from './statues-req'
import { DarkRoom } from "./dark-room";

export interface Weight {
    Difficulty: Difficulty
    Goal: Goal
    Statues: Statues
    StatuesReq: StatuesReq
    StartingLocation: StartingLocation
    Logic: Logic
    OpenWorld: BooleanSwitch
    Zelda3Mode: BooleanSwitch
    AllowGlitches: BooleanSwitch
    HealthVariant: HealthVariant
    EarlyFirebird: BooleanSwitch
    Enemizer: Enemizer
    BossShuffle: BooleanSwitch
    TownShuffle: BooleanSwitch
    DungeonShuffle: BooleanSwitch
    CoupledExits: BooleanSwitch
    OverworldShuffle: BooleanSwitch
    Spoilers: BooleanSwitch
    Flute: Flute
    DarkRooms: DarkRoom
    CursedRooms: BooleanSwitch
    InfiniteInventory: BooleanSwitch
    OrbRando: BooleanSwitch
}
