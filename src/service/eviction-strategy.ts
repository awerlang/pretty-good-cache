import { Cache } from "./cache";
import { Item } from "./linked-list";

export interface EvictionStrategy {
    added(cache: Cache, item: Item<string>): void
}

export class None implements EvictionStrategy {
    added(cache: Cache, item: Item<string>): void {
    }
}

export class LRU implements EvictionStrategy {
    constructor(private maxItems: number) { }

    added(cache: Cache, item: Item<string>): void {
        if (cache.size > this.maxItems) {
            cache.removeOldest()
        }
    }

}
