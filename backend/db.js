const mongoose = require('mongoose')
const mongoURI =
  'mongodb+srv://frhanqazi11:frhanqazi11@cluster0.k5rgp8p.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log('...', err)
    else {
      console.log('connected')
      const fetched_data = await mongoose.connection.db.collection('food_items')
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          'food_category'
        )
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err)
          else {
            global.food_items = data
            global.food_category = catData
            // console.log((global.food_items = data))
          }
        })
      })
    }
  })
}
module.exports = mongoDB
