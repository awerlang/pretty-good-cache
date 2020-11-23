import { Head, Tail, Item, unshiftItem, spliceItem, link } from "./linked-list"

export class Cache {
    constructor(state: Map<string, string>) {
        const head = {} as Head<string>, tail = {} as Tail<string>
        link(head, tail)
        this.head = head
        this.tail = tail

        this.state = new Map()
        state.forEach((value, key) => {
            this.add(key, value)
        })
    }

    private state: Map<string, Item<string>>
    private head: Head<string>
    private tail: Tail<string>

    get size() {
        return this.state.size
    }

    get(key: string) {
        const item = this.state.get(key)
        if (item) {
            spliceItem(item)
            unshiftItem(item, this.head)
            return item.value
        }
    }

    add(key: string, value: string) {
        if (this.state.has(key)) {
            return false
        }

        const item = { value } as Item<string>
        unshiftItem(item, this.head)
        this.state.set(key, item)
        return true
    }

    update(key: string, value: string) {
        const item = this.state.get(key)
        if (item) {
            item.value = value
            spliceItem(item)
            unshiftItem(item, this.head)
        } else {
            this.add(key, value)
        }
        return true
    }

}
