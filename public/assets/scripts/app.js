import {Octokit} from 'https://esm.sh/octokit';

window.onload = () => {
    const octKit = new Octokit({});
    octKit.request('GET /users/JoaoRafa19', {
        headers: {
            'X-GitHub-Api-Version':'2022-11-28'
        }
    }).then((response) => loadContent(response.data));
    fetch('http://localhost:3000/mates').then((resp) => loadClassMates(resp));

    fetch("http://localhost:3000/content")
        .then((response) => response.json())
        .then((json) => {
            let sugestionIndicators = document.getElementById("sugestions-indicators");
            let sugestionItens = document.getElementById("sugestions-itens");
            let counter = 0;
            json.forEach(item => {
                let sugestionIndicator = document.createElement("button");
                sugestionIndicator.setAttribute("type", "button");
                sugestionIndicator.setAttribute("data-bs-target", "#carouselExampleIndicators")
                sugestionIndicator.setAttribute("data-bs-slide-to", counter)
                if (counter == 0) {
                    sugestionIndicator.setAttribute("class", "active")
                    sugestionIndicator.setAttribute("aria-current", "true")
                }
                sugestionIndicator.setAttribute("aria-label", "Slide " + (counter + 1))
                sugestionIndicators.appendChild(sugestionIndicator)
                let sugestionItem = document.createElement("div")
                if (counter == 0) {
                    sugestionItem.setAttribute("class", "carousel-item active")
                } else {
                    sugestionItem.setAttribute("class", "carousel-item")
                }
                if (item.type == "iframe") {
                    let innerDiv = document.createElement("div");
                    innerDiv.setAttribute("class", "ratio ratio-16x9")
                    let iframe = createEmbededVideo(item);
                    innerDiv.appendChild(iframe);
                    sugestionItem.appendChild(innerDiv);
                } else {
                    let div = createEmbededLink(item);
                    sugestionItem.appendChild(div);
                }
                sugestionItens.appendChild(sugestionItem);
                counter += 1;
            })
        })

}

function createEmbededVideo(json) {
    let iframe = document.createElement("iframe");
    iframe.setAttribute("class", "w-100");
    iframe.setAttribute("src", json.src);
    iframe.setAttribute("title", json.title);
    iframe.setAttribute("frameborder", json.frameborder);
    iframe.setAttribute("allow", json.allow);
    iframe.setAttribute(json.referrerpolicy, json.referrerpolicy)
    iframe.allowFullscreen = true
    return iframe;
  }
  
  function createEmbededLink(json) {
    let a = document.createElement("a");
    a.setAttribute("href", json.href);
    a.setAttribute("target", "_blank");
    let img = document.createElement("img");
    img.setAttribute("src", json.src);
    // img.setAttribute("style", "max-height: 563px;");
    img.setAttribute("class", "d-block w-100");
    img.setAttribute("alt", json.alt);
    a.appendChild(img)
    return a;
  }



// $('.page-link').on('click', async (e) => {
//     e.preventDefault()
//     const tab = Number(e.target.text.trim());
//     if(!isNaN(tab)){
//         console.log(tab)
//         //Get Page projects
//     }
//     // if(e.target.text)
// })

function loadContent(data) {
    const url = data['repos_url'] + '?sort=updated';
    $('#folowers').text(data['followers']);

    $('#about').text(data.bio)
    $('#location').text(data.location)

    fetch(url).then((res) => {
        res.json().then((reposdata) => {
            let nRepos = 0;
            console.log(reposdata)
            for (let item of reposdata) {
                if (item.description) {
                    createRepo(item);
                    nRepos++;
                }
            }
            $('#nrepos').text(`${nRepos}`)
        })
    })
}



function loadClassMates(data) {
    data.json().then(
        (json) => {
            for (let mate of json) {
                const element = `
                <a href="${mate.github}" target="_blank" class="col  col-sm-6 col-xl-2 text-center">
                    <img class="col" src="https://imageserver-navy.vercel.app${mate.avatar}" alt="${mate.name}">
                    <p>${mate.name}</p>
                </a>`

                $('#mates').append(element)
            }
        }
    )

}

function createRepo(repository) {
    
        const element = `
        <div class="col col-xl-3 col-lg-4 col-md-5 col-10 align-self-center align-content-center">
                    <div class="card p-4 text-center">
                        <div class="card-body">
                            <a href="./repo.html?repo=${repository.full_name}" style="text-decoration: none;">
                                <h5 class="card-title">${repository.name}</h5>
                            <div class="card-text">
                                 ${repository.description}
                            </div>
                            <div>
                                <a href="./repo.html" class="card-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: blue;">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg>
                                    ${repository.watchers}
                                </a>
                                <a href="./repo.html" class="card-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16" style="color: blue;">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    ${repository.stargazers_count}
                                </a>
                            </div>
                            </a>
                        </div>
                       ${repository.homepage ? `<a href="${repository.homepage}" target="_blank" class="btn btn-primary">Visitar</a>` : ''}

                    </div>
                </div>
                    `;
        $("#repos").children('#reposrow').append(element)
}