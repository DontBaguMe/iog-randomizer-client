const fs = require('fs')

function createHeaderedRom(input, output) {
    const rom = fs.readFileSync(input)
    const buffer = Buffer.alloc(rom.length + 512)

    for (let i = 0; i < 512; ++i)
        buffer.writeUInt8(0x0, i)

    for (let i = 0; i < rom.length; ++i) {
        const d = rom.readUInt8(i)
        buffer.writeUInt8(d, i + 512)
    }

    fs.writeFileSync(output, buffer)
}

function checkIfRomIsHeadered(input) {
    const position = 0xFFC0
    const header = '494C4C5553494F4E204F46204741494120555341'

    const rom = fs.readFileSync(input)
    const offset = rom.indexOf(header, 0, 'hex')

    return offset !== position
}

function removeHeaderFromRom(input, output) {
    const rom = fs.readFileSync(input)
    const buffer = Buffer.alloc(rom.length - 512)    

    for (let i = 0; i < buffer.length; ++i) {
        const offset = 512 + i
        const b = rom.readUInt8(offset)

        buffer.writeUInt8(b, i)
    }

    fs.writeFileSync(output, buffer)
}
