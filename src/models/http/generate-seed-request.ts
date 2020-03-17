export default interface GenerateSeedRequest {
    seed: number
    generateRaceRom: boolean
    difficulty: number
    goal: number
    statues: string
    startLocation: number
    logic: number
    allowGlitches: boolean
    ohko: boolean
    redJewelMadness: boolean
    firebird: boolean
    enemizer: number
    bossShuffle: boolean
    entranceShuffle: number
    dungeonShuffle: boolean
    overworldShuffle: boolean
    openMode: boolean
    sprite: string
}
