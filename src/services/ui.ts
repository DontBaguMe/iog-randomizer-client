import { Spoiler } from '../models/rom/spoiler'
import RomPatchStep from '../models/rom/patch-step'
import romStore from '../stores/rom'
import logService from './log'
import { settingsStore } from '../stores/settings'
import spriteService from './sprite'
import { SpriteBlob } from '../models/sprite/sprite-blob'
import { Sprite } from '../models/sprite/sprite'
import romService from './rom'

class UIService {
    public createSpoilerJsonBlob(spoiler: Spoiler): Blob {
        const data = JSON.stringify(spoiler, undefined, 2)
        return new Blob([data], { type: 'text/json' })
    }

    public createSpoilerCsvBlob(spoiler: Spoiler): Blob {
        const data = []

        data.push('Settings,')
        data.push(`Seed,${spoiler.seed}`)
        data.push(`Difficulty,${spoiler.difficulty}`)
        data.push(`Goal,${spoiler.goal}`)
        data.push(`Logic,${spoiler.logic}`)
        data.push(',')

        data.push('Metadata,')
        data.push(`Start Location,${spoiler.start_location}`)
        data.push(`Kara Location,${spoiler.kara_location}`)
        data.push(`Statues Required,${spoiler.statues_required.join(' ')}`)
        data.push(`Boss Order,${spoiler.boss_order.join(' ')}`)
        data.push(`Jeweler Amounts,${spoiler.jeweler_amounts.join(' ')}`)
        data.push(`Inca Tiles,${spoiler.inca_tiles.join(' ')}`)
        data.push(`Hieroglyph Order,${spoiler.hieroglyph_order.join(' ')}`)
        data.push(',')


        data.push('Items,')
        for (let i = 0; i < spoiler.items.length; ++i)
            data.push(`${spoiler.items[i].location},${spoiler.items[i].name}`)
        data.push(',')

        if (spoiler.overworld_entrances) {
            data.push('Overworld Entrances,')
            for (let i = 0; i < spoiler.overworld_entrances.length; ++i)
                data.push(`${spoiler.overworld_entrances[i].continent},${spoiler.overworld_entrances[i].region}`)
        }

        return new Blob([data.join('\n')], { type: 'text/csv' })
    }

    public createSpoilerTextBlob(spoiler: Spoiler): Blob {
        const data = []

        data.push('Settings')
        data.push('----------------------------------')
        data.push(`Seed:\t\t${spoiler.seed}`)
        data.push(`Difficulty:\t${spoiler.difficulty}`)
        data.push(`Goal:\t\t${spoiler.goal}`)
        data.push(`Logic:\t\t${spoiler.logic}`)
        data.push('')

        data.push('Metadata')
        data.push('----------------------------------')
        data.push(`Start Location:\t\t${spoiler.start_location}`)
        data.push(`Kara Location:\t\t${spoiler.kara_location}`)
        data.push(`Statues Required:\t${spoiler.statues_required}`)
        data.push(`Boss Order:\t\t${spoiler.boss_order}`)
        data.push(`Jeweler Amounts:\t${spoiler.jeweler_amounts}`)
        data.push(`Inca Tiles:\t\t${spoiler.inca_tiles}`)
        data.push(`Hieroglyph Order:\t${spoiler.hieroglyph_order}`)
        data.push('')

        data.push('Items')
        data.push('----------------------------------')

        const locationCharacterLimit = 40;

        // Items Section
        for (let i = 0; i < spoiler.items.length; ++i) {
            let key = `${spoiler.items[i].location}:`
            const buffer = locationCharacterLimit - key.length

            if (buffer > 0)
                for (let i = 0; i < buffer; ++i)
                    key += ' '

            data.push(`${key}${spoiler.items[i].name}`)
        }
        data.push('')


        // Overworld Entrances Section
        if (spoiler.overworld_entrances) {
            data.push('Overworld Entrances,')
            data.push('----------------------------------')

            for (let i = 0; i < spoiler.overworld_entrances.length; ++i) {
                let key = `${spoiler.overworld_entrances[i].continent}:`
                const buffer = locationCharacterLimit - key.length

                if (buffer > 0)
                    for (let i = 0; i < buffer; ++i)
                        key += ' '

                data.push(`${key}${spoiler.overworld_entrances[i].region}`)
            }

        }

        return new Blob([data.join('\n')], { type: 'text/plain' })
    }

    public async createRomBlobAsync(data: RomPatchStep[]): Promise<Blob> {
        logService.debug('[createRomBlobAsync] Creating blob...')
        const rom: ArrayBuffer = await romStore.rom?.get()

        if (!data || !rom) return null
        logService.debug('[createRomBlobAsync] Got rom array buffer', rom.byteLength)

        let buffer = new Uint8Array(rom)
        buffer = romService.removeHeader(buffer)
        buffer = this.writePatchToRom(buffer, data)

        const currentSpriteSelection = settingsStore.sprite
        const sprite: Sprite = await spriteService.getSprite(currentSpriteSelection.toLocaleLowerCase())
        if (sprite != null) buffer = await this.writeSpriteToRom(buffer, sprite)

        return new Blob([buffer], { type: 'application/octet-stream' })
    }

    private writePatchToRom(buffer: Uint8Array, patch: RomPatchStep[]): Uint8Array {
        for (let j = 0; j < patch.length; ++j) {
            const offset = patch[j].address

            for (let i = 0; i < patch[j].data.length; ++i) {
                buffer[offset + i] = patch[j].data[i]
            }
        }

        return buffer
    }

    private async writeSpriteToRom(buffer: Uint8Array, sprite: Sprite): Promise<Uint8Array> {
        for (let k = 0; k < sprite.Blobs.length; ++k) {
            const spriteBlob: SpriteBlob = sprite.Blobs[k]
            const spriteBuffer: ArrayBuffer = new Uint8Array(await spriteBlob.Blob.arrayBuffer())

            const spriteOffset = spriteBlob.Address
            for (let z = 0; z < spriteBuffer.byteLength; ++z) {
                buffer[spriteOffset + z] = spriteBuffer[z]
            }
        }

        return buffer
    }

    public downloadBlob(blob: Blob, name: string): void {
        const a = document.createElement('a')

        document.body.appendChild(a)
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        a.download = name
        a.click()
        a.remove()
    }

    public copyToClipboard(value: string): void {
        const el = document.createElement('textarea')
        el.value = value

        document.body.appendChild(el)
        el.select()

        document.execCommand('copy')
        document.body.removeChild(el)
    }
}

const uiService = new UIService()
export default uiService
