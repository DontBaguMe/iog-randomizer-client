import { observable, action } from 'mobx'

class EntranceStore {
    @observable entranceShuffle = 0
    @observable dungeonShuffle = false
    @observable overworldShuffle = false

    @action.bound setEntranceShuffle = v => {
        this.entranceShuffle = v
    }
    @action.bound setDungeonShuffle = v => {
        this.dungeonShuffle = v
    }
    @action.bound setOverworldShuffle = v => {
        this.overworldShuffle = v
    }
}

const entranceStore = new EntranceStore()
export default entranceStore
