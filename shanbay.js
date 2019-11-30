(0, function() {
  chrome.storage.sync.get("words", function(data){
    let words = isArray(data.words) ? data.words : []
    var xhr = new XMLHttpRequest();
    if(!words || words.length == 0) {
      return
    }
    xhr.open("POST", "https://apiv3.shanbay.com/wordscollection/words_bulk_upload", true);
    xhr.onload = function (res) {
      alert("上传成功")
      chrome.storage.sync.clear(function(){console.log("清空完毕")})
    }
    xhr.onerror = function(e) {
      alert("上传失败")
      console.error(e)
    };
    xhr.withCredentials = true
    console.log(words)
    xhr.send(JSON.stringify({
      business_id: 6,
      words: words
    }));
  });
  function isArray(obj) {
    return obj && Array.prototype.isPrototypeOf(obj)
  }
})()
