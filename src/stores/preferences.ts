import { observable, action } from 'mobx'

class PreferencesStore {
    @observable sprite: string = 'Will'

    @action.bound setSprite = (v: string) => {
        this.sprite = v
    }
}

const preferencesStore = new PreferencesStore()
export default preferencesStore