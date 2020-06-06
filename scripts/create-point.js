

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for( const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true
        for( const city of cities){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}
    




document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

        
//Itens de coleta

const itensToCollect = document.querySelectorAll(".itens-grid li")
for (const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event){
    //adicionar ou remover uma classe com javascript
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id


    //verificar se existem itens selecionados , se sim
    //pegar os itens selecionados
    
    const alreadySelected = selectedItens.findIndex(function(item){
        const itemFound = item == itemId
        return itemFound
    })

    //se já estiver selecionado, tirar da selecao
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
        
    } else {
        // se não estiver selecionado, adiciocar à seleção
        selectedItens.push(itemId)

    }


    //atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens
    
}
  