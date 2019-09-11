import { observable, action, decorate, toJS } from 'mobx'


class SeedGeneratorStore {
    isProcessing = false
    isError = false
    errorText = null
    expandedPanels = ['rom-details']

    difficulty = 1
    goal = 0
    mode = 0
    startLocation = 0
    seed = randomize()
    statues = 4
    file = null
    
    // Variants
    allowGlitches = false
    firebird = false
    oneHitKnockOut = false
    redJewelMadness = false

    // Enemizer
    enemizer = 'None'
    bossShuffle = false

    // Entrance
    entranceShuffle = 'None'
    dungeonShuffle = false
    overworldShuffle = false


    // Actions    
    clearError = action('clearError', () => { this.isError = false })
    clearProcessing = action('clearProcessing', () => { this.isProcessing = false })
    setError = action('setError', (text) => {
        this.isError = true
        this.errorText = text
    })
    setProcessing = action('setProcessing', () => { this.isProcessing = true })
    setFile = action('setFile', (v) => { this.file = v })
    setSeed = action('setSeed', (v) => { this.seed = v })
    setDifficulty = action('setDifficulty', (v) => { this.difficulty = v })
    setGoal = action('setGoal', (v) => { this.goal = v })
    setMode = action('setMode', (v) => { this.mode = v })
    setAllowGlitches = action('setAllowGlitches', (v) => { this.allowGlitches = v })
    setFirebird = action('setFirebird', (v) => { this.firebird = v })
    setOneHitKnockOut = action('setOneHitKnockOut', (v) => {
        this.oneHitKnockOut = v
        if (this.oneHitKnockOut === true)
            this.setRedJewelMadness(false)
    })
    setRedJewelMadness = action('setRedJewelMadness', (v) => {
        this.redJewelMadness = v
        if (this.redJewelMadness === true)
            this.setOneHitKnockOut(false)
    })
    setStatues = action('setStatues', (v) => { this.statues = v })
    setStartLocation = action('setStartLocation', (v) => { this.startLocation = v })
    setEnemizer = action('setEnemizer', (e) => { this.enemizer = e })
    setBossShuffle = action('setBossShuffle', (e) => { this.bossShuffle = e })
    randomizeSeed = action('randomizeSeed', () => { this.seed = randomize() })

    addPanel = action('addPanel', (v) => { this.expandedPanels.push(v) })
    removePanel = action('removePanel', (v) => {
        const i = this.expandedPanels.indexOf(v)
        if (i > -1) this.expandedPanels.splice(i, 1)
    })
}

function randomize() {
    const max = 2147483648
    const min = 0

    return Math.floor(Math.random() * (max - min + 1)) + min
}

decorate(SeedGeneratorStore, {
    isProcessing: observable,
    isError: observable,
    errorText: observable,
    expandedPanels: observable,
    seed: observable,
    difficulty: observable,
    goal: observable,
    mode: observable,
    statues: observable,
    file: observable,
    startLocation: observable,
    allowGlitches: observable,
    firebird: observable,
    oneHitKnockOut: observable,
    redJewelMadness: observable,
    enemizer: observable,
    bossShuffle: observable
})

const seedGeneratorStore = new SeedGeneratorStore()
export default seedGeneratorStore