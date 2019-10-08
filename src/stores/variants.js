import { observable, action, decorate } from 'mobx'


class VariantsStore {
    logic = 0
    startLocation = 0
    allowGlitches = false
    oneHitKnockOut = false
    firebird = false
    redJewelMadness = false

    setLogic = action('setLogic', (v) => { this.logic = v })
    setStartLocation = action('setStartLocation', (v) => { this.startLocation = v })
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
}

decorate(VariantsStore, {
    logic: observable,
    startLocation: observable,
    allowGlitches: observable,
    oneHitKnockOut: observable,
    firebird: observable,
    redJewelMadness: observable
})

const variantsStore = new VariantsStore()
export default variantsStore