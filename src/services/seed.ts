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

class SeedService {

    public async requestMysterySeed(): Promise<void> {
        // TODO : read weight and fill seetingStore
        let selection = {}
        for (var property in mysteryStore.weights) {
            let total_weight = 0
            for (var category in mysteryStore.weights[property]) {
                total_weight += mysteryStore.weights[property][category]
            }
            const threshold = Math.random() * total_weight
            let total_mesure = 0
            let chosen_category = null;
            for (var category in mysteryStore.weights[property]) {
                total_mesure += mysteryStore.weights[property][category]
                chosen_category = category
                if (total_mesure >= threshold) {
                    break
                }
            }
            selection[property] = chosen_category
        }

        settingsStore.seed = Math.floor(Math.random() * 2147483648)

        switch (selection['Difficulty']) {
            case "Easy":
                settingsStore.difficulty = 0
                break
            case "Normal":
                settingsStore.difficulty = 1
                break
            case "Hard":
                settingsStore.difficulty = 2
                break
            case "Extreme":
                settingsStore.difficulty = 3
        }

        switch (selection['Enemizer']) {
            case "None":
                settingsStore.enemizer = 0
                break
            case "Limited":
                settingsStore.enemizer = 1
                break
            case "Balanced":
                settingsStore.enemizer = 2
                break
            case "Full":
                settingsStore.enemizer = 3
                break
            case "Insane":
                settingsStore.enemizer = 4
        }

        switch (selection['Goal']) {
            case "Dark Gaia":
                settingsStore.goal = 0
                break
            case "Red Jewel Hunt":
                settingsStore.goal = 1
                break
            case "Apocalypse Gaia":
                settingsStore.goal = 2
                break
            case "Random Gaia":
                settingsStore.goal = 3
        }

        settingsStore.statues = selection['Statues']

        settingsStore.raceRom = selection['Spoilers'] === "Off"

        settingsStore.overworldShuffle = selection['Overworld Shuffle'] === "On"

        settingsStore.bossShuffle = selection['Boss Shuffle'] === "On"

        switch (selection['Logic']) {
            case "Completable":
                settingsStore.logic = 0
                break
            case "Beatable":
                settingsStore.logic = 1
                break
            case "Chaos":
                settingsStore.logic = 2
        }

        switch (selection['Starting Location']) {
            case "South Cape":
                settingsStore.startLocation = 0
                break
            case "Safe":
                settingsStore.startLocation = 1
                break
            case "Unsafe":
                settingsStore.startLocation = 2
                break
            case "Forced Unsafe":
                settingsStore.startLocation = 3
        }

        settingsStore.openWorld = selection['Open World'] === "On"

        settingsStore.allowGlitches = selection['Allow Glitches'] === "On"

        settingsStore.oneHitKnockOut = selection['Health Variant'] === "One-Hit KO"
        settingsStore.redJewelMadness = selection['Health Variant'] === "Red Jewel Madness"

        settingsStore.firebird = selection['Early Firebird'] === "On"

        settingsStore.z3mode = selection['Zelda 3 Mode'] === "On"

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
            startLocation: settingsStore.startLocation,
            logic: settingsStore.logic,
            allowGlitches: settingsStore.allowGlitches,
            ohko: settingsStore.oneHitKnockOut,
            redJewelMadness: settingsStore.redJewelMadness,
            firebird: settingsStore.firebird,
            enemizer: settingsStore.enemizer,
            bossShuffle: settingsStore.bossShuffle,
            entranceShuffle: settingsStore.entranceShuffle,
            dungeonShuffle: settingsStore.dungeonShuffle,
            overworldShuffle: settingsStore.overworldShuffle,
            openMode: settingsStore.openWorld,
            z3Mode: settingsStore.z3mode,
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

        romStore.patch = new Patch(patchData, patchFilename, spoilerData, spoilerFilename, result.permalink_id)
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

        return {
            id: result._id,
            patch: new Patch(patchData, patchFilename, spoilerData, spoilerFilename, result._id),
            settings: JSON.parse(result.settings),
            created_at: result.created_at,
        }
    }
}

const seedService = new SeedService()
export default seedService
