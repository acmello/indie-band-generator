{
  const app = () => {
    
    let words = null
    
    /**
     * Get all the words from the JSON file.
     * @param  {String} countryAcronym String containing the country acronym
     * @return {Promise} a list of all the words based on the country
     */
    const getWords = countryAcronym = 'BR' => {
        if (! words) {
          return fetch('resources/words.json')
            .then(response => response.json())
            .then(words => words = words[countryAcronym].words)
            .catch(err => {
              throw new Error('(getWords) unable  to get words.json', err)
            })
        } else {
          return Promise.defer().resolve(words)
        }
    } 
    /**
     * Generates a random combination based on the name's list provided.
     * @param  {Array} words all the available words.
     * @return {Promise} Promise containing the generated words.
     */
    const getWordCombination = words => {
       let firstPiece = words[Math.floor(Math.random() * words.length)]
       let lastPiece  = words[Math.floor(Math.random() * words.length)]
       
       return new Promise(resolve => {
          return resolve({firstPiece, lastPiece})
       })
    }
    
    /**
     * Display the name on the screen.
     * @param  {Object} wordCombination the two words combined.
     */
    const render = wordCombination => {
        const {firstPiece, lastPiece} = wordCombination
        document.querySelector('.YSIBN__generated-name')
            .innerText = `${firstPiece} ${lastPiece}` 
    }
    
    /** 
     * Callback that gets called when the user 
     * hit the generate button.
     */
    const generateStupidName = () => {
        return fetch('resources/words.json')
          .then(getWords)
          .then(getWordCombination)
          .then(render)
          .catch(err => {
              throw new Error('Unable to start the Application', err) 
          })
    }
    
    console.log('Application started.')
    
    document.querySelector('.YSIBN__button')
        .addEventListener('click', generateStupidName)
  }
  
  // kick off the app
  document.addEventListener('DOMContentLoaded', app)
}