const express = require('express')
const pa11y = require('pa11y')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public/public'))

app.get('/api/test', async (req, res) => {
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
