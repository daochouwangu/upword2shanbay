document.body.addEventListener('mouseup', function (){
  if(document.selection) {
    saveWord(document.selection.createRange().text)
  } else if(window.getSelection) {
    saveWord(window.getSelection().toString())
  }
})
function saveWord(word){
  if (typeof word !== "string") {
    throw new Error("word must be string")
  }
  word = word.trim()
  if(!word) return;
  if(!/^[a-zA-Z]+$/.test(word) || word.length > 45){
    return
  }
  chrome.storage.sync.get("words", function(data){
    let words = isArray(data.words) ? data.words : []
    push(words, word)
    chrome.storage.sync.set({words: words}, function(){
      chrome.storage.sync.get("words", function(data){ console.log(data)})
    })
  });
}
function isArray(obj) {
  return obj && Array.prototype.isPrototypeOf(obj)
}
function push(arr, word) {
  if(arr.indexOf(word) > -1) {
    return
  }
  arr.push(word)
}
