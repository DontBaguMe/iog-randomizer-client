import { observable, action } from 'mobx'
import Rom from '../models/rom/rom'
import Patch from '../models/rom/patch'
import logService from '../services/log'

class RomStore {
    @observable public rom: Rom = new Rom()
    @observable public patch: Patch = null

    @action public async canGenerate(): Promise<boolean> {
        return this.rom.exists()
    }

    @action public clearPatch(): void {
        logService.debug('[RomStore] Clearing patch data')
        this.patch = null
    }

    @action public clearRom(): void {
        logService.debug('[RomStore] Clearing rom data')
        this.rom.clear().then(() => (this.rom = null))
    }

    @action public clear(): void {
        logService.debug('[RomStore] Clearing all data')
        this.clearRom()
        this.clearPatch()
    }
}

const romStore = new RomStore()
export default romStore
