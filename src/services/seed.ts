import romStore from '../stores/rom'
import Patch from '../models/rom/patch'

import RomPatchStep from '../models/rom/patch-step'
import GenerateSeedRequest from '../models/http/generate-seed-request'
import GenerateSeedResponse from '../models/http/generate-seed-response'
import GenerateSeedFromPermalinkResponse from '../models/http/generate-seed-from-permalink-response'
import { settingsStore } from '../stores/settings'
import { mysteryStore } from '../stores/mystery'
import { PermalinkedRom } from '../models/rom/permalinked-rom'
import { Spoiler } from '../models/rom/spoiler'
import { Weight, WeightSelection } from '../models/mystery'
import { generateRandomSeedValue } from '../functions/generate-random'
import {Flute} from "../models/ui/flute";

class SeedService {
    private generateMysterySeedValues(): WeightSelection {
        const weekly: Weight = mysteryStore.Weights.Weekly

        let selection = {}
        for (var property in weekly) {
            let total_weight = 0

            for (var category in weekly[property]) total_weight += weekly[property][category] > 0 ? weekly[property][category] : 0

            const threshold = Math.random() * total_weight
            let total_mesure = 0
            let chosen_category = null
            for (var category in weekly[property]) {

                if (weekly[property][category] <= 0) continue
                total_mesure += weekly[property][category]
                chosen_category = category

                if (total_mesure >= threshold) break
            }

            selection[property] = chosen_category
        }

        return selection as WeightSelection
    }

    public async requestMysterySeed(): Promise<void> {
        const selection: WeightSelection = this.generateMysterySeedValues()

        switch (selection.Difficulty) {
            case 'Easy':
                settingsStore.difficulty = 0
                break
            case 'Normal':
                settingsStore.difficulty = 1
                break
            case 'Hard':
                settingsStore.difficulty = 2
                break
            case 'Extreme':
                settingsStore.difficulty = 3
        }

        switch (selection.Enemizer) {
            case 'None':
                settingsStore.enemizer = 0
                break
            case 'Limited':
                settingsStore.enemizer = 1
                break
            case 'Balanced':
                settingsStore.enemizer = 2
                break
            case 'Full':
                settingsStore.enemizer = 3
                break
            case 'Insane':
                settingsStore.enemizer = 4
        }

        switch (selection.Goal) {
            case 'DarkGaia':
                settingsStore.goal = 0
                break
            case 'RedJewelHunt':
                settingsStore.goal = 1
                break
            case 'ApocalypseGaia':
                settingsStore.goal = 2
                break
            case 'RandomGaia':
                settingsStore.goal = 3
        }

        switch (selection.Logic) {
            case 'Completable':
                settingsStore.logic = 0
                break
            case 'Beatable':
                settingsStore.logic = 1
                break
            case 'Chaos':
                settingsStore.logic = 2
        }

        switch (selection.StartingLocation) {
            case 'SouthCape':
                settingsStore.startLocation = 0
                break
            case 'Safe':
                settingsStore.startLocation = 1
                break
            case 'Unsafe':
                settingsStore.startLocation = 2
                break
            case 'ForcedUnsafe':
                settingsStore.startLocation = 3
        }

        switch (selection.StatuesReq) {
            case 'GameChoice':
                settingsStore.statuesReq = 0
                break
            case 'PlayerChoice':
                settingsStore.statuesReq = 1
                break
            case 'Random':
                settingsStore.statuesReq = 2
        }

        switch (selection.Flute) {
            case 'Start':
                settingsStore.flute = 0
                break
            case 'Shuffle':
                settingsStore.flute = 1
                break
            case 'Fluteless':
                settingsStore.flute = 2
        }

        switch (selection.DarkRooms) {
            case 'None':
                settingsStore.darkRooms = 0
                break
            case 'Few':
                settingsStore.darkRooms = 1
                break
            case 'Some':
                settingsStore.darkRooms = 2
                break
            case 'Many':
                settingsStore.darkRooms = 3
                break
            case 'All':
                settingsStore.darkRooms = 4
        }

        settingsStore.statues = selection.Statues
        settingsStore.raceRom = selection.Spoilers === 'Off'
        settingsStore.overworldShuffle = selection.OverworldShuffle === 'On'
        settingsStore.townShuffle = selection.TownShuffle === 'On'
        settingsStore.dungeonShuffle = selection.DungeonChaos === 'On'
        settingsStore.coupledExits = selection.CoupledExits === 'On'
        settingsStore.bossShuffle = selection.BossShuffle === 'On'
        settingsStore.openWorld = selection.OpenWorld === 'On'
        settingsStore.allowGlitches = selection.AllowGlitches === 'On'
        settingsStore.oneHitKnockOut = selection.HealthVariant === 'OHKO'
        settingsStore.redJewelMadness = selection.HealthVariant === 'RedJewelMadness'
        settingsStore.firebird = selection.EarlyFirebird === 'On'
        settingsStore.z3mode = selection.Zelda3Mode === 'On'
        settingsStore.orbRando = selection.OrbRando === 'On'
        settingsStore.cursedRooms = selection.CursedRooms === 'On'
        settingsStore.infiniteInventory = selection.InfiniteInventory === 'On'
        settingsStore.dsWarp = selection.DsWarp === 'On'

        settingsStore.seed = generateRandomSeedValue()
        await this.requestSeed()
    }

