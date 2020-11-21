export class Cache {
    constructor(state: Map<string, string>) {
        this.state = new Map(state.entries())
    }

    private state: Map<string, string>

    get size() {
        return this.state.size
    }

    get(key: string) {
        return this.state.get(key)
    }

    add(key: string, value: string) {
        if (this.state.has(key)) {
            return false
        }
        this.state.set(key, value)
        return true
    }

    update(key: string, value: string) {
        this.state.set(key, value)
        return true
    }

}
