const BASE_URL = "https://api.rawg.io/api/games";
const API_KEY = "9269195f491e44539d7a2d10ce87ab15";
const QUERIES = "&page_size=40&dates=2022-03-01,2023-04-01&platforms=18,1,7";
fetch(`${BASE_URL}?key=${API_KEY}${QUERIES}`)
.then(response => response.json())
.then(data => {
    const dataClone = structuredClone(data)
    
    const searchGame = document.querySelector('#searchGame');
    searchGame.setAttribute("placeholder", `Cerca tra ${dataClone.results.length} giochi...` )
    
    const games = dataClone.results
    console.log(games)
    
    const filterMetaCritics = games.filter(game => game.metacritic !== null).sort((a, b) => b.metacritic - a.metacritic)
    
    
    const gamesWrapper = document.querySelector('#gamesWrapper');
    
    
    function sortByName(games) {
        games.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        return games;
    }
    
    function sortingByNewest(data) {
        return data.sort((a, b) => new Date(b.released) - new Date(a.released))          
    }        
    
    function sortingByOldest(data) {
        return data.sort((a, b) => new Date(a.released) - new Date(b.released))          
    }
    
    function sortingbyMetacritics(data) {
        return data.sort((a, b) => b.metacritic - a.metacritic)
    }
    
    function filterPlatform(data, value) {
        let filtered = [];
        for (let i = 0; i < data.length; i++) {
            for (let p = 0; p < data[i].platforms.length; p++) {
                if (data[i].platforms[p].platform.name == value) {
                    filtered.push(data[i])
                }
            }
        }
        return filtered;
    }

    function filterGenre(data, value) {
        let filtered = [];
        for (let i = 0; i < data.length; i++) {
            for (let p = 0; p < data[i].genres.length; p++) {
                if (data[i].genres[p].name == value) {
                    filtered.push(data[i])
                }
            }
        }
        return filtered;
    }

    function filterStores(data, value) {
        let filtered = [];
        for (let i = 0; i < data.length; i++) {
            for (let p = 0; p < data[i].stores.length; p++) {
                if (data[i].stores[p].store.name == value) {
                    filtered.push(data[i])
                }
            }
        }
        return filtered;
    }
    
    
    
    
    const clickByName = document.querySelector("#clickByName");
    const clickByNew = document.querySelector('#clickByNew');
    const clickByOld = document.querySelector('#clickByOld');
    
    const topScoredWrapper = document.querySelector("#topScoredWrapper");
    const allGamesWrapper = document.querySelector("#allGamesWrapper");
    
    const PCWrapper = document.querySelector("#PCWrapper");
    const PlayStation4Wrapper = document.querySelector("#PlayStation4Wrapper");
    const XboxOneWrapper = document.querySelector("#XboxOneWrapper");
    const NintendoSwitchWrapper = document.querySelector("#NintendoSwitchWrapper");
    const iOSWrapper = document.querySelector("#iOSWrapper");
    const AndroidWrapper = document.querySelector("#AndroidWrapper");
    
    const ActionWrapper = document.querySelector("#ActionWrapper");
    const StrategyWrapper = document.querySelector("#StrategyWrapper");
    const RPGWrapper = document.querySelector("#RPGWrapper");
    const ShooterWrapper = document.querySelector("#ShooterWrapper");
    const AdventureWrapper = document.querySelector("#AdventureWrapper");
    const PuzzleWrapper = document.querySelector("#PuzzleWrapper");
    const RacingWrapper = document.querySelector("#RacingWrapper");
    const SportsWrapper = document.querySelector("#SportsWrapper");
    
    const SteamWrapper = document.querySelector("#SteamWrapper");
    const PlayStationStore = document.querySelector("#PlayStationStore");
    const XboxStoreWrapper = document.querySelector("#XboxStoreWrapper");
    const AppStoreWrapper = document.querySelector("#AppStoreWrapper");
    const GOGWrapper = document.querySelector("#GOGWrapper");
    const NintendoStoreWrapper = document.querySelector("#NintendoStoreWrapper");
    const Xbox360StoreWrapper = document.querySelector("#Xbox360StoreWrapper");
    const GooglePlayWrapper = document.querySelector("#GooglePlayWrapper");
    const itchioWrapper = document.querySelector("#itchioWrapper");
    const EpicGamesWrapper = document.querySelector("#EpicGamesWrapper");
    
    
    searchGame.addEventListener("input", ()=>{







    })
   
    
    clickByName.addEventListener('click', ()=>{
        showGames(sortByName(games))
    })
    clickByNew.addEventListener('click', () => {
        showGames(sortingByNewest(games))
    })
    clickByOld.addEventListener('click', () => {
        showGames(sortingByOldest(games))
    })
    topScoredWrapper.addEventListener('click', ()=>{
        showGames(sortingbyMetacritics(games))
    })
    allGamesWrapper.addEventListener("click", ()=>{
        showGames(games)
    })

    
    PCWrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "PC"));
    })
    PlayStation4Wrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "PlayStation 4"));
    })
    XboxOneWrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "Xbox One"));
    })
    NintendoSwitchWrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "Nintendo Switch"));
    })
    iOSWrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "iOS"));
    })
    AndroidWrapper.addEventListener('click', ()=>{
        showGames(filterPlatform(games, "Android"));
    })


    ActionWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Action"));
    })
    StrategyWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Strategy"));
    })
    RPGWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "RPG"));
    })
    ShooterWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Shooter"));
    })
    AdventureWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Adventure"));
    })
    PuzzleWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Puzzle"));
    })
    RacingWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Racing"));
    })
    SportsWrapper.addEventListener('click', ()=>{
        showGames(filterGenre(games, "Sports"));
    })


    SteamWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Steam"));
    })
    PlayStationStore.addEventListener('click', ()=>{
        showGames(filterStores(games, "PlayStation Store"));
    })
    XboxStoreWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Xbox Store"));
    })
    AppStoreWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "App Store"));
    })
    GOGWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "GOG"));
    })
    NintendoStoreWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Nintendo Store"));
    })
    Xbox360StoreWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Xbox 360 Store"));
    })
    GooglePlayWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Google Play"));
    })
    itchioWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "itch.io"));
    })
    EpicGamesWrapper.addEventListener('click', ()=>{
        showGames(filterStores(games, "Epic Games"));
    })

    
    showGames(games)
    
    function showGames(data) {
        gamesWrapper.innerHTML = "";
        data.forEach(game => {
            let div = document.createElement('div')
            div.classList.add('col-12', 'col-md-3', 'mb-3')
            div.innerHTML = `
            <div class="card card-game border border-4">
            <img src="${game.background_image}" class="card-img-top" alt="img-game">
            <span class="card-body">
            ${game.parent_platforms.map(el => {
                if(el.platform.name == "PC") return `<img src="./downloads/client-mac.png" width="20" alt="">`
                if(el.platform.name == "PlayStation") return `<img src="./downloads/play-station.png" width="20" alt="">`
                if(el.platform.name == "Xbox") return `<img src="./downloads/xbox.png" width="20" alt="">`
                if(el.platform.name == "Nintendo") return `<img src="./downloads/nintendo-switch.png" width="20" alt="">`
                if(el.platform.name == "Linux") return `<img src="./downloads/linux.png" width="20" alt="">`
            }).join("")}
            <h5 class="card-title f-p mt-3">${game.name}</h5>
            <span class="btn-score">+${game.reviews_count}</span>
            <span class="dropdown">
            <button class="btn-feedback" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots text-white"></i>
            </button>
            <div class="dropdown-menu p-3">
            <div class="row">
            <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center  ">
            🎯
            <p class="f-p small m-0">Exceptional</p> 
            </div>
            <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
            👍🏻
            <p class="f-p small m-0">Recommended</p>
            </div>
            <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
            😑
            <p class="f-p small m-0">Meh</p>
            </div>
            <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
            ⛔️
            <p class="small m-0 f-p">Skip</p>
            </div>
            </div>
            </div>
            </span>
            <div class="d-flex justify-content-between border-infos mb-3 mt-3">
            <p class="f-p">Release date:</p>
            <p class="f-p small text-secondary">${new Intl.DateTimeFormat('en-EN', {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(new Date(game.released))}</p>
            </div>
            <div class="d-flex justify-content-between border-infos mb-3">
            <p class="f-p">Genres:</p>
            <a class="f-p small text-secondary" href="#">${game.genres.map(genere => {
                return genere.name
            }).slice(0,2)}</a>
            </div>
            <div class="d-flex justify-content-between border-infos mb-3">
            <p class="f-p">Metacritic:</p>
            <p class="f-p small text-secondary">${game.metacritic ? game.metacritic : "no score available"}</p>
            </div>
            <a data-togame=toGame href="./Game.html" class="btn-detail text-decoration-none d-flex justify-content-between f-p">
            Show more detail
            <i class="bi bi-arrow-right"></i>
            </a>
            </div>
            
            `
            gamesWrapper.append(div)
        });

        let togame = Array.from(document.querySelectorAll("[data-togame]"))

        for (let i = 0; i < togame.length; i++) {
            togame[i].addEventListener("click", ()=>{
                console.log(data[i].name);
                sessionStorage.setItem("nameGame", data[i].name)
                console.log(sessionStorage);
            })
            
        }

    }     
    gamesWrapper.classList.add('expose')
})





















