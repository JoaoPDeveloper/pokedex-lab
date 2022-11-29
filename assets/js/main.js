const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 999
const limit = 10
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
        </li>
    `
}

function imagem(){
    var img = document.getElementById("img")
    var imagem = document.getElementById("imagem")
    if(img.style.display == "none") { //verifica se a imagem está sendo exibida, se não estiver vai executar os comandos abaixo e se tiver vai executar o else
      img.style.display="block" //exibe a imagem
      imagem.innerHTML = "CLIQUE DE NOVO" //altera o texto
    }
    else { //se a imagem estiver sendo exibida vai executar os comandos abaixo
      img.style.display="none"; //oculta a imagem
      imagem.innerHTML = "CLIQUE AQUI" //altera o texto
    }
   }




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