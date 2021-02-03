const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'please provide a password as an argument: node mongo.js <password> Anna 040-1234556'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.ypsc6.mongodb.net/phonebook?retryWrites=true&w=majority`

// Connect MongoDB
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.')
    } else {
      console.log('Error in DB connection: ' + err)
    }
  }
)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  date: { type: Date, default: new Date().toLocaleDateString('us') },
})

// Compile model from schema
var Person = mongoose.model('person', personSchema)

//add person
if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
    date: new Date().toLocaleDateString('us'),
  })
  person.save().then(() => {
    console.log(`successfully added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

// Return Persons
else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach(({ name, number }) => {
      console.log(`${name}  ${number}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log('The arguments doesnt meet any format')
  mongoose.connection.close()
}
