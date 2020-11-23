import { Cache } from "./cache"
import { LRU } from "./eviction-strategy"

describe('LRU', () => {
    test('does nothing when threshold was not surpassed ', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state, new LRU(2))

        cache.add('A:2', 'VALUE')

        expect(cache.size).toBe(2)
    })

    test('removes oldest item when above threshold ', () => {
        const state = new Map([
            ['A:1', 'value'],
            ['B:1', 'value']
        ])
        const cache = new Cache(state, new LRU(2))

        cache.add('A:2', 'VALUE')
        cache.add('B:2', 'VALUE')

        expect(cache.size).toBe(2)
        expect(cache.get('A:1')).toBeUndefined()
        expect(cache.get('B:1')).toBeUndefined()
    })
})