import { observable, action } from 'mobx'

class VariantsStore {
    @observable logic = 0
    @observable startLocation = 0
    @observable allowGlitches = false
    @observable oneHitKnockOut = false
    @observable firebird = false
    @observable redJewelMadness = false

    @action.bound setLogic = (v: number): void => {
        this.logic = v
    }
    @action.bound setStartLocation = (v: number): void => {
        this.startLocation = v
    }
    @action.bound setAllowGlitches = (v: boolean): void => {
        this.allowGlitches = v
    }
    @action.bound setFirebird = (v: boolean): void => {
        this.firebird = v
    }
    @action.bound setOneHitKnockOut = (v: boolean): void => {
        this.oneHitKnockOut = v
        if (this.oneHitKnockOut === true) this.setRedJewelMadness(false)
    }
    @action.bound setRedJewelMadness = (v: boolean): void => {
        this.redJewelMadness = v
        if (this.redJewelMadness === true) this.setOneHitKnockOut(false)
    }
}

const variantsStore = new VariantsStore()
export default variantsStore
