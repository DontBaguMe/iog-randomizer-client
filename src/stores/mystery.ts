import { observable } from 'mobx'
import { Weights } from '../models/mystery'

class MysteryStore {
    @observable public Weights: Weights = {
        Weekly: {
            Difficulty: {
                Easy: 17.5,
                Normal: 34.44,
                Hard: 28.89,
                Extreme: 19.17,
            },
            Goal: {
                DarkGaia: 56.72,
                RedJewelHunt: 19.1,
                ApocalypseGaia: 10.05,
                RandomGaia: 14.13,
            },
            Statues: {
                0: 3.11,
                1: 3.52,
                2: 12.01,
                3: 34.32,
                4: 21.57,
                5: 6.19,
                6: 5.22,
                Random: 14.06,
            },
            StatuesReq: {
                GameChoice: 1,
                PlayerChoice: 0,
                Random: 0,
            },
            StartingLocation: {
                SouthCape: 29.99,
                Safe: 29.74,
                Unsafe: 24.74,
                ForcedUnsafe: 15.54,
            },
            Logic: {
                Completable: 31.67,
                Beatable: 23.15,
                Chaos: 45.19,
            },
            OpenWorld: {
                On: 12.45,
                Off: 87.55,
            },
            Zelda3Mode: {
                On: 20.89,
                Off: 79.11,
            },
            AllowGlitches: {
                On: 19.22,
                Off: 80.78,
            },
            HealthVariant: {
                None: 79.37,
                RedJewelMadness: 17.59,
                OHKO: 3.04,
            },
            EarlyFirebird: {
                On: 60.56,
                Off: 39.44,
            },
            Enemizer: {
                None: 69.6,
                Limited: 8.57,
                Balanced: 10.79,
                Full: 7.02,
                Insane: 4.02,
            },
            BossShuffle: {
                On: 25.89,
                Off: 74.11,
            },
            EntranceShuffle: {
                None: 81.71,
                Coupled: 10.03,
                Uncoupled: 8.25,
            },
            OverworldShuffle: {
                On: 29.72,
                Off: 70.28,
            },
            Spoilers: {
                On: 12.23,
                Off: 87.77,
            },
            Fluteless: {
                On: 0,
                Off: 1,
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
                RandomGaia: 1,
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
