import {renderStart} from './mod_main.js'
export function render(info) {
    const epCardsContainer = document.createElement('div');
    epCardsContainer.classList.add('row','d-flex','justify-content-between','p-5');
    for(let episode of info.results) {
        const epCard = document.createElement('div'),
              seeMore = document.createElement('a'),
              epCardBody =  document.createElement('div'),
              title = document.createElement('h5'),
              epNo = document.createElement('span');
        epCard.classList.add('card','mb-2');       
        epCard.append(seeMore)
        epCardBody.classList.add('card-body');
        seeMore.append(epCardBody);
        epNo.classList.add('badge','badge-dark');
        epCardBody.append(epNo);
        title.classList.add('card-title');
        epCardBody.append(title);
        seeMore.href = `?episode=${episode.episode_id}`
        title.textContent = episode.title;
        epNo.textContent = episode.episode_id;
        seeMore.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, this.href);
            renderStart();
        })
        epCardsContainer.append(epCard)
    }
    return epCardsContainer;
}