import { observable, action, computed } from 'mobx'
import Rom from '../models/rom/rom'
import Patch from '../models/rom/patch'
import logService from '../services/log'

class RomStore {
    @observable public rom: Rom = new Rom()
    @observable public patch: Patch = null

    @computed public get canGenerate(): boolean {
        return this.rom.exists()
    }

    @action public async init(): Promise<void> {
        await this.rom.get()
    }

    @action public clearPatch(): void {
        logService.debug('Clearing patch data')
        this.patch = null
    }

    @action public clearRom(): void {
        logService.debug('Clearing rom data')
        this.rom.clear().then(() => (this.rom = null))
    }

    @action public clear(): void {
        this.clearRom()
        this.clearPatch()
    }
}

const romStore = new RomStore()
export default romStore
