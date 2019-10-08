import { observable, action, decorate } from 'mobx'


class EnemizerStore {
    enemizer = 0
    bossShuffle = false

    setEnemizer = action('setEnemizer', (v) => { this.enemizer = v })
    setBossShuffle = action('setBossShuffle', (v) => { this.bossShuffle = v })
}


decorate(EnemizerStore, {
    enemizer: observable,
    bossShuffle: observable
})

const enemizerStore = new EnemizerStore()
export default enemizerStore