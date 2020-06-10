import romStore from '../stores/rom'
import Patch from '../models/rom/patch'

import RomPatchStep from '../models/rom/patch-step'
import GenerateSeedRequest from '../models/http/generate-seed-request'
import GenerateSeedResponse from '../models/http/generate-seed-response'
import GenerateSeedFromPermalinkResponse from '../models/http/generate-seed-from-permalink-response'
import { settingsStore } from '../stores/settings'
import { PermalinkedRom } from '../models/rom/permalinked-rom'
import { Spoiler } from '../models/rom/spoiler'

class SeedService {
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
