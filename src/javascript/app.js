{
  const app = () => {
    
    words = null
    
    /**
     * [getWords description]
     * @param  {[type]} countryAcronym [description]
     * @return {Promise}                [description]
     */
    const getWords = countryAcronym => {
        if (! words) {
          return fetch('resources/words.json')
            .then(response => response.json())
            .then(words => words = words['BR'].words)
            .catch(err => {
              throw new Error('(getWords) unable  to get words.json', err)
            })
        } else {
          return Promise.defer().resolve(words)
        }
    } 
    /**
     * [getWordCombination description]
     * @param  {Array} words [description]
     * @return {Promise}       [description]
     */
    const getWordCombination = words => {
       let firstPiece = words[Math.floor(Math.random() * words.length)]
       let lastPiece  = words[Math.floor(Math.random() * words.length)]
       
       return new Promise(resolve => {
          return resolve({firstPiece, lastPiece})
       })
    }
    
    /**
     * [render description]
     * @return {[type]} [description]
     */
    const render = wordCombination => {
        const {firstPiece, lastPiece} = wordCombination
        document.querySelector('.YSIBN__generated-name')
            .innerText = `${firstPiece} ${lastPiece}` 
    }
    
    /**
     * [init description]
     * @return {[type]} [description]
     */
    const generateStupidName = () => {
        console.log('Application started.')
      
        fetch('resources/words.json')
          .then(getWords)
          .then(getWordCombination)
          .then(render)
          .catch(err => {
              throw new Error('Unable to start the Application', err) 
          })
    }
    
    document.querySelector('.YSIBN__button')
        .addEventListener('click', generateStupidName)
  }
  
  document.addEventListener('DOMContentLoaded', app)
}