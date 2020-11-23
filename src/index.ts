import { app } from "./api";
import { Cache } from "./service/cache";
import { LRU } from "./service/eviction-strategy";

const port = process.env.PORT || 8080
const maxItems = process.env.LRU_MAX_ITEMS
const eviction = maxItems ? new LRU(parseInt(maxItems, 10)) : undefined
const cache = new Cache(new Map(), eviction)
app(cache).listen(port)
