const regex = /^(?:https?:\/\/)?(?:www\.)?(?:vesti.ru)?\/doc.html\?id=(\d+).*$/i;

let debounce = function (fn, timeout, invokeAsap) {
  var timer;
  return function () {
    var args = arguments;
    invokeAsap && !timer && fn.apply(this, args);
    clearTimeout(timer);
    timer = setTimeout(function () {
      !invokeAsap && fn.apply(this, args);
      timer = null;
    }, timeout);
  };
};

let quality;

let scanAndModify = debounce(function () {
  var article = document.querySelector(".article");
  if (!article) return;
  if (article.tagName !== "DIV") return;
  var videoLink = article.querySelector("a[data-video-url]");
  if (!videoLink) return;
  var docId;
  var share = article.querySelector("span[data-yasharelink]");//getElementsByClassName("share")
  if (!share) return;
  docId = share.getAttribute("data-yasharelink").match(regex);
  if (!docId) return;
  docId = docId[1];
  videoLink.href = "http://mobile.vesti.ru/v/" + docId + "." + quality + ".mp4";
  videoLink.removeAttribute("data-video-url");
  videoLink.removeAttribute("data-video-type");
  videoLink.setAttribute("target", "_blank");
}, 500, false);

let observer = new MutationObserver(scanAndModify);

self.port.on("detach", function () {
  observer.disconnect();
});

self.port.on("attached", function (prefs) {
  quality = prefs.quality;
  observer.observe(document, { childList: true, subtree: true });
});