    public async requestSeed(): Promise<void> {
        romStore.clearPatch()

        const parameters: GenerateSeedRequest = {
            seed: settingsStore.seed,
            generateRaceRom: settingsStore.raceRom,
            difficulty: settingsStore.difficulty,
            goal: settingsStore.goal,
            statues: settingsStore.statues,
            statueReq: settingsStore.statuesReq,
            startLocation: settingsStore.startLocation,
            logic: settingsStore.logic,
            allowGlitches: settingsStore.allowGlitches,
            ohko: settingsStore.oneHitKnockOut,
            redJewelMadness: settingsStore.redJewelMadness,
            firebird: settingsStore.firebird,
            enemizer: settingsStore.enemizer,
            bossShuffle: settingsStore.bossShuffle,
            townShuffle: settingsStore.townShuffle,
            coupledExits: settingsStore.coupledExits,
            dungeonShuffle: settingsStore.dungeonShuffle,
            overworldShuffle: settingsStore.overworldShuffle,
            openMode: settingsStore.openWorld,
            z3Mode: settingsStore.z3mode,
            flute: settingsStore.flute,
            hideSettings: settingsStore.hide_settings,
            orbRando: settingsStore.orbRando,
            darkRooms: settingsStore.darkRooms,
            cursedRooms: settingsStore.cursedRooms,
            infiniteInventory: settingsStore.infiniteInventory,
            dsWarp: settingsStore.dsWarp,
            returnSpoiler: settingsStore.returnSpoiler
        }

        const response = await fetch(process.env.REACT_APP_IOGR_API_URI, {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })

        if (!response.ok) throw new Error('Failed to negotiate with server')

        const result: GenerateSeedResponse = await response.json()
        const patchData: RomPatchStep[] = JSON.parse(result.patch)
        const patchFilename: string = result.patchName
        const spoilerData: Spoiler = result.spoiler ? JSON.parse(result.spoiler) ?? null : null
        const spoilerFilename: string = result.spoilerName
        const fluteless: boolean = settingsStore.flute === Flute.Fluteless

        romStore.patch = new Patch(patchData, patchFilename, spoilerData, spoilerFilename, result.permalink_id, fluteless)
    }

    public async requestPermalinkedSeed(id: string): Promise<PermalinkedRom> {
        romStore.clearPatch()

        const uri = `${process.env.REACT_APP_IOGR_API_PERMALINK}/${id}`

        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })

        if (!response.ok) throw new Error('Failed to negotiate with server')

        const result: GenerateSeedFromPermalinkResponse = await response.json()
        const patchData: RomPatchStep[] = JSON.parse(result.patch)
        const patchFilename: string = result.patchName
        const spoilerData: Spoiler = result.spoiler ? JSON.parse(result.spoiler) ?? null : null
        const spoilerFilename: string = result.spoilerName
        const settings = JSON.parse(result.settings)
        let fluteless: boolean = false
        if (result.settings != null) {
            if (settings.hasOwnProperty("fluteless")) fluteless = settings.fluteless
            else fluteless = settings.flute === Flute.Fluteless
        }
        else {
            fluteless = result.fluteless
        }
        const returnedSpoiler: boolean = result.returned_spoiler ?? (!!result.spoiler)

        return {
            id: result._id,
            patch: new Patch(patchData, patchFilename, spoilerData, spoilerFilename, result._id, fluteless),
            settings: JSON.parse(result.settings),
            created_at: result.created_at,
            returnedSpoiler: returnedSpoiler
        }
    }
}

const seedService = new SeedService()
export default seedService
