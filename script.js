const newQuoteBtn = document.querySelector('.new-quote')
const copyQuoteBtn = document.querySelector('.copy')

const card = document.querySelector('.card')
const APIUrl = 'https://api.quotable.io/random'
async function getQuote(){
    const result = await fetch(APIUrl)
    const data = await result.json()
    // console.log(data)
    return data
}
async function renderQuote(){
    const {content, author, tags} = await getQuote()
    //  = data
    card.innerHTML = `<div class="card-head">
                <h1 class="author">${author}</h1>
                <div class="tags">
                ${tags.map(tag => 
                 `<span class="tag">${tag}</span>`   
                ).join('')}
                </div> 
            </div>
            <div class="card-body">
                <q class="quote">${content}</q>
            </div>`
    console.log(content, author, tags)
}
function copyText(){
    const text = document.querySelector('.quote')
    const feedback = document.querySelector('.feedback')
    const authorText = document.querySelector('.author')
    
    try {
        
        const selectedText = navigator.clipboard.writeText(`"${text.innerHTML}", ${authorText.innerHTML}`)
        feedback.classList.add('success')
        feedback.textContent = 'Quote Copied'
        setTimeout(()=>{
            feedback.classList.remove('success')
        }, 2000)
        
    } catch (error) {
        
        feedback.classList.add('failed')
        feedback.textContent = 'Something went wrong. Please try again.'
        setTimeout(()=>{
           feedback.classList.remove('failed') 
        }, 2000)
        
        
    }
    
    

    
}

newQuoteBtn.addEventListener('click', renderQuote)
copyQuoteBtn.addEventListener('click', copyText)
document.addEventListener('DOMContentLoaded', renderQuote)