import { observable, action } from 'mobx'

class RomStore {
    @observable originalFile = null
    @observable patchData = null
    @observable patchName = null
    @observable spoilerData = null
    @observable spoilerName = null

    @action.bound
    public clear() {
        this.patchData = null
        this.patchName = null
        this.spoilerData = null
        this.spoilerName = null
    }

    @action.bound
    public setOriginalFile = f => {
        this.originalFile = f
    }

    @action.bound
    public setPatchData = (d, n) => {
        this.patchData = d
        this.patchName = n
    }

    @action.bound
    public setSpoilerData = (d, n) => {
        this.spoilerData = d
        this.spoilerName = n
    }
}

const romStore = new RomStore()
export default romStore
