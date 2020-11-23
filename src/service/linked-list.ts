export interface Head<V> {
    next: Item<V> | Tail<V>
}

export interface Tail<V> {
    previous: Item<V> | Head<V>
}

export interface Item<V> {
    next: Item<V> | Tail<V>
    previous: Item<V> | Head<V>
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
