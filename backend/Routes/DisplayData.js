const express = require('express')
const router = express.Router()

router.post('/foodData', (req, res) => {
  try {
    res.send([global.food_items, global.food_category])
  } catch {
    console.log('Eoor')
    console.error(error.message)
    res.send('Server error')
  }
})
module.exports = router
