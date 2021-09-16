var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ','')// troca espaco em branco por nada
    zipCode = zipCode.replace('.','')// troca ponto por nada
    zipCode = zipCode.replace('-','')// troca - por nada
    zipCode = zipCode.trim() // remove espacos no inicio da string\

    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(function(response){

        if(response.data.error) {
            throw new Error('CEP invalido')
        }

        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.bairro)
        createLine(response.data.localidade + '/' + response.data.uf)


    })
    .catch(function (error) {
        console.log(error)
        content.innerHTML = ''
        createLine('Ops!, algo deu errado')
    })

}

function createLine(text) {
    
        var line = document.createElement('p')
        var text = document.createTextNode(text)

        line.appendChild(text)
        content.appendChild(line)
}