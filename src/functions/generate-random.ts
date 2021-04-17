export function generateRandomSeedValue(): number {
    const max = 2147483648
    const min = 0

    return Math.floor(Math.random() * (max - min + 1)) + min
}
