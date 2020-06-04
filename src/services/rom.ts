import romStore from '../stores/rom'
//import { settingsStore } from '../stores/settings'

//import spriteBaguFirst from '../assets/sprites/bagu/1a8000.bin'

//import spriteBaguSecond from '../assets/sprites/bagu/1a8000.bin'

class RomService {
    // public async createPatchedRomBlob(): Promise<Blob> {
    //     const patch = romStore.patch
    //     const sprite = settingsStore.sprite

    //     const buffer: Uint8Array = await romStore.rom?.get()

    //     if (!patch || !buffer) return null

    //     for (let j = 0; j < patch.patchData.length; ++j) {
    //         const offset = patch.patchData[j].address

    //         for (let i = 0; i < patch.patchData[j].data.length; ++i) {
    //             buffer[offset + i] = patch.patchData[j].data[i]
    //         }
    //     }

    //     return new Blob([buffer], { type: 'application/octet-stream' })
    // }

    public createSpoilerBlob(): Blob {
        const spoiler = romStore.patch.spoilerFilename
        const data = JSON.stringify(spoiler, undefined, 2)
        return new Blob([data], { type: 'text/json' })
    }

    public async removeHeader(): Promise<void> {
        const offset = await this.getOffset()

        const hasHeader = offset > 0
        if (hasHeader) {
            const buffer: Uint8Array = await romStore.rom?.get()
            const unheadered = buffer.slice(offset)

            await romStore.rom.set(unheadered)
        }
    }

    private async getOffset(): Promise<number> {
        const buffer: Uint8Array = await romStore.rom?.get()
        const header = [0x49, 0x4c, 0x4c, 0x55, 0x53, 0x49, 0x4f, 0x4e, 0x20, 0x4f, 0x46, 0x20, 0x47, 0x41, 0x49, 0x41, 0x20, 0x55, 0x53, 0x41]
        let offset = -1

        for (let i = 0xffc0; i < buffer.length; ++i) {
            // If we've found the offset, don't bother with the remainder
            if (offset > -1) break

            // If we've found the first element in the sequence
            if (buffer[i] === header[0]) {
                // Get a segment
                if (buffer.length < i + 20) return offset

                const segment = buffer.slice(i, i + 20)

                let isValid = segment.length === header.length
                if (!isValid) continue

                for (let j = 0; j < header.length; ++j) {
                    if (header[j] !== segment[j]) {
                        isValid = false
                        break
                    }
                }

                if (isValid) offset = i - 0xffc0
            }
        }

        return offset
    }
}

const romService = new RomService()
export default romService
