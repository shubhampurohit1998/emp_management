import React from 'react'
import Axios from 'axios'
const Publisher = (props) => {
    const goToAccount = () => {
        Axios.get('http://127.0.0.1:8000/api/setup-account').then(response => {
            const link = response.data.link
            window.location.replace(link)
        }).catch(error => {
            console.log(error)
            alert("Something went wrong!")
        })
    }
    return(
        <div>
            <button type="button" className="btn btn-success" onClick={goToAccount}>Go to account</button>
        </div>
    )
}

export default Publisher