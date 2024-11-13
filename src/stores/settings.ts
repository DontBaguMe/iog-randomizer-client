import { observable } from 'mobx'
import { generateRandomSeedValue } from '../functions/generate-random'

class SettingsStore {
    @observable public seed: number = generateRandomSeedValue()
    @observable public difficulty: number = 1
    @observable public enemizer: number = 0
    @observable public goal: number = 0
    @observable public statues: string = '4'
    @observable public statuesReq: number = 0
    @observable public raceRom: boolean = false
    @observable public townShuffle: boolean = false
    @observable public coupledExits: boolean = true
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
    @observable public orbRando: boolean = false
    @observable public darkRooms: number = 0
    @observable public cursedRooms: boolean = false
    @observable public z3mode: boolean = false
    @observable public muteMusic: boolean = false
    @observable public flute: number = 0
    @observable public infiniteInventory: boolean = false
    @observable public dsWarp: boolean = false
    @observable public hide_settings: boolean = false
    @observable public returnSpoiler: boolean = false
}

const settingsStore = new SettingsStore()
export { settingsStore }
