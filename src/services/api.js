
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
    .then(response => {
        if (!response.status === 200 ) {

            throw response.json();
        }

        if (response.status == 204){
           return []     
        }

        if (response.ok){
            return response.json();
        }else{
            return response.text().then(text => {throw new Error(text)})
        } 
    })
    .then(json => {
        return json;
    })
    .catch(error => {
        console.log(error)
        throw error;
    });
}

export { fetchJSON };