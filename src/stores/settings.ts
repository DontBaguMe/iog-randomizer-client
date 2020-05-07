import { observable } from 'mobx'


class SettingsStore {
    @observable public seed: number = this.randomize()
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


    public randomize(): number {
        const max = 2147483648
        const min = 0

        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

const settingsStore = new SettingsStore()
export { settingsStore }