
const addBookmarkButton = document.getElementById("addBookmark");


if (addBookmarkButton) {
    addBookmarkButton.addEventListener("click", () => {
        chrome.tabs.getSelected(null, (tab) => {
            addBookmark(tab.title, tab.url);
        });
    })
}  


addBookmark = (title, url) => {
    console.log(title);
    console.log(url);
    chrome.cookies.get({url: "http://localhost:3000/dashboard", name: "accessToken"}, (cookie) => {
        
        let token = cookie.value;
        let headers = new Headers();

        headers.append("Content-Type", "application/json");

        if (token !== "null") {
            headers.append("Authorization", "Bearer " + token);
        } else {
            headers.append("Authorization", null);
        };

        fetch("http://localhost:8080/api/bookmarks/analyse", {
            method: "POST",
            headers: headers,
            body: url,
        }).then(response => {
            return response.json();
        }).then(data => {
            let tags = data;
            fetch("http://localhost:8080/api/bookmarks/add", {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: JSON.stringify({name: title, url: url, tags: tags})
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(response);
            })
        }).catch(error => {
            console.log(error);
        })
    });
}
