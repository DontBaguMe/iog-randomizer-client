import detailsStore from '../stores/details'
import uiStore from '../stores/ui'

class RomService {
    writeRom(patch, patchFilename) {
        const buffer = new Uint8Array(detailsStore.file)

        for (let j = 0; j < patch.length; ++j) {
            const offset = patch[j].address

            for (let i = 0; i < patch[j].data.length; ++i) {
                buffer[offset + i] = patch[j].data[i]
            }
        }        

        const file = new Blob([buffer], { type: 'application/octet-stream'})
        uiStore.setRomName(patchFilename)
        uiStore.setRomURI(window.URL.createObjectURL(file))
        
    }

    writeSpoiler(spoiler, spoilerFilename) {
        const blob = new Blob([spoiler], { type: 'text/plain'})
        uiStore.setSpoilerUri(window.URL.createObjectURL(blob))
        uiStore.setSpoilerName(spoilerFilename)
    }

    removeHeader() {
        const offset = this.getOffset()

        const hasHeader = offset > 0
        if (hasHeader) {
            const buffer = new Uint8Array(detailsStore.file)
            const unheadered = buffer.slice(offset)
    
            detailsStore.setFileFromBuffer(unheadered)
        }        
    }

    getOffset() {
        const buffer = new Uint8Array(detailsStore.file)        
        const header = [0x49, 0x4C, 0x4C, 0x55, 0x53, 0x49, 0x4F, 0x4E, 0x20, 0x4F, 0x46, 0x20, 0x47, 0x41, 0x49, 0x41, 0x20, 0x55, 0x53, 0x41]
        let offset = -1

        for (let i = 0xFFC0; i < buffer.length; ++i) {
            // If we've found the offset, don't bother with the remainder
            if (offset > -1)
                break

            // If we've found the first element in the sequence
            if (buffer[i] === header[0]) {
                // Get a segment
                if (buffer.length < i + 20)
                    return offset
                    
                const segment = buffer.slice(i, i + 20)

                let isValid = segment.length === header.length
                if (!isValid)
                    continue

                for (let j = 0; j < header.length; ++j) {
                    if (header[j] !== segment[j]) {
                        isValid = false
                        break
                    }
                }

                if (isValid)
                    offset = i - 0xFFC0
            }
        }

        return offset
    }
}


const romService = new RomService()
export default romService