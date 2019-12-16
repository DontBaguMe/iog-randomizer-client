import detailsStore from '../stores/details'
import enemizerStore from '../stores/enemizer'
import entranceStore from '../stores/entrance'
import variantsStore from '../stores/variants'

import romStore from '../stores/rom'
import uiStore from '../stores/ui'
import RomPatchStep from '../models/rom/patch-step'
import GenerateSeedRequest from '../models/http/generate-seed-request'
import GenerateSeedResponse from '../models/http/generate-seed-response'

class SeedService {
    public async requestSeed() {
        romStore.clear()

        const parameters: GenerateSeedRequest = {
            seed: detailsStore.seed === 0 ? null : detailsStore.seed,
            generateRaceRom: detailsStore.generateRaceRom,
            difficulty: detailsStore.difficulty,
            goal: detailsStore.goal,
            statues: detailsStore.statues,
            startLocation: variantsStore.startLocation,
            logic: variantsStore.logic,
            allowGlitches: variantsStore.allowGlitches,
            ohko: variantsStore.oneHitKnockOut,
            redJewelMadness: variantsStore.redJewelMadness,
            firebird: variantsStore.firebird,
            enemizer: enemizerStore.enemizer,
            bossShuffle: enemizerStore.bossShuffle,
            entranceShuffle: entranceStore.entranceShuffle,
            dungeonShuffle: entranceStore.dungeonShuffle,
            overworldShuffle: entranceStore.overworldShuffle,
            openMode: variantsStore.openWorld,
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
        const patch: RomPatchStep[] = JSON.parse(result.patch)
        const patchName: string = result.patchName

        romStore.setPatchData(patch, patchName)
        uiStore.setError(false)

        if (result.spoiler) {
            const spoiler = JSON.parse(result.spoiler)
            const spoilerFilename = result.spoilerFilename

            romStore.setSpoilerData(spoiler, spoilerFilename)
        }
    }
}

const seedService = new SeedService()
export default seedService
