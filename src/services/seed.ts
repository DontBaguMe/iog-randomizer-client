import detailsStore from '../stores/details'
import enemizerStore from '../stores/enemizer'
import entranceStore from '../stores/entrance'
import variantsStore from '../stores/variants'

import romStore from '../stores/rom'
import uiStore from '../stores/ui'
import RequestSeedResponse from '../models/http/request-seed-response'
import RomPatchStep from '../models/rom/patch-step'

class SeedService {
    public async requestSeed() {
        romStore.clear()

        const response = await fetch(process.env.REACT_APP_IOGR_API_URI, {
            method: 'POST',
            body: this.buildRequestBody(),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })

        if (!response.ok) throw new Error('Failed to negotiate with server')

        const result: RequestSeedResponse = await response.json()
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

    public buildRequestBody(): string {
        return JSON.stringify({
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
        })
    }

    parseResponse(response, key) {
        let cd = response.headers.get('content-disposition')
        let d = cd.split(';')

        for (let i = 0; i < d.length; ++i) {
            const idx = d[i].indexOf(key)

            if (idx > -1) return d[i].substring(idx + key.length + 1)
        }

        return null
    }
}

const seedService = new SeedService()
export default seedService
