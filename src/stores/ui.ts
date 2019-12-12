import { observable, action } from 'mobx'

class UIStore {
    @observable isLoadingOriginalRom: boolean = false
    @observable isProcessing: boolean = false
    @observable isError: boolean = false
    @observable errorText: string | null = null
    @observable version: string = '0.0.0'

    @action.bound public setLoadingOriginalRom(v: boolean): void { this.isLoadingOriginalRom = v }
    @action.bound public setVersion(v: string): void { this.version = v }
    @action.bound public setProcessing(v: boolean): void { this.isProcessing = v }
    @action.bound public setError(v: boolean, e: string = null): void {
        if (v) this.errorText = e
        else this.errorText = null
        this.isError = v
    }
}

const uiStore = new UIStore()
export default uiStore
