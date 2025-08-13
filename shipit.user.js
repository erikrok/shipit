// ==UserScript==
// @name         shipit
// @namespace    http://asottile.com/
// @version      0.2
// @author       asottile
// @match        https://github.com/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function () {
    var urls = [];
  
    GM.xmlHttpRequest({
      method: "GET",
      url: "https://chriskuehl.github.io/shipit",
      onload: function (resp) {
        if (resp.status === 200) {
          var parser = new DOMParser();
          var html = parser.parseFromString(resp.response, "text/html").body;
          html.querySelectorAll("#shipit img").forEach(function (e) {
            urls.push(e.src);
          });
        }
      },
    });
  
    document.documentElement.addEventListener("click", function (e) {
      var msg;
      if (
        urls.length &&
        e.target.name === "reviewEvent" &&
        e.target.value === "approve"
      ) {
        console.log("inside");
        debugger;
        // msg = document.querySelector('#pull_request_review_body')
        var results = document.querySelectorAll("textarea");
  
        // keep the a textarea which has placeholder attribute like "Leave a comment"
        msg = Array.from(results).filter(function (textarea) {
          return (
            textarea.placeholder &&
            textarea.placeholder.includes("Leave a comment")
          );
        });
  
        msg[0].value = `${msg[0].value}\n\n![](${
          urls[Math.floor(Math.random() * urls.length)]
        })`;
      }
    });
})();
