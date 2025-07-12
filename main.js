let title = document.getElementById("title");
let description = document.getElementById("description");
let image_url = document.getElementById("image_url");
let category = document.getElementById("category");
let condition = document.getElementById("condition");
let form = document.getElementById("form");
let button = document.getElementById("button");
let loader = document.getElementById("loader");
let boxOne = document.getElementById("box");
let output_div = document.getElementById("output_div");
let i = false
let id
title.addEventListener("input", e => {
    e.preventDefault();
    let regEx = /^[a-zA-Z0-9\s]{3,9}$/
    if (regEx.test(title.value)) {
        title.style.boxShadow = "2px 2px 10px green";
        title.style.border = "1px solid green";
        button.style.display = "block";
    } else {
        title.style.border = "none"
        title.style.border = "1px solid red";
        title.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";

    }
})
description.addEventListener("input", e => {
    e.preventDefault();
    let regEx_two = /^[a-zA-Z0-9\s0]{2,15}$/
    if (regEx_two.test(description.value)) {
        description.style.boxShadow = "2px 2px 10px green";
        description.style.border = "1px solid green";
        button.style.display = "block";
    } else {
        description.style.border = "none"
        description.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";
        description.style.border = "1px solid red";

    }
})
image_url.addEventListener("input", e => {
    e.preventDefault();
    let regex_three = /^https:\/\//;
    if (regex_three.test(image_url.value)) {
        image_url.style.boxShadow = "2px 2px 10px green";
        image_url.style.border = "1px solid green";
        button.style.display = "block";
    } else {
        image_url.style.border = "none"
        image_url.style.boxShadow = "2px 2px 10px red";
        button.style.display = "none";
        image_url.style.border = "1px solid red";
    }
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main()
})

async function main() {
    loader.style.display = "block";
    try {
        if (i) {
            let put = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/` , {
                method: "PUT",
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
            })
            if (put.ok) {
                alert("success edit brother");
                get()
            } else {
                alert("error akam ❌");
            }
        }else {
            let data = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
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
            if (data.ok) {
                alert("success bro");
                get()
            } else {
                alert("error akam");
            }
        }
        title.value = "";
        description.value = "";
        image_url.value = "";
        category.value = "";
        condition.value = "";
    } catch (err) {
        console.log(err)
        alert("error bolayapdi");
    } finally {
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
        } else {
            alert("Malumot topilmadi ?");
        }
    } catch (err) {
        console.log(err)
        alert(" ikkinchi try cacheda error ");
    } finally {
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
        <p>${"Nomi: " + item.title}</p>
        <p>${"Holati: " + item.description}</p>
        <span class="selectOne">${item.category}</span>
        <span class="selectTwo">${item.condition}</span>
        
        </div>
        <span class="btnjs">
        <button data-id="${item.id}" class="btnEdit">edit</button>
        <button data-id="${item.id}" class="btn_delete">delete</button>
        </span>

`
        boxOne.appendChild(elementDiv)

    })
    let editBtn = document.querySelectorAll(".btnEdit");
    editBtn.forEach(e => {
        e.addEventListener("click", (e) => {
            e.preventDefault();
            renDer(e.target.getAttribute("data-id"))
            id = e.target.getAttribute("data-id");
            console.log(id)
        })
    })
    let delete_btn = document.querySelectorAll(".btn_delete");
    delete_btn.forEach(e => {
        e.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id"); // ✅ shu yerda id ni olamiz
            document.getElementById("yes").setAttribute("data-id", id);
            output_div.style.display = "block";
        });
    });
    modem()
}

function modem() {
    let yesBtn = document.getElementById("yes");
    let noBtn = document.getElementById("no");
    let xBtn = document.getElementById("X_button");

    let newYesBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);


    newYesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.getAttribute("data-id");
        deleteRender(id);
    });

    noBtn.addEventListener("click", (e) => {
        e.preventDefault();
        output_div.style.display = "none";
    });

    xBtn.addEventListener("click", (e) => {
        e.preventDefault();
        output_div.style.display = "none";
    });
}


async function renDer(id) {
    let dataId = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`);
    let resultId = await dataId.json();
    title.value = resultId.title;
    description.value = resultId.description;
    image_url.value = resultId.image_url;
    category.value = resultId.category;
    condition.value = resultId.condition;
    alert("edit qilindi ✅")
    i = true
}

async function deleteRender(id) {
    let deleteID = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/` ,{
        method: "DELETE"
    });
    if (deleteID.ok) {
        alert("O'chirib tashlandi ✅");
        get()
    }else {
        alert("O'chirib bolmadi ❌");
    }
    output_div.style.display = "none";
}

get()
