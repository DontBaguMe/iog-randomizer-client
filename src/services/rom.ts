import romStore from '../stores/rom'

class RomService {
    public createSpoilerBlob(): Blob {
        const spoiler = romStore.patch.spoilerFilename
        const data = JSON.stringify(spoiler, undefined, 2)
        return new Blob([data], { type: 'text/json' })
    }

    public removeHeader(buffer: Uint8Array): Uint8Array {
        const offset = this.getOffset(buffer)

        const hasHeader = offset > 0
        if (hasHeader) {
            const unheadered = buffer.slice(offset)

            return unheadered
        }

        return buffer
    }

    public extendRomSize(buffer: Uint8Array, extended_size: number): Uint8Array {
        let new_buffer = new (Uint8Array)(buffer.length + extended_size)
        new_buffer.set(buffer, 0)
        return new_buffer
    }

    private getOffset(buffer: Uint8Array): number {
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
