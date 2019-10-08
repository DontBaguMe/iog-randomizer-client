import { observable, action, decorate } from 'mobx'


class EntranceStore {
    entranceShuffle = 0
    dungeonShuffle = false
    overworldShuffle = false

    setEntranceShuffle = action('setEntranceShuffle', (v) => { this.entranceShuffle = v })
    setDungeonShuffle = action('setDungeonShuffle', (v) => { this.dungeonShuffle = v })
    setOverworldShuffle = action('setOverworldShuffle', (v) => { this.overworldShuffle = v })
}


decorate(EntranceStore, {
    entranceShuffle: observable,
    dungeonShuffle: observable,
    overworldShuffle: observable
})

const entranceStore = new EntranceStore()
export default entranceStore