import { app } from "./api";
import { Cache } from "./service/cache";

const port = process.env.PORT || 8080
const cache = new Cache(new Map())
app(cache).listen(port)
