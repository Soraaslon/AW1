function findlyrics(artist, title) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
}

async function doSubmit() {
  const artist = document.getElementById('artist')
  const title = document.getElementById('title')
  const lyrics = document.getElementById('output')

  try {
    const lyricsResponse = await findlyrics(artist.value, title.value)
    const data = await lyricsResponse.json()
    if (data.lyrics)
      lyrics.innerHTML = data.lyrics.replace(new RegExp('\n', 'g'), '<br>')
    else lyrics.innerHTML = data.error
  } catch (err) {
    console.log(err)
  }
}

/* -= Users =- */

const ul = document.getElementById('users')
const url = 'https://jsonplaceholder.typicode.com/users'

fetch(url)
  .then(resp => resp.json())
  .then(function (data) {
    console.log(data)

    return data.map(user => {
      let li = document.createElement('li')
      li.innerHTML = `Nome: ${user.name} - Username: (${user.username})`
      ul.appendChild(li)
    })
  })
  .catch(err => {
    console.log('Vixi maria, danou-se! ' + err)
  })
