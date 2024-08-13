const accesskey = "rq9L1IYa2daKEFTpHbMtTqq9CHmgBTri-SgTbdS4_Lk";

var formE1 = document.querySelector("form");
var inputE1 = document.getElementById("search-input");
var searchResults = document.querySelector(".search-results");
var showMore = document.getElementById("show-more-button");

let inputData = "all"; // Default query is "all"
let page = 1;

async function searchImages() {
    var url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    var response = await fetch(url);
    var data = await response.json();

    var results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        var imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        var image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        var imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

var labels = document.querySelectorAll(".h2 label");

labels.forEach(label => {
    label.addEventListener("click", (event) => {
        var id = event.target.id;
        page = 1;
        inputData = id;
        searchImagesByCategory(id);
    });
});

function searchImagesByCategory(category) {
    inputData = category;
    page = 1;
    searchImages();
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    inputData = inputE1.value;
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});

// On page load, trigger the search with the default "all" query
window.onload = () => {
    searchImages();
};

function reload(){
    window.location.reload()
}