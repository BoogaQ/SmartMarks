const addBookmarkButton = document.getElementById("addBookmark");

function addBookmarks(title, url) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  fetch("http://localhost:8080/api/bookmarks/analyse", {
      method: "POST",
      body: url,
      headers: headers
  }).then(response => {
      return response.json();
  }).then(data => {
      let tags = data;
      console.log(tags);
      fetch("http://localhost:8080/api/bookmarks/add", {
          method: "POST",
          mode: "cors",
          headers: headers,
          body: JSON.stringify({name: title, url: url, tags: tags})
      }).then(response => {
          console.log(response);
      }).catch(error => {
          console.log(error);
      })
  }).catch(error => {
      console.log(error);
  })
}

function getCookies() {
  browser.cookies.getAll({}).then(cookies => {console.log(cookies)});
}
function getCurrentTab() {
  var querying = browser.tabs.query({currentWindow: true, active: true});
  querying.then(tab => {
    console.log(tab[0].title);
    addBookmarks(tab[0].title, tab[0].url);
  }, onError);
}
addBookmarkButton.addEventListener("click", () => {
  getCurrentTab();
})