import { Cache } from "./cache"

describe('new Cache()', () => {
    test('can start empty', () => {
        const cache = new Cache(new Map())
        expect(cache.size).toBe(0)
    })

    test('can start with keys', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.size).toBe(1)
    })
})

describe('get()', () => {
    test('non-existing key should return undefined', () => {
        const state = new Map()
        const cache = new Cache(state)
        expect(cache.get('A:1')).toBeUndefined()
    })

    test('existing key should return value', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.get('A:1')).toBe('value')
    })
})

describe('add()', () => {
    test('non-existing key should succeed', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.add('A:2', 'VALUE')).toBe(true)
        expect(cache.size).toBe(2)
        expect(cache.get('A:2')).toBe('VALUE')
    })

    test('existing key should fail', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.add('A:1', 'VALUE')).toBe(false)
        expect(cache.size).toBe(1)
        expect(cache.get('A:1')).toBe('value')
    })
})

describe('update()', () => {
    test('non-existing key should succeed', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.update('A:2', 'VALUE')).toBe(true)
        expect(cache.size).toBe(2)
        expect(cache.get('A:2')).toBe('VALUE')
    })

    test('existing key should succeed', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)
        expect(cache.update('A:1', 'VALUE')).toBe(true)
        expect(cache.size).toBe(1)
        expect(cache.get('A:1')).toBe('VALUE')
    })
})

describe('removeOldest()', () => {
    test('does nothing on an empty list', () => {
        const cache = new Cache(new Map())

        expect(() => cache.removeOldest()).not.toThrow()
    })

    test('existing key should succeed', () => {
        const state = new Map([
            ['A:1', 'value']
        ])
        const cache = new Cache(state)

        cache.removeOldest()

        expect(cache.size).toBe(0)
    })
})
