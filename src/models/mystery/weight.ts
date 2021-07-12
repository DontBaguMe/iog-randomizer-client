import { BooleanSwitch } from './boolean-switch'
import { Difficulty } from './difficulty'
import { Enemizer } from './enemizer'
import { EntranceShuffle } from './entrance-shuffle'
import { Goal } from './goal'
import { HealthVariant } from './health-variant'
import { Logic } from './logic'
import { StartingLocation } from './starting-location'
import { Statues } from './statues'
import { StatuesReq } from './statues-req'

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
    EntranceShuffle: EntranceShuffle
    OverworldShuffle: BooleanSwitch
    Spoilers: BooleanSwitch
    Fluteless: BooleanSwitch
}
