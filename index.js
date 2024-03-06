function news() {
    const newslist = document.getElementById("newsList");
    const firstcontent = document.getElementById("firstcontent");
    const page1 = document.getElementById("page1");
    const apikey = '316a0545437e4a16a922f370809fb0b1';
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=';

    newslist.style.display='flex';
    newslist.style.flexWrap= "wrap";

    fetch(apiUrl + apikey)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.articles && data.articles.length > 0) {
                const firstArticle = data.articles[0];

                page1.style.background = `url('${firstArticle.urlToImage}') no-repeat center`;
                page1.style.backgroundSize = 'cover';
                firstcontent.innerHTML = `<h2 style="text-align: center;">${firstArticle.title}</h2><p style="text-align: center; font-size: 1rem;">${firstArticle.description}</p> <button class="button" onclick="readMore('${firstArticle.url}')">Read More</button>`;
                // Corrected the button style property
                document.querySelector('.button').style.height = '3rem';

                data.articles.forEach(article => {
                    if (article.urlToImage != null) {
                        const div = document.createElement('div');
                        div.classList.add('article');

                        const img = document.createElement('img');
                        img.src = article.urlToImage;
                        img.alt = 'News Image';

                        div.appendChild(img);
                        div.innerHTML += `<h2>${article.title}</h2>`;
                        div.innerHTML += `<p>${article.description}</p>`;
                        div.innerHTML += `<a href=${article.url}>Read More...</a>`;

                        newslist.appendChild(div);
                    }
                });
            }
        })

        .catch(error => console.log('Error:', error));

        
}
