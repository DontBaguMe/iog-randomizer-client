import { observable, action } from 'mobx'

class UIStore {
    @observable isProcessing: boolean = false
    @observable isError: boolean = false
    @observable errorText: string | null = null

    @action public setProcessing(v: boolean): void {
        this.isProcessing = v
    }
    @action public setError(v: boolean, e: string = null): void {
        if (v) this.errorText = e
        else this.errorText = null
        this.isError = v
    }

    @action public clear() {
        this.setError(false)
        this.setProcessing(false)
    }
}

const uiStore = new UIStore()
export default uiStore
