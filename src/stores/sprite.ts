import { observable, action } from 'mobx'
import { Sprite } from '../models/sprite/sprite'

class SpriteStore {
    @observable public baguSprite: Sprite | null = null
    @observable public invisibleSprite: Sprite | null = null

    @action public setBaguSprite(sprite: Sprite): void {
        this.baguSprite = sprite
    }

    @action public setInvisibleSprite(sprite: Sprite): void {
        this.invisibleSprite = sprite
    }
}

const spriteStore = new SpriteStore()
export default spriteStore
