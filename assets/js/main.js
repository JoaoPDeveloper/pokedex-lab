
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const inputSearchPokemon = document.querySelector('.inputSearch input')

const maxRecords = 151
const limit = 15;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
           <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">    
            </div>
            <div class="pokemon-btn" id="btn-pokedetails">Mais Detalhes</div>
            <ul class="main-stats">
            <li>Peso: ${pokemon.weight / 10}kg</li>
                <li>Altura: ${pokemon.height / 10} metros</li>
                <li>Habilidade Principal: ${pokemon.mainmove}</li>
                <li>Habilidade: ${pokemon.abi}</li>
            </ul>
            <input type="button" value="X" class="closeButton" id="closeBtn">

        </li>
    `
}
// <li>Stats</li>
// <li>History</li>

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//  ---------- Modal and click events  ----------
let modal = document.querySelector('#modal-id')
let closeModalBtn = document.querySelector('#closeBtn')

document.addEventListener('click', function(e){
    if(e.target.innerText == "Mais Detalhes"){
        modal.style.display = "flex"
        let pokeActual = e.target.parentElement
        var pokeLi = document.querySelector('#modalpoke')
        pokeLi.innerHTML = pokeActual.innerHTML
        let pokeClass = pokeActual.classList[1]
        pokeLi.classList = pokeClass
        pokeLi.classList.add("mostrar")
    }
    if(e.target.id == "closeBtn"){
        modal.style.display = "none"
    } 
})

const filterNames = (names,inputValue,returnMatchedNames) => names
    .filter(name =>{
        const matchedNames = name.textContent.toLowerCase().includes(inputValue)
        return  returnMatchedNames ? matchedNames : !matchedNames
    })

const manipulateClasses = (names,classToAdd, ClassToRemove) =>{
   names.forEach(name =>{
        name.classList.remove(ClassToRemove)
        name.classList.add(classToAdd)
    })
}
    const hideNames = (names, inputValue) => {
    const namesToHide = filterNames(names,inputValue,false)
    manipulateClasses(namesToHide,'hidden','pokemon.name')
    }
    
    const showNames = (names, inputValue) =>{
    const namesToShow = filterNames(names,inputValue,true)
    manipulateClasses(namesToShow,'pokemon.name', 'hidden')
    }

inputSearchPokemon.addEventListener('input', event =>{ 
    const inputValue = event.target.value.trim().toLowerCase()
    const names = Array.from(pokemonList.children)
    hideNames(names, inputValue)
    showNames(names, inputValue)
})