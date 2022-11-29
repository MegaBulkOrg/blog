(function(){
    document.addEventListener('DOMContentLoaded', _ => {
        const pageTitle = document.querySelector('title'),
              articleTitle = document.querySelector('.article-title'),
              articleText = document.querySelector('.article-text'),
              commentsList = document.querySelector('.comments-list'),
              pageParams = new URLSearchParams(window.location.search),
              articleId = pageParams.get('id'); 
        async function getData(uri) {
            let request = await fetch(`https://gorest.co.in/public-api/${uri}`),
                data = await request.json();
                return data;
        }        
        async function getArticleInfo() {
            let response = await getData(`posts/${articleId}`),
                title = response.data.title,
                text = response.data.body;
            return {title, text};   
        }
        async function createArticle() {
            let info = await getArticleInfo();
            pageTitle.textContent = info.title;
            articleTitle.textContent = info.title;
            articleText.textContent = info.text;
        }
        function createCommentsListElement(commentInfo) {
            let comment = document.createElement('div');
            comment.classList.add('d-flex','mb-3');
            let commentImgWrap = document.createElement('div');
            commentImgWrap.classList.add('flex-shrink-0');
            comment.append(commentImgWrap);
            let img = document.createElement('img');
            img.setAttribute('src','https://icon-library.com/images/face-icon/face-icon-0.jpg');
            img.setAttribute('width','64');
            img.setAttribute('height','64');
            commentImgWrap.append(img);
            let commentBody = document.createElement('div');
            commentBody.classList.add('flex-grow-1', 'ms-3');
            comment.append(commentBody);
            let title = document.createElement('h5');
            title.textContent = commentInfo.name;
            let email = document.createElement('span');
            email.classList.add('badge','text-bg-warning', 'ms-2', 'text-white', 'email');
            email.textContent = commentInfo.email
            title.append(email);
            commentBody.append(title);
            let text = document.createElement('p');
            text.textContent = commentInfo.body;
            commentBody.append(text);
            commentsList.append(comment);
        }
        function emptyCommentsListMsg() {
            let msg = document.createElement('p');
            msg.textContent = 'Пока нет ни одного комментария'
            commentsList.append(msg);
        }
        async function createCommentsList() {
            let response = await getData(`comments?post_id=${articleId}`);
            if(!response.data.length) {
                emptyCommentsListMsg();
            } else {
                for (comment of response.data) { 
                    createCommentsListElement(comment)
                }
            }
        }
        createArticle();
        createCommentsList();
    })
})();