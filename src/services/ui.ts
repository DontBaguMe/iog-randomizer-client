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
        if (Array.isArray(spoiler.statues_required)) {
            data.push(`Statues Required,${spoiler.statues_required.join(' ')}`)
        }
        else {
            data.push(`Statues Required,${spoiler.statues_required}`)
        }
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

    public async createRomBlobAsync(data: RomPatchStep[], fluteless: boolean): Promise<Blob> {
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

        const muteMusic = settingsStore.muteMusic
        if (muteMusic !== false) buffer = await this.muteRomMusic(buffer)

        if (fluteless !== false) buffer = await this.hideFluteInRom(buffer)

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

    private async muteRomMusic(buffer: Uint8Array): Promise<Uint8Array> {
        // Locations of all music tracks in ROM
        const musicAddrs = [0xC0000, 0xD7007, 0x1071A0, 0x111233, 0x120000, 0x121793,
            0x1273AE, 0x1371DA, 0x141CFC, 0x143017, 0x144290, 0x14670F, 0x15338D, 0x157329,
            0x15F39C, 0x163553, 0x17C443, 0x186037, 0x19D266, 0x1A4B72, 0x1B49B7, 0x1C5C8D,
            0x1D4F6B, 0x1D57FC, 0x1E2A6E, 0x1E6B33, 0x1E6C12, 0x1F2BCB]

        // Loop through all music tracks
        for (var addr of musicAddrs) {
            // Number of instruments = value of first byte divided by 6
            let numInstruments: number = buffer[addr] / 6

            // Overwrite each instrument's second byte with 0x00
            for (let i = 0; i < numInstruments; ++i) {
                buffer[addr + 5 + 6 * i] = 0x00
            }
        }

        return buffer
    }

    private async hideFluteInRom(buffer: Uint8Array): Promise<Uint8Array> {
        // Locations of all flute pixels in ROM
        const fluteAddrs = [[0x1a8540, 0x60], [0x1a8740, 0x60], [0x1aa120, 0x40], [0x1aa560, 0x20],
        [0x1aa720, 0x60], [0x1aa8e0, 0x80], [0x1aab00, 0x20], [0x1aac60, 0x40], [0x1aae60, 0x40],
        [0x1ab400, 0x80], [0x1ab600, 0x80], [0x1ab800, 0x40], [0x1aba00, 0x40]]

        // Loop through all flute sprite locations
        for (var i = 0; i < fluteAddrs.length; i++) {
            // Overwrite flute pixels
            for (var j = 0; j < fluteAddrs[i][1]; j++) {
                buffer[fluteAddrs[i][0] + j] = 0x00
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
