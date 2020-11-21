import express from 'express'

import { Cache } from '../service/cache'

export function app(cache: Cache) {
    const app = express()
    app.use(express.raw({ type: 'text/plain' }))

    app.get('/:key', (req, res) => {
        const key = req.params.key
        const value = cache.get(key)
        if (value === undefined) {
            res.status(404).send()
            return
        }
        res.send(value)
    })

    app.post('/:key', (req, res) => {
        const key = req.params.key
        const value = req.body.toString()
        if (cache.add(key, value)) {
            res.status(201).send()
        } else {
            res.status(409).send()
        }
    })

    app.put('/:key', (req, res) => {
        const key = req.params.key
        const value = req.body.toString()
        cache.update(key, value)
        res.status(204).send()
    })

    return app
}
