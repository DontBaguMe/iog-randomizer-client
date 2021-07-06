import { observable } from 'mobx'
import { generateRandomSeedValue } from '../functions/generate-random'

class SettingsStore {
    @observable public seed: number = generateRandomSeedValue()
    @observable public difficulty: number = 1
    @observable public enemizer: number = 0
    @observable public goal: number = 0
    @observable public statues: string = '4'
    @observable public raceRom: boolean = false
    @observable public entranceShuffle: number = 0
    @observable public dungeonShuffle: boolean = false
    @observable public overworldShuffle: boolean = false
    @observable public bossShuffle: boolean = false
    @observable public sprite: string = 'Will'
    @observable public logic: number = 0
    @observable public startLocation: number = 0
    @observable public openWorld: boolean = false
    @observable public allowGlitches: boolean = false
    @observable public oneHitKnockOut: boolean = false
    @observable public redJewelMadness: boolean = false
    @observable public firebird: boolean = false
    @observable public z3mode: boolean = false
    @observable public muteMusic: boolean = false
    @observable public fluteless: boolean = false
}

const settingsStore = new SettingsStore()
export { settingsStore }
