import { observable, action } from 'mobx'

class DetailsStore {
    @observable seed: number = randomize()
    @observable difficulty: number = 1
    @observable goal: number = 0
    @observable statues: string = '4'
    @observable romIsHeadered: boolean = false
    @observable generateRaceRom: boolean = false

    @action.bound
    public setSeed = (v: number): void => {
        this.seed = v
    }

    @action.bound
    public randomizeSeed = (): void => {
        this.seed = randomize()
    }

    @action.bound
    public setDifficulty = (v: number): void => {
        this.difficulty = v
    }

    @action.bound
    public setGoal = (v: number): void => {
        this.goal = v
    }

    @action.bound
    public setStatues = (v: string): void => {
        this.statues = v
    }

    @action.bound
    public setGenerateRaceRom = (v: boolean): void => {
        this.generateRaceRom = v
    }
}

function randomize() {
    const max = 2147483648
    const min = 0

    return Math.floor(Math.random() * (max - min + 1)) + min
}

const detailsStore = new DetailsStore()
export default detailsStore
