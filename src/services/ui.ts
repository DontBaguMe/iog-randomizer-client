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
    public createSpoilerBlob(spoiler: Spoiler): Blob {
        const data = JSON.stringify(spoiler, undefined, 2)
        return new Blob([data], { type: 'text/json' })
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
