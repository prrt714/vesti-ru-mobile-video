const regex = /^(?:https?:\/\/)?(?:www\.)?(?:vesti.ru)?\/doc.html\?id=(\d+).*$/i;

var scanAndModify = function (elm) {
  var article = elm.getElementsByClassName("article"), f;
  if (!article) return;
  for (var i in article) {
    f = article[i];
    if (f.tagName !== "DIV") continue;
    var videoLink = f.querySelector(".article__video-link");
    if (!videoLink) continue;
    var docId;
    var share = f.querySelector("span[data-yasharelink]");//getElementsByClassName("share")
    if (!share) continue;
    docId = share.getAttribute("data-yasharelink").match(regex);
    if (!docId) continue;
    docId = docId[1];
    videoLink.href = "http://mobile.vesti.ru/v/" + docId + ".480.mp4";
    videoLink.removeAttribute("data-video-url");
    videoLink.setAttribute("target", "_blank");
    videoLink.classList.remove("article__video-link");
    videoLink.style.textDecoration = "none";
    videoLink.style.position = "relative";
    videoLink.style.display = "block";
  }
};

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    scanAndModify(mutation.target);
  });
});

// pass in the target node, as well as the observer options
observer.observe(document, { childList: true, subtree: true });
