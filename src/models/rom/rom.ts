import { openDB } from 'idb'
import logService from '../../services/log'

export default class Rom {
    private readonly IOG_ROM_STORAGE_KEY: string = 'iog-base-rom'

    public async set(bytes: ArrayBuffer): Promise<void> {
        await this.writeToStorage(bytes)
    }

    public async get(): Promise<Uint8Array> {
        return await this.loadFromStorage()
    }

    public async clear(): Promise<void> {
        await this.clearStorage()
    }

    public async exists(): Promise<boolean> {
        const buffer: Uint8Array = await this.loadFromStorage()
        if (buffer == null) return false

        return buffer.byteLength > -1
    }

    private async loadFromStorage(): Promise<Uint8Array> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        try {
            const obj: Uint8Array = await db.get('iogr', this.IOG_ROM_STORAGE_KEY)
            logService.debug('[loadFromStorage] Loading rom from storage', obj)

            return obj
        } catch (err) {
            return null
        } finally {
            db.close()
        }
    }

    private async writeToStorage(bytes: ArrayBuffer): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })

        logService.debug('[writeToStorage] Writing Start', bytes.byteLength)
        await db.put('iogr', bytes, this.IOG_ROM_STORAGE_KEY)
        logService.debug('[writeToStorage] Writing end')

        db.close()
    }

    private async clearStorage(): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })

        logService.debug('Deleting storage')
        await db.delete('iogr', this.IOG_ROM_STORAGE_KEY)
        db.close()
    }
}
