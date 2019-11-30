let app = document.getElementById('app');
chrome.storage.sync.get('words', function(data) {
  let words = data.words
  if (!words || !Array.prototype.isPrototypeOf(words)) return;
  for(let i in words) {
    let node = document.createElement("li");
    let text = document.createTextNode(words[i]);
    node.addEventListener('click', removeChild.bind(this, words[i]))
    node.appendChild(text)
    app.appendChild(node)
  }
});
function removeChild(word) {
  let app = document.getElementById('app');
  if(!app || app.children.length === 0) {
    return 
  }
  let removed;
  for (let i of app.children){
    if (i.textContent === word) {
      removed = i;
      break;
    }
  }
  if (!removed) {
    return;
  }
  chrome.storage.sync.get('words', function(data) {
    let words = data.words
    if (!words || !Array.prototype.isPrototypeOf(words)) return;
    if (words.indexOf(word) == -1) {
      return
    }
    words.splice(words.indexOf(word), 1)
    chrome.storage.sync.set({words: words})
  });
  
  app.removeChild(removed)
}
document.getElementById("upload").addEventListener("click", uploadFnc)
function uploadFnc(){
  window.open("https://web.shanbay.com/wordsweb/#/collection")
}
