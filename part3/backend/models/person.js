const mongoose = require('mongoose')

const url = process.env.DB_URL

// Connect MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log('MongoDB Connection Succeeded.'))
  .catch((error) => console.log(`Error in DB connection: ${error}`))

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  date: { type: Date, default: new Date().toLocaleDateString('us') },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
