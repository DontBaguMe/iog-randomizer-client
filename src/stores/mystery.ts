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
        },
        Equivalent: {
            Difficulty: {
                Easy: 1,
                Normal: 1,
                Hard: 1,
                Extreme: 1,
            },
            Goal: {
                DarkGaia: 1,
                RedJewelHunt: 1,
                ApocalypseGaia: 1,
                RandomGaia: 1,
            },
            Statues: {
                0: 1,
                1: 1,
                2: 1,
                3: 1,
                4: 1,
                5: 1,
                6: 1,
                Random: 1,
            },
            StartingLocation: {
                SouthCape: 1,
                Safe: 1,
                Unsafe: 1,
                ForcedUnsafe: 1,
            },
            Logic: {
                Completable: 1,
                Beatable: 1,
                Chaos: 1,
            },
            OpenWorld: {
                On: 1,
                Off: 1,
            },
            Zelda3Mode: {
                On: 1,
                Off: 1,
            },
            AllowGlitches: {
                On: 1,
                Off: 1,
            },
            HealthVariant: {
                None: 1,
                RedJewelMadness: 1,
                OHKO: 1,
            },
            EarlyFirebird: {
                On: 1,
                Off: 1,
            },
            Enemizer: {
                None: 1,
                Limited: 1,
                Balanced: 1,
                Full: 1,
                Insane: 1,
            },
            BossShuffle: {
                On: 1,
                Off: 1,
            },
            EntranceShuffle: {
                None: 1,
                Coupled: 1,
                Uncoupled: 1,
            },
            OverworldShuffle: {
                On: 1,
                Off: 1,
            },
            Spoilers: {
                On: 1,
                Off: 1,
            },
        },
    }

    // @observable public weights_presets = {
    //     Weekly: {
    //         Difficulty: {
    //             Easy: 17.5,
    //             Normal: 34.44,
    //             Hard: 28.89,
    //             Extreme: 19.17,
    //         },
    //         Goal: {
    //             'Dark Gaia': 56.72,
    //             'Red Jewel Hunt': 19.1,
    //             'Apocalypse Gaia': 10.05,
    //             'Random Gaia': 14.13,
    //         },
    //         Statues: {
    //             '0': 3.11,
    //             '1': 3.52,
    //             '2': 12.01,
    //             '3': 34.32,
    //             '4': 21.57,
    //             '5': 6.19,
    //             '6': 5.22,
    //             Random: 14.06,
    //         },
    //         'Starting Location': {
    //             'South Cape': 29.99,
    //             Safe: 29.74,
    //             Unsafe: 24.74,
    //             'Forced Unsafe': 15.54,
    //         },
    //         Logic: {
    //             Completable: 31.67,
    //             Beatable: 23.15,
    //             Chaos: 45.19,
    //         },
    //         'Open World': {
    //             On: 12.45,
    //             Off: 87.55,
    //         },
    //         'Zelda 3 Mode': {
    //             On: 20.89,
    //             Off: 79.11,
    //         },
    //         'Allow Glitches': {
    //             On: 19.22,
    //             Off: 80.78,
    //         },
    //         'Health Variant': {
    //             None: 79.37,
    //             'Red Jewel Madness': 17.59,
    //             'One-Hit KO': 3.04,
    //         },
    //         'Early Firebird': {
    //             On: 60.56,
    //             Off: 39.44,
    //         },
    //         Enemizer: {
    //             None: 69.6,
    //             Limited: 8.57,
    //             Balanced: 10.79,
    //             Full: 7.02,
    //             Insane: 4.02,
    //         },
    //         'Boss Shuffle': {
    //             On: 25.89,
    //             Off: 74.11,
    //         },
    //         'Entrance Shuffle': {
    //             None: 81.71,
    //             Coupled: 10.03,
    //             Uncoupled: 8.25,
    //         },
    //         'Overworld Shuffle': {
    //             On: 29.72,
    //             Off: 70.28,
    //         },
    //         Spoilers: {
    //             On: 12.23,
    //             Off: 87.77,
    //         },
    //     },
    //     Equivalent: {
    //         Difficulty: {
    //             Easy: 1,
    //             Normal: 1,
    //             Hard: 1,
    //             Extreme: 1,
    //         },
    //         Goal: {
    //             'Dark Gaia': 1,
    //             'Red Jewel Hunt': 1,
    //             'Apocalypse Gaia': 1,
    //             'Random Gaia': 1,
    //         },
    //         Statues: {
    //             '0': 1,
    //             '1': 1,
    //             '2': 1,
    //             '3': 1,
    //             '4': 1,
    //             '5': 1,
    //             '6': 1,
    //             Random: 1,
    //         },
    //         'Starting Location': {
    //             'South Cape': 1,
    //             Safe: 1,
    //             Unsafe: 1,
    //             'Forced Unsafe': 1,
    //         },
    //         Logic: {
    //             Completable: 1,
    //             Beatable: 1,
    //             Chaos: 1,
    //         },
    //         'Open World': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         'Zelda 3 Mode': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         'Allow Glitches': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         'Health Variant': {
    //             None: 1,
    //             'Red Jewel Madness': 1,
    //             'One-Hit KO': 1,
    //         },
    //         'Early Firebird': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         Enemizer: {
    //             None: 1,
    //             Limited: 1,
    //             Balanced: 1,
    //             Full: 1,
    //             Insane: 1,
    //         },
    //         'Boss Shuffle': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         'Entrance Shuffle': {
    //             None: 1,
    //             Coupled: 1,
    //             Uncoupled: 1,
    //         },
    //         'Overworld Shuffle': {
    //             On: 1,
    //             Off: 1,
    //         },
    //         Spoilers: {
    //             On: 1,
    //             Off: 1,
    //         },
    //     },
    // }

    // @observable public weights: Weights = JSON.parse(JSON.stringify(this.weights_presets['Weekly']))
}

const mysteryStore = new MysteryStore()
export { mysteryStore }
