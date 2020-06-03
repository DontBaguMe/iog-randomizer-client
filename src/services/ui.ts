import { Spoiler } from '../models/rom/spoiler'
import RomPatchStep from '../models/rom/patch-step'
import romStore from '../stores/rom'

class UIService {
    public createSpoilerBlob(spoiler: Spoiler): Blob {
        const data = JSON.stringify(spoiler, undefined, 2)
        return new Blob([data], { type: 'text/json' })
    }

    public async createRomBlobAsync(data: RomPatchStep[]): Promise<Blob> {
        const rom: ArrayBuffer = await romStore.rom?.get()

        if (!data || !rom) return null

        const buffer = new Uint8Array(rom)

        for (let j = 0; j < data.length; ++j) {
            const offset = data[j].address

            for (let i = 0; i < data[j].data.length; ++i) {
                buffer[offset + i] = data[j].data[i]
            }
        }

        return new Blob([buffer], { type: 'application/octet-stream' })
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
