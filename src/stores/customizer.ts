import { observable } from 'mobx'
import { Abilities } from '../models/customizer/abilities'
import { DarkSpace } from '../models/customizer/darkspaces'

class CustomizerStore {
    @observable public Abilities: Abilities = {
        PsychoDash: DarkSpace.Random,
        PsychoSlider: DarkSpace.Random,
        SpinDash: DarkSpace.Random,
        DarkFriar: DarkSpace.Random,
        AuraBarrier: DarkSpace.Random,
        EarthQuacker: DarkSpace.Random,
    }
}

const customizerStore = new CustomizerStore()
export { customizerStore }