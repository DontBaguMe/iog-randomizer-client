import { observable, action, decorate } from 'mobx'


class UIStore {
    isProcessing = false
    hasDownload = false
    isError = false
    errorText = null

    romUri = null
    romName = null
    spoilerUri = null
    spoilerName = null
    
    setDownloading = action('setDownloading', (v) => { this.hasDownload = v })
    setProcessing = action('setProcessing', (v) => { this.isProcessing = v})
    setError = action('setError', (v, e) => {
        if (v) this.errorText = e
        else this.errorText = null
        this.isError = v
    })
    setRomURI = action('setRomURI', (v) => { this.romUri = v })
    setRomName = action('setRomName', (v) => { this.romName = v })
    setSpoilerUri = action('setRomURI', (v) => { this.spoilerUri = v })
    setSpoilerName = action('setRomName', (v) => { this.spoilerName = v })
}


decorate(UIStore, {
    isProcessing: observable,    
    isError: observable,
    hasDownload: observable,
    errorText: observable,
    romUri: observable,
    romName: observable,
    spoilerUri: observable,
    spoilerName: observable
})

const uiStore = new UIStore()
export default uiStore