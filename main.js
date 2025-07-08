let title = document.getElementById("title");
let description = document.getElementById("description");
let image_url = document.getElementById("image_url");
let category = document.getElementById("category");
let condition = document.getElementById("condition");
let form = document.getElementById("form");
let button = document.getElementById("button");
let loader = document.getElementById("loader");
let boxOne = document.getElementById("box");
title.addEventListener("input", e => {
    e.preventDefault();
    let regEx = /^[a-zA-Z]{3,9}$/
    if (regEx.test(title.value)) {
        title.style.boxShadow = "2px 2px 10px green";
        title.style.border = "1px solid green";
        button.style.display = "block";
    }else {
        title.style.border = "none"
        title.style.border = "1px solid red";
        title.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";

    }
})
description.addEventListener("input", e => {
    e.preventDefault();
    let regEx_two = /^[a-zA-Z]{2,12}$/
    if (regEx_two.test(description.value)) {
        description.style.boxShadow = "2px 2px 10px green";
        description.style.border = "1px solid green";
        button.style.display = "block";
    }else {
        description.style.border = "none"
        description.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";
        description.style.border = "1px solid red";
        errors.textContent = "Kamida 2ta harf va kopida 12ta harf bulishi shart"
        errors.style.color = "red"

    }
})
image_url.addEventListener("input", e => {
    e.preventDefault();
    let regex_three = /^https:\/\//;
    if (regex_three.test(image_url.value)) {
        image_url.style.boxShadow = "2px 2px 10px green";
        image_url.style.border = "1px solid green";
        button.style.display = "block";
    }else {
        image_url.style.border = "none"
        image_url.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";
        image_url.style.border = "1px solid red";
        errors.textContent = "textni boshi faqat https:// bilan boshlanishi kerak"
        errors.style.color = "red"
    }
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main()
})
async function main() {
    loader.style.display = "block";
    try {
        let data = await fetch("https://effective-mobile.duckdns.org/api/ads/" ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                image_url: image_url.value,
                category: category.value,
                condition: condition.value,
            })
        });
        title.value = "";
        description.value = "";
        image_url.value = "";
        category.value = "";
        condition.value = "";
        if (data.ok) {
            alert("success bro");
            get()
        }else {
            alert("error akam");
        }
    }catch(err) {
        console.log(err)
        alert("error bolayapdi");
    }
    finally {
        loader.style.display = "none";
    }
}
async function get() {
    loader.style.display = "block";
    boxOne.innerHTML = "";
    try {
        let getData = await fetch("https://effective-mobile.duckdns.org/api/ads/");
        let result = await getData.json();

        if (result.results && result.results.length > 0) {
            forData(result.results)
        }else {
            alert("Malumot topilmadi ?");
        }
    }catch(err) {
        console.log(err)
        alert(" ikkinchi try cacheda error ");
    }
    finally {
        loader.style.display = "none";
    }
}
function forData(result) {
    boxOne.innerHTML = ``
    result.forEach((item) => {
        let elementDiv = document.createElement("div");
        elementDiv.innerHTML = `
        <div class="datajs">
        <img class="images" src="${item.image_url}" alt="${item.image_url}">
        <p>${"Nomi: "+item.title}</p>
        <p>${"Holati: "+item.description}</p>
        <span class="selectOne">${item.category}</span>
        <span class="selectTwo">${item.condition}</span>
        
        </div>`
        boxOne.appendChild(elementDiv)
    })
}
get()
