const mongoose = require('mongoose')

if (process.argv.length < 3  || process.argv.length === 4 || process.argv.length > 5) {
    console.log('unexpected number of arguments')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
    `mongodb+srv://epigram666:${password}@cluster0.nto6kol.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const schema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', schema)

if (newName && newNumber) {
    const person = new Person ({
        name: newName,
        number: newNumber
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}