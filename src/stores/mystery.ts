import { observable } from 'mobx'
import { Weights } from '../models/mystery'

class MysteryStore {
    @observable public Weights: Weights = {
        Weekly: {
            Difficulty: {
                Easy: 16.86,
                Normal: 36.43,
                Hard: 30.0,
                Extreme: 16.71,
            },
            Goal: {
                DarkGaia: 61.29,
                RedJewelHunt: 13.43,
                ApocalypseGaia: 12.0,
                RandomGaia: 13.29,
            },
            Statues: {
                0: 3.0,
                1: 5.29,
                2: 10.14,
                3: 18.57,
                4: 24.14,
                5: 3.86,
                6: 3.0,
                Random: 31.29,
            },
            StatuesReq: {
                GameChoice: 30.95,
                PlayerChoice: 25.36,
                Random: 43.69,
            },
            StartingLocation: {
                SouthCape: 28.43,
                Safe: 24.19,
                Unsafe: 28.9,
                ForcedUnsafe: 18.48,
            },
            Logic: {
                Completable: 32.71,
                Beatable: 30.14,
                Chaos: 37.14,
            },
            OpenWorld: {
                On: 22.14,
                Off: 77.86,
            },
            Zelda3Mode: {
                On: 11.14,
                Off: 88.86,
            },
            AllowGlitches: {
                On: 17.86,
                Off: 82.14,
            },
            HealthVariant: {
                None: 81.43,
                RedJewelMadness: 17.57,
                OHKO: 1.0,
            },
            EarlyFirebird: {
                On: 62.14,
                Off: 37.86,
            },
            Enemizer: {
                None: 64.29,
                Limited: 12.86,
                Balanced: 17.0,
                Full: 3.57,
                Insane: 2.29,
            },
            BossShuffle: {
                On: 37.57,
                Off: 62.43,
            },
            EntranceShuffle: {
                None: 77.43,
                Coupled: 18.29,
                Uncoupled: 2.86,
            },
            OverworldShuffle: {
                On: 43.67,
                Off: 56.33,
            },
            Spoilers: {
                On: 9.0,
                Off: 91.0,
            },
            Fluteless: {
                On: 10.14,
                Off: 89.86,
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
