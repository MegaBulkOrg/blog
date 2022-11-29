import {renderStart} from './mod_main.js'
async function getData(url) {
    let request = await fetch(url),
        data = await request.json();
    return data;
}  
export function render(info) {
    const headTitle = document.querySelector('title'), 
          pageTitle = document.querySelector('h1');
    headTitle.textContent = info.title;
    pageTitle.textContent = `${info.title} (эпизод №${info.episode_id})`;
    const episodeContainer = document.createElement('div');
    const back = document.createElement('a');
    back.classList.add('btn','btn-danger','mt-2');
    back.textContent = 'Назад к списку эпизодов'
    back.href = '../spa'
    episodeContainer.append(back);
    back.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, null, this.href);
        renderStart();
    })
    const description = document.createElement('p');
    description.classList.add('mt-3');
    description.textContent = info.opening_crawl;
    episodeContainer.append(description);
    function preloaderCreate() {
        const preloader = document.createElement('img');
        preloader.src = 'https://thumbs.gfycat.com/SmoothDependableIzuthrush-max-1mb.gif';
        preloader.alt = 'Подожди чутка ;)';
        return preloader;
    }
    const planetListTitle = document.createElement('h2');
    planetListTitle.textContent = 'Список планет, встречающихся в эпизоде';
    episodeContainer.append(planetListTitle);
    const planetList = document.createElement('ul');
    planetList.append(preloaderCreate());
    let planetPagesList = [];
    for (let planet of info.planets) {
        planetPagesList.push(planet)
    }
    Promise.all(planetPagesList.map(page => getData(page))).then(planetInfo => {
        planetList.querySelector('img').remove();
        planetInfo.forEach(planet => {
            const planetElement = document.createElement('li');
            planetElement.textContent = planet.name;
            planetList.append(planetElement); 
        })
    })
    episodeContainer.append(planetList);
    const raceListTitle = document.createElement('h2');
    raceListTitle.textContent = 'Список рас, встречающихся в эпизоде';
    episodeContainer.append(raceListTitle);
    const raceList = document.createElement('ul');
    raceList.append(preloaderCreate());
    let racePagesList = [];
    for (let race of info.species) {
        racePagesList.push(race)
    }
    Promise.all(racePagesList.map(page => getData(page))).then(raceInfo => {
        raceList.querySelector('img').remove();
        raceInfo.forEach(race => {
            const raceElement = document.createElement('li');
            raceElement.textContent = race.name;
            raceList.append(raceElement); 
        })
    })
    episodeContainer.append(raceList);
    const characterListTitle = document.createElement('h2');
    characterListTitle.textContent = 'Список персонажей, встречающихся в эпизоде';
    episodeContainer.append(characterListTitle);
    const characterList = document.createElement('ul');
    characterList.append(preloaderCreate());
    let characterPagesList = [];
    for (let character of info.characters) {
        characterPagesList.push(character)
    }
    Promise.all(characterPagesList.map(page => getData(page))).then(characterInfo => {
        characterList.querySelector('img').remove();
        characterInfo.forEach(character => {
            const characterElement = document.createElement('li');
            characterElement.textContent = character.name;
            characterList.append(characterElement); 
        })
    })
    episodeContainer.append(characterList);
    return episodeContainer;
}