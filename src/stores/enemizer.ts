import { observable, action } from 'mobx'

class EnemizerStore {
    @observable enemizer = 0
    @observable bossShuffle = false

    @action.bound setEnemizer = v => {
        this.enemizer = v
    }
    @action.bound setBossShuffle = v => {
        this.bossShuffle = v
    }
}

const enemizerStore = new EnemizerStore()
export default enemizerStore
