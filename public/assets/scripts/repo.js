window.onload = async () => {
    const params = window.location.search

    const urlParams = new URLSearchParams(params);
    const repoFullName = urlParams.get('repo');
    const repo = await loadRepo(repoFullName);
    const data = parseData(repo);
    setData(data);
}

function setData(data) {
    $('#reponame').text(data.name);
    $('#creation_date').text(data.created_at.split(',')[0])
    $('#descricao').text(data.description);
    $('#language').text(data.language)

    for (let topic of data.topics) {
        const element = document.createElement('span');
        element.innerHTML = `<span class="badge rounded-pill bg-primary p-2 m-1">${topic}</span>`;
        $('#topics').append(element)
    }

    $('#stars').text(data.stars)
    $('#watchers').text(data.watchers)
    $('#htmlurl').attr('href', data.url)
    if (data.homepage) {
        $("#homepage").attr('href', data.homepage);
        $("#homepage").attr('hidden', false);
    }
}

function parseData(repo) {
    const date = new Date(repo.created_at).toLocaleString('pt-BR')
    return {
        "name": repo.full_name,
        "description": repo.description,
        "created_at": date,
        "language": repo.language,
        "topics": repo.topics,
        "stars": repo.stargazers_count,
        "url": repo.html_url,
        "homepage": repo.homepage,
        "watchers": repo.watchers_count
    }
}

async function loadRepo(repoFullName) {
    const data = await fetch(`https://api.github.com/repos/${repoFullName}`);
    return await data.json();
}