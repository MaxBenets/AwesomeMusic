import axios from "axios";

export const getMp3 = (id) => {

  const options = {
    method: 'GET',
    url: 'https://youtube-mp36.p.rapidapi.com/dl',
    params: { id },
    headers: {
      'X-RapidAPI-Key': '52e80a631amsh26dc9fa01d0b41fp18a9aajsn9cc198b73eee',
      'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  return axios.request(options)
    .then(response => { console.log(response.data); return response.data })
    .catch(err => console.log(err));
}