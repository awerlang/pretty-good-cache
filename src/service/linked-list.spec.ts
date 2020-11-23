import { Item, link, unshiftItem, spliceItem, isItem } from "./linked-list"

describe('link()', () => {
    test('links two items', () => {
        const first = {} as Item<any>
        const second = {} as Item<any>

        link(first, second)

        expect(first.next === second).toBe(true)
        expect(second.previous === first).toBe(true)
    })
})

describe('unshiftItem()', () => {
    test('adds item to the front', () => {
        const head = {} as Item<any>
        const tail = {} as Item<any>
        link(head, tail)

        const item = { value: '123' } as Item<string>
        unshiftItem(item, head)

        expect(head.next === item).toBe(true)
        expect(tail.previous === item).toBe(true)
    })
})

describe('spliceItem()', () => {
    test('removes item', () => {
        const head = {} as Item<any>
        const tail = {} as Item<any>
        link(head, tail)
        const item = { value: '123' } as Item<string>
        unshiftItem(item, head)

        spliceItem(item)

        expect(head.next === tail).toBe(true)
        expect(tail.previous === head).toBe(true)
    })
})

describe('isItem()', () => {
    test('returns true for an item', () => {
        const item = { value: '123' } as Item<string>

        const result = isItem(item)

        expect(result).toBe(true)
    })

    test('returns false for a non-item', () => {
        const item = {} as Item<string>

        const result = isItem(item)

        expect(result).toBe(false)
    })
})