const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('common'))
app.use(cors())

// require array of games
const googleapps = require('./playstore.js')

app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query

    if (sort){
        if(!['rating','app'].includes(sort)){
            return res
                .status(400)
                .send('Sort must be one of title or rank')
        }
    }

    if (genres){
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            return res 
                .status(400)
                .send('Genres must be one of action, puzzle, strategy, casual, arcade, or card')
        }
    }

    let results = googleapps.filter( play => play.App.toLowerCase().includes(search.toLowerCase()))
    
    if (sort) {
        results
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
            })
    }
    if (genres) {
        results
            .sort()
    }

    res.
        json(results)
})

app.listen(8000, () => {
    console.log('Server started on Port 8000')
})