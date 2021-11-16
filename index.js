const express = require('express')
const dotenv = require('dotenv')
const pa11y = require('pa11y')
const fetch = require('node-fetch')
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public/public'))

app.get('/api/issues', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({
      error: 'Required URL',
    })
  } else {
    try {
      const results = await pa11y(req.query.url)
      res.status(200).json(results)
    } catch (error) {
      res.status(400).json({
        error: 'Invalid URL!',
      })
    }
  }
})

app.get('/api/insight', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({
      error: 'Required URL',
    })
  } else {
    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&key=${process.env.API_KEY}&category=SEO&category=PERFORMANCE&strategy=DESKTOP`,
    )
      .then((response) => response.json())
      .then((data) => res.status(200).json(data))
  }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
