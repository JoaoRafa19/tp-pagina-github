window.onload = () => {
    fetch("https://api.github.com/users/JoaoRafa19").then((response) => response.json().then(loadContent));
    fetch('http://localhost:3000/mates').then((resp) => loadClassMates(resp));
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
    
    fetch(url).then((res) => {
        res.json().then((reposdata) => {
            let nRepos = 0;
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
                    <img class="col" src="${mate.avatar}" alt="${mate.name}">
                    <p>${mate.name}</p>
                </a>`

                $('#mates').append(element)
            }
        }
    )

}

function createRepo(repository) {
    if (repository.description) {
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
}