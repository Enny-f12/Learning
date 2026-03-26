const axios = require('axios')

// Logic for random joke
exports.getQuotes = async (req, res, next) => { try {

  const response = await axios.get('https://official-joke-api.appspot.com/random_joke')
  res.json({
    type: 'Success Test',
    setup: response.data.setup,
    punchline: response.data.punchline
  })
} catch (error) { next(error)
}
}

exports.getTechyPhrase = async (req, res, next) => {
  try {
    // Using the JSON endpoint as shown in the 'Techy' documentation image
    const response = await axios.get('https://techy-api.vercel.app/api/json')

    res.json({
      source: 'Public APIs - Techy',
      phrase: response.data.message
    })
  } catch (error) {

    next(error)
  }
}
