import { observable, action } from 'mobx'

class UIStore {
    @observable isProcessing = false
    @observable isError = false
    @observable errorText = null

    @action.bound setProcessing = (v: boolean): void => {
        this.isProcessing = v
    }

    @action.bound setError = (v: boolean, e: string = null): void => {
        if (v) this.errorText = e
        else this.errorText = null
        this.isError = v
    }
}

const uiStore = new UIStore()
export default uiStore
