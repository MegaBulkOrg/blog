(function(){
    document.addEventListener('DOMContentLoaded', _ => {
        const container = document.querySelector('.container'),
              articlesList = document.querySelector('.articles-list'),              
              pageParams = new URLSearchParams(window.location.search),
              listPageNo = pageParams.get('page'),      
              queryUrl = listPageNo===null ? 'posts' : `posts?page=${listPageNo}`
        async function getData() {
            let request = await fetch(`https://gorest.co.in/public-api/${queryUrl}`),
                data = await request.json();
                return data;
        }
        function createArticlesListElement(articleInfo) {
            let li = document.createElement('li');
            li.classList.add('list-group-item','d-flex','align-items-center','mb-3')
            let anchor = document.createElement('a');
            anchor.setAttribute('href', `article.html?id=${articleInfo.id}`);
            anchor.textContent = articleInfo.title
            li.append(anchor);
            articlesList.append(li);
        }
        async function createArticlesList() {
            let response = await getData();
            for (article of response.data) {
                createArticlesListElement(article);
            }
        }
        function createPaginationElement(pageNo, list) {            
            let li = document.createElement('li');
            li.classList.add('page-item');
            let a = document.createElement('a');
            a.classList.add('page-link');
            pageNo===1 ? a.setAttribute('href','/') : a.setAttribute('href',`?page=${pageNo}`)
            a.textContent = pageNo;
            li.append(a);
            list.append(li);
        }
        async function createPagination() {
            let response = await getData(),
                nav = document.createElement('nav');
            nav.classList.add('mt-5','mb-5');
            let ul = document.createElement('ul');
            ul.classList.add('pagination','d-flex','justify-content-center','d-flex','flex-wrap')
            for (i=1; i<=response.meta.pagination.pages; i++) {
                createPaginationElement(i, ul)
            }
            nav.append(ul);
            container.append(nav);
        }
        createArticlesList();
        createPagination()
    })
})();