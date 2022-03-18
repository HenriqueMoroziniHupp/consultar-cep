// Seleção de compos para ser utilizado
var buttonSubmit = document.querySelector('#app button')
var zipCodeField = document.querySelector('#app form input')
var mainContent = document.querySelector('#app main')

// Verifiquei e todos estão funcionando, são exibidos corretamente no 'Console'
console.log(buttonSubmit)
console.log(zipCodeField)
console.log(mainContent)

// Ouvido o evento de click no button
buttonSubmit.addEventListener('click', run)

function run(event) {
  event.preventDefault()
  var zipCode = zipCodeField.value

  // Aplicando formatações
  /*
    // Substitui este código pelo RegExp
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()
   */

  // RegExr [^0-9] elimina todos caracteres que não estiver entre 0 e 9 (código 48 a 57)
  zipCode = zipCode.replace(/[^0-9]/g, '')

  console.log(zipCode)

  axios
    .get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
      if (response.data.erro) {
        throw new Error('CEP Inválido')
      } else {
        mainContent.innerHTML = ''
        console.log(response.data)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro + ' - ' + response.data.logradouro)

      }
    })
    .catch(function (error) {
      mainContent.innerHTML = ''
      console.log(error)
      createLine('Ops, algo deu errado')
    })
}

function createLine(text) {
  if (text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    console.log(line)
    console.log(text)
    console.log('TEM')

    // Adiciono o texto dentro da tag <p></p>
    line.appendChild(text)
    // Adiciono a tag <p>text</p> dentro do mainContent
    mainContent.appendChild(line)
  } else {
    console.log('VAZIO')
  }
}
