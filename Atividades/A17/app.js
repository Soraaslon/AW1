const masks = {
  cpf(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  phone(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  },

  money(value) {
    const cleanValue = +value.replace(/\D+/g, '')
    const options = { style: 'currency', currency: 'BRL' }
    return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)
  },

  date(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{4})\d+?$/, '$1')
  }
}

function TestaCPF(strCPF) {
  strCPF = strCPF.replace(/\D+/g, '')
  var Soma
  var Resto
  Soma = 0
  var i
  if (strCPF == '00000000000') return false

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11))) return false
  return true
}

const button = document.getElementById('button')

button.addEventListener('click', event => {
  event.preventDefault()

  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const cpf = document.getElementById('cpf')
  const money = document.getElementById('money')
  const date = document.getElementById('date')
  const phone = document.getElementById('phone')

  if (email.value == '') {
    email.classList.add('errorInput')
  } else {
    email.classList.remove('errorInput')
  }

  if (password.value == '') {
    password.classList.add('errorInput')
  } else {
    password.classList.remove('errorInput')
  }

  if (money.value == '') {
    money.classList.add('errorInput')
  } else {
    money.classList.remove('errorInput')
  }

  if (date.value.length != 10) {
    date.classList.add('errorInput')
  } else {
    date.classList.remove('errorInput')
  }

  if (
    !RegExp(
      '^\\(((1[1-9])|([2-9][0-9]))\\) (([0-9]{4}-[0-9]{4})|([0-9]{5}-[0-9]{4}))$'
    ).test(phone.value)
  ) {
    phone.classList.add('errorInput')
  } else {
    phone.classList.remove('errorInput')
  }

  if (
    email.value.indexOf('@') == -1 ||
    email.value.indexOf('.') == -1 ||
    email.value.indexOf('.') - email.value.indexOf('@') == 1
  ) {
    email.classList.add('errorInput')
  } else {
    email.classList.remove('errorInput')
  }

  if (!isNaN(email.value) && email.value.length == 11) {
    email.classList.remove('errorInput')
  }

  if (password.value.length <= 5) {
    password.classList.add('errorInput')
  } else {
    password.classList.remove('errorInput')
  }

  if (!TestaCPF(cpf.value)) {
    cpf.classList.add('errorInput')
  } else {
    cpf.classList.remove('errorInput')
  }
})

document.querySelectorAll('input').forEach($input => {
  const field = $input.dataset.js

  $input.addEventListener(
    'input',
    e => {
      e.target.value = masks[field](e.target.value)
    },
    false
  )
})
