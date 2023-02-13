
type HtmlElementsList = string[]

const htmlTagsList: HtmlElementsList = [
   "address","area","article","aside","audio",
   "b","base","bdi","bdo","blockquote","body",
   "br","button","canvas","caption","cite",
   "code","col","colgroup","data","datalist",
   "dd","del","details","dfn","dialog",
   "div","dl","dt","em","embed","a","abbr",
   "fieldset","figcaption","figure", "link",
   "form","h1","h2","h3","h4","footer",
   "h5","h6","head","header","hr","html",
   "i","iframe","img","input","ins","kbd",
   "label","legend","li","link","main","map",
   "mark","meta","meter","nav","noscript",
   "object","ol","optgroup","option","output",
   "p","param","picture","pre","progress",
   "q","rp","rt","ruby","s","samp","script",
   "section","select","small","source", "g",
   "span","strong","style","sub","summary",
   "sup","svg","table","tbody","td","template",
   "textarea","tfoot","th","thead","time","title",
   "tr","track","u","ul","var","video","wbr","menu"
]

let currenthtmlTagsListList: HtmlElementsList = [...htmlTagsList]

interface ProgressData {
   toRecall: number,
   recalled: number
}

let userProgress: ProgressData = {
   toRecall: currenthtmlTagsListList.length,
   recalled: htmlTagsList.length - currenthtmlTagsListList.length
}

if (sessionStorage.getItem('user-progress-data')) {
   const storedData = sessionStorage.getItem('user-progress-data')
   currenthtmlTagsListList = [...JSON.parse(storedData as string)]
   userProgress = {
      toRecall: currenthtmlTagsListList.length,
      recalled: htmlTagsList.length - currenthtmlTagsListList.length
   }
} 

const input = document.querySelector('#input') as HTMLInputElement
const tagsCountElement = document.querySelector('[data-tags-count]') as HTMLSpanElement
const recalledTagsCount = document.querySelector('[data-tags-recalled]') as HTMLSpanElement
const submitButton = document.querySelector('[data-submit-button]') as HTMLButtonElement
const resetButton = document.querySelector('[data-reset-button]') as HTMLButtonElement
const saveProgress = document.querySelector('[data-save-progress-button]') as HTMLButtonElement

const emptyValue: string = ""
tagsCountElement.textContent = (userProgress.toRecall).toString()
recalledTagsCount.textContent = (userProgress.recalled).toString()

submitButton.addEventListener('click', handleSubmit)
resetButton.addEventListener('click', handleReset)
saveProgress.addEventListener('click', handleSaveUserProgress)

addEventListener('keydown', ({ key }) => {
   if (key === "Enter") handleSubmit()
})

function handleSaveUserProgress(): void {
   sessionStorage.setItem('user-progress-data', JSON.stringify(currenthtmlTagsListList))
   alert('Your progress is saved')
}

function handleReset(): void {
   if (confirm('Are you sure you want to reset your progress?')) {
      sessionStorage.clear()
      location.reload()
   }
}

function handleSubmit(): void {

   const inputValue: string = input.value

   if (inputValue !== emptyValue) {
      checkAnswer(inputValue)
      return
   } 

   alert("Error: You can't submit empty values")
   
}

function checkAnswer(answer: string): void {
   if (isTagExist(answer)) 
   handleRightAnswer(answer)
}

function handleRightAnswer(rightAns: string): void {
   currenthtmlTagsListList.find((tag, _, arr) => {
      if (isTagFound(tag, rightAns)) {
         userProgress.recalled = userProgress.recalled + 1
         recalledTagsCount.textContent = (userProgress.recalled).toString()
         deleteTagFromArray(arr, rightAns)
         displayNewArrayLength()
      }
   })
   input.value = ""
}

function checkArrayEmpty(): void {
   if (currenthtmlTagsListList.length === 0) {
      alert("You Are A Pro!!, You Have Remembered every html tag, Congratulations!!")
   }
}

function isTagFound(ans: string, rightAns: string): boolean {
   return ans === rightAns
}

function deleteTagFromArray(arr: string[], rightAns: string): void {
   const tagIndex = arr.indexOf(rightAns)
   currenthtmlTagsListList.splice(tagIndex, 1)
   userProgress.toRecall = currenthtmlTagsListList.length
   checkArrayEmpty()
}

function displayNewArrayLength(): void {
   tagsCountElement.textContent = (userProgress.toRecall).toString()
}

function isTagExist(tagAnswer: string) {
   return currenthtmlTagsListList.find(tag => tag == tagAnswer)
}

