let downloadedCss = {};
function loader(resource) {
    if (resource.endsWith('.js')) {
        return import(resource)
    }
    if (resource.endsWith('.css')) {
        if (!downloadedCss.flie) {
            let cssFile = document.createElement('link');
            cssFile.rel = 'stylesheet';
            cssFile.href = resource
            downloadedCss.flie = new Promise((ok,error) =>{
                cssFile.addEventListener('load', _ => {
                    ok()
                })
            });
            document.head.append(cssFile);
        }
        return downloadedCss.flie;
    }
    return fetch(resource).then(
        response => response.json(),
        errMsg => `Что-то пошло не так. ${errMsg}`
    )
}
const appContainer = document.getElementById('app');
function renderPage(module,apiUrl,css) {
    Promise.all([module,apiUrl,css].map(resource => loader(resource)))
    .then(
        ([listPageModule,episodesInfo]) => {
            appContainer.innerHTML = '';
            appContainer.append(listPageModule.render(episodesInfo));
        },
        errMsg => console.log(errMsg)
    );
}
export function renderStart() {
    let urlGet = new URLSearchParams(location.search),
        episodeId = urlGet.get('episode');
    if (episodeId) {
        renderPage('./mod_ep_details.js',`https://swapi.dev/api/films/${episodeId}/`,'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css')
    } else {
        renderPage('./mod_ep_list.js','https://swapi.dev/api/films/','https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css')
    }
}
window.addEventListener('popstate', function(){
    renderStart();
})
renderStart();