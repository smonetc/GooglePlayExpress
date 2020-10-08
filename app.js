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
        if(!['Rating','App'].includes(sort)){
            return res
                .status(400)
                .send('Sort must be one of rating or app')
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
        results.filter( function (result){
            return result.Genres === genres
        })
    }

    res.
        json(results)
})

module.exports = app