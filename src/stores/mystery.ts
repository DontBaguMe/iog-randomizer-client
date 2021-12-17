import { observable } from 'mobx'
import { Weights } from '../models/mystery'

class MysteryStore {
    @observable public Weights: Weights = {
        Weekly: {
            Difficulty: {
                Easy: 19.83,
                Normal: 38.33,
                Hard: 27.33,
                Extreme: 14.5,
            },
            Goal: {
                DarkGaia: 54.67,
                RedJewelHunt: 15.73,
                ApocalypseGaia: 15.47,
                RandomGaia: 14.13,
            },
            Statues: {
                0: 5.18,
                1: 6.18,
                2: 8.58,
                3: 18.18,
                4: 22.18,
                5: 5.58,
                6: 5.08,
                Random: 29.05,
            },
            StatuesReq: {
                GameChoice: 35,
                PlayerChoice: 28.08,
                Random: 36.92,
            },
            StartingLocation: {
                SouthCape: 28.87,
                Safe: 31.13,
                Unsafe: 26.83,
                ForcedUnsafe: 13.17,
            },
            Logic: {
                Completable: 40.23,
                Beatable: 22.43,
                Chaos: 37.33,
            },
            OpenWorld: {
                On: 18.41,
                Off: 81.59,
            },
            Zelda3Mode: {
                On: 24.3,
                Off: 75.7,
            },
            AllowGlitches: {
                On: 10,
                Off: 90,
            },
            HealthVariant: {
                None: 75.5,
                RedJewelMadness: 23.8,
                OHKO: 0.7,
            },
            EarlyFirebird: {
                On: 67.5,
                Off: 32.5,
            },
            Enemizer: {
                None: 63,
                Limited: 8.5,
                Balanced: 20.4,
                Full: 4.1,
                Insane: 4,
            },
            BossShuffle: {
                On: 41.5,
                Off: 58.5,
            },
            EntranceShuffle: {
                None: 79.7,
                Coupled: 14.4,
                Uncoupled: 5.9,
            },
            OverworldShuffle: {
                On: 37.32,
                Off: 62.68,
            },
            Spoilers: {
                On: 12.61,
                Off: 87.39,
            },
            Fluteless: {
                On: 9.7,
                Off: 90.3,
            },
        },
        Default: {
            Difficulty: {
                Easy: 0,
                Normal: 1,
                Hard: 0,
                Extreme: 0,
            },
            Goal: {
                DarkGaia: 1,
                RedJewelHunt: 0,
                ApocalypseGaia: 0,
                RandomGaia: 0,
            },
            Statues: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 1,
                5: 0,
                6: 0,
                Random: 0,
            },
            StatuesReq: {
                GameChoice: 1,
                PlayerChoice: 0,
                Random: 0,
            },
            StartingLocation: {
                SouthCape: 1,
                Safe: 0,
                Unsafe: 0,
                ForcedUnsafe: 0,
            },
            Logic: {
                Completable: 1,
                Beatable: 0,
                Chaos: 0,
            },
            OpenWorld: {
                On: 0,
                Off: 1,
            },
            Zelda3Mode: {
                On: 0,
                Off: 1,
            },
            AllowGlitches: {
                On: 0,
                Off: 1,
            },
            HealthVariant: {
                None: 1,
                RedJewelMadness: 0,
                OHKO: 0,
            },
            EarlyFirebird: {
                On: 0,
                Off: 1,
            },
            Enemizer: {
                None: 1,
                Limited: 0,
                Balanced: 0,
                Full: 0,
                Insane: 0,
            },
            BossShuffle: {
                On: 0,
                Off: 1,
            },
            EntranceShuffle: {
                None: 1,
                Coupled: 0,
                Uncoupled: 0,
            },
            OverworldShuffle: {
                On: 0,
                Off: 1,
            },
            Spoilers: {
                On: 0,
                Off: 1,
            },
            Fluteless: {
                On: 0,
                Off: 1,
            },
        },
    }
}

const mysteryStore = new MysteryStore()
export { mysteryStore }
