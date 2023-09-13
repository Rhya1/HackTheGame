const BASE_URL = "https://api.rawg.io/api/games";
const API_KEY = "9269195f491e44539d7a2d10ce87ab15";
const QUERIES = "&page_size=40&dates=2022-03-01,2023-04-01&platforms=18,1,7";
fetch(`${BASE_URL}?key=${API_KEY}${QUERIES}`)
.then(response => response.json())
.then(data => {
    const dataClone = structuredClone(data)
    const games = dataClone.results
    console.log(games)
    
    const filterMetaCritics = games.filter(game => game.metacritic !== null).sort((a, b) => b.metacritic - a.metacritic)
    
    function getGameDetail(data, name) {
        
        return data.find(game => {
            return game.name == name 
        })
        
    }
    
    const responseGame = getGameDetail(games, sessionStorage.getItem("nameGame"))
    
    console.log(responseGame)
    
    const iconsPlatformsGame = document.querySelector('#iconsPlatformsGame');
    const playtime = document.querySelector('#playtime');
    const name = document.querySelector('#name');
    
    const plotReviews = document.querySelector('#plotReviews');
    const platforms = document.querySelector('#platforms');
    
    
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), #000), url(${responseGame.background_image})`;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    
    
    responseGame.parent_platforms.forEach(parentPlatform => {
        if (parentPlatform.platform.name == 'PC') {
            let img = document.createElement('img')
            img.src = "./downloads/client-mac.png"
            iconsPlatformsGame.append(img)
        }
        if (parentPlatform.platform.name == 'PlayStation') {
            let img = document.createElement('img')
            img.src = "./downloads/play-station.png"
            iconsPlatformsGame.append(img)
        }
        if (parentPlatform.platform.name == 'Xbox') {
            let img = document.createElement('img')
            img.src = "./downloads/xbox.png"
            iconsPlatformsGame.append(img)
        }
        if (parentPlatform.platform.name == 'Nintendo') {
            let img = document.createElement('img')
            img.src = "./downloads/nintendo-switch.png"
            iconsPlatformsGame.append(img)
        }
        if (parentPlatform.platform.name == 'Linux') {
            let img = document.createElement('img')
            img.src = "./downloads/linux.png"
            iconsPlatformsGame.append(img)
        }
    });
    
    
    playtime.textContent = responseGame.playtime
    name.textContent = responseGame.name
    
    responseGame.ratings.forEach(rating => {
        let div = document.createElement('div')
        div.classList.add("progress", "bg-transparent", "rounded-0", "my-2")
        div.innerHTML = `
        
        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${rating.percent}%">
        <p class="f-p text-secondary m-0 text-white"> ${rating.title} - ${rating.percent} %</p>  
        </div>
        `
        plotReviews.append(div)
        
    })
    
    responseGame.platforms.forEach(platform => {
        let li = document.createElement('li')
        li.classList.add("f-p", "text-white", "small", "mx-2")
        li.innerText = platform.platform.name 
        platforms.append(li)
    })
    
    
    const carouselIndicators = document.querySelector(".carousel-indicators");
    const carouselInner = document.querySelector(".carousel-inner");
    
    
    carouselInner.querySelector(".active").children[0].src = responseGame.short_screenshots[0].image;
    
    
    for (let i = 1; i < responseGame.short_screenshots.length; i++) {
        let div = document.createElement("div");
        div.classList.add("carousel-item");
        div.innerHTML = 
        `
        <img src="${responseGame.short_screenshots[i].image}" class="d-block w-100" alt="...">        
        `;
        carouselInner.append(div);
        let button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-bs-target", "#carouselExampleIndicators")
        button.setAttribute("data-bs-slide-to", `${i}`)
        button.ariaLabel = `Slide ${i+1}`;
        carouselIndicators.append(button);
    }
    
    const storeWrapper = document.querySelector("#storeWrapper");
    
    for (let i = 0; i < responseGame.stores.length; i++) {
        console.log(responseGame.stores[i].store.name);
        let div = document.createElement("div");
        div.classList.add("col-12", "col-xl-6");
        div.innerHTML =
        `
        <button class="btn btn-outline-light w-100 mb-3">
        ${responseGame.stores[i].store.name}
        </button>        
        `;
        storeWrapper.append(div);
    }

    const gameGenreWrapper = document.querySelector("#gameGenreWrapper");
    const gameDateWrapper = document.querySelector("#gameDateWrapper");
    const gameMetaWrapper = document.querySelector("#gameMetaWrapper");


    let genreText = "";

    for (let i = 0; i < responseGame.genres.length; i++) {
        genreText += responseGame.genres[i].name + ", ";
    }

    gameGenreWrapper.innerText = genreText.slice(0, genreText.length-2);

    gameDateWrapper.innerText = new Intl.DateTimeFormat('en-EN', {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(responseGame.released))
    
    gameMetaWrapper.innerText = responseGame.metacritic;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})


