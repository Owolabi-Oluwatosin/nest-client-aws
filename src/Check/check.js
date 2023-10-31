export const checkPassword = () => {
    // eslint-disable-next-line
    return /^[@#](?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/
}

export const checkEmail = () => {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const checkName = () => {
    // eslint-disable-next-line
    return /^[a-zA-Z ]{2,30}$/i
}
