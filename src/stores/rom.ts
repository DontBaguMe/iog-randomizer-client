import { observable, action } from 'mobx'
import { openDB } from 'idb'

import RomPatchStep from '../models/rom/patch-step'
import PatchStorageData from '../models/rom/patch-storage-data'

const IOG_ROM_STORAGE_KEY: string = 'iog-base-rom'

class RomStore {
    @observable private baseRom: ArrayBuffer = null
    @observable public patchData: RomPatchStep[] = null
    @observable public patchName: string = null
    @observable public spoilerData: string = null
    @observable public spoilerName: string = null
    @observable public patchHistory: PatchStorageData[] = []

    @action.bound
    public clear() {
        this.patchData = null
        this.patchName = null
        this.spoilerData = null
        this.spoilerName = null
    }

    @action.bound
    public async setOriginalFile(file: ArrayBuffer): Promise<void> {
        this.baseRom = file
        await this.persistArrayBufferToStorage(IOG_ROM_STORAGE_KEY, file)
    }

    @action.bound
    public setPatchData(patchData: RomPatchStep[], patchName: string, permalinkId: string) {
        this.patchData = patchData
        this.patchName =
            patchName
                .split('.')
                .slice(0, -1)
                .join('.') + `_${permalinkId}.sfc`
    }

    @action.bound
    public setSpoilerData = (spoilerData: string, spoilerName: string) => {
        this.spoilerData = spoilerData
        this.spoilerName = spoilerName
    }

    @action.bound
    public async loadRomFromStorage(): Promise<void> {
        const rom = await this.loadArrayBufferFromStorage(IOG_ROM_STORAGE_KEY)
        if (!rom || rom.byteLength === 0) return

        this.baseRom = rom
    }

    @action
    public getBaseRom(): ArrayBuffer {
        if (!this.baseRom) return new ArrayBuffer(0)
        const buffer = new ArrayBuffer(this.baseRom.byteLength)
        new Uint8Array(buffer).set(new Uint8Array(this.baseRom))

        return buffer
    }

    public hasBaseRom(): boolean {
        return this.baseRom && this.baseRom.byteLength > 0
    }

    @action.bound
    public async clearRom(): Promise<void> {
        this.baseRom = null
        await this.destroyArrayBufferFromStorage(IOG_ROM_STORAGE_KEY)
    }

    private async persistArrayBufferToStorage(key: string, buffer: ArrayBuffer): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        await db.put('iogr', new Uint8Array(buffer), key)

        db.close()
    }

    private async destroyArrayBufferFromStorage(key: string): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        await db.delete('iogr', key)

        db.close()
    }

    private async loadArrayBufferFromStorage(key: string): Promise<ArrayBuffer> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        try {
            const obj: Uint8Array = await db.get('iogr', key)
            const buffer: ArrayBuffer = obj.buffer

            return buffer
        } catch (err) {
            return null
        } finally {
            db.close()
        }
    }
}

const romStore = new RomStore()
export default romStore
