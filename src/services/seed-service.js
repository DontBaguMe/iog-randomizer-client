import detailsStore from '../stores/details'
import enemizerStore from '../stores/enemizer'
import entranceStore from '../stores/entrance'
import variantsStore from '../stores/variants'
import uiStore from '../stores/ui'

import romService from './rom-service'

class SeedService {
    async requestSeed() {
        const response = await fetch(process.env.REACT_APP_IOGR_API_URI, {
            method: 'POST',
            body: this.buildRequestBody(),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            console.error(response)
        }

        const result = await response.json()
        const patch = JSON.parse(result.patch)

        romService.writeRom(patch, result.patchName)
        romService.writeSpoiler(result.spoiler, result.spoilerFilename)
    }

    async requestSpoiler() {
        const { seed } = detailsStore

        const response = await fetch(`api/seed/${seed}/spoiler`, {
            method: 'GET',
        })

        if (!response || !response.headers)
            return null

        const file = await response.blob()
        const name = this.parseResponse(response, 'filename')

        uiStore.setSpoilerUri(window.URL.createObjectURL(file))
        uiStore.setSpoilerName(name)
    }

    buildRequestBody() {
        return JSON.stringify({
            'seed': parseInt(detailsStore.seed === 0 ? null : detailsStore.seed),
            'difficulty': parseInt(detailsStore.difficulty),
            'goal': parseInt(detailsStore.goal),
            'statues': detailsStore.statues,
            'startLocation': parseInt(variantsStore.startLocation),
            'logic': parseInt(variantsStore.logic),
            'allowGlitches': variantsStore.allowGlitches,
            'ohko': variantsStore.oneHitKnockOut,
            'redJewelMadness': variantsStore.redJewelMadness,
            'firebird': variantsStore.firebird,    
            'enemizer': parseInt(enemizerStore.enemizer),
            'bossShuffle': enemizerStore.bossShuffle,    
            'entranceShuffle': entranceStore.entranceShuffle,
            'dungeonShuffle': entranceStore.dungeonShuffle,
            'overworldShuffle': entranceStore.overworldShuffle
        })
    }

    parseResponse(response, key) {
        let cd = response.headers.get('content-disposition')
        let d = cd.split(';')

        for (let i = 0; i < d.length; ++i) {
            const idx = d[i].indexOf(key)

            if (idx > -1)
                return d[i].substring(idx + key.length + 1)
        }

        return null
    }
}

const seedService = new SeedService()
export default seedService