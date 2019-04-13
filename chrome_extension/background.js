const asd = null;
window.addEventListener("DOMContentLoaded", () => {
    const title = document.title;
    const url = window.location.href;
    console.log(url);

    chrome.browserAction.onClicked.addListener((tab) => {
    
        chrome.cookies.get({url: "http://localhost:3000/dashboard", name: "accessToken"}, (cookie) => {
            let token = cookie.value;
            
            let headers = new Headers();
    
            if (token !== "null") {
                headers.append("Authorization", "Bearer " + token);
            } else {
                headers.append("Authorization", null);
            };
    
            chrome.storage.local.get("accessToken", (result) => {
                console.log(result);
            })
            fetch("http://localhost:8080/api/bookmarks/analyse", {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(url),
            }).then(response => {
                console.log(response.data);
                fetch("http://localhost:8080/api/bookmarks/analyse", {
                    method: "POST",
                    mode: "cors",
                    headers: headers,
                    body: JSON.stringify({name: title, url: url, tags: response.data})
                }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(response);
                })
            }).catch(error => {
                console.log(error);
            })
        })
    })
})


