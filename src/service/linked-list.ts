export interface Head<V> {
    next: Item<V> | Tail<V>
}

export interface Tail<V> {
    previous: Item<V> | Head<V>
}

export interface Item<V> {
    next: Item<V> | Tail<V>
    previous: Item<V> | Head<V>
    key: string
    value: V
}

export function link<V>(previous: Item<V> | Head<V>, next: Item<V> | Tail<V>) {
    previous.next = next
    next.previous = previous
}

export function unshiftItem<V>(item: Item<V>, head: Head<V>) {
    link(item, head.next)
    link(head, item)
}

export function spliceItem<V>(item: Item<V>) {
    const { next, previous } = item
    link(previous, next)
}

export function isItem<V>(item: Item<V> | Head<V> | Tail<V>): item is Item<V> {
    return (item as Item<V>).value !== undefined
}