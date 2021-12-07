function doSubmit() {
  axios
    .get(`https://api.lyrics.ovh/v1/${artist.value}/${title.value}`)
    .then(response => {
      output.innerHTML = response.data.lyrics.replace(
        new RegExp('\n', 'g'),
        '<div>'
      )
    })
    .catch(err => console.log(err))
}

axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    return response.data.map(user => {
      let li = document.createElement('li')
      li.innerHTML = `Nome: ${user.name} - Username: (${user.username})`
      users.appendChild(li)
    })
  })
  .catch(err => {
    console.log('Vixi maria, danou-se! ' + err)
  })
