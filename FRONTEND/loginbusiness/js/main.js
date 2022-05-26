var $ = document.querySelector.bind(document)

var authform__submit = $('.auth-form__submit')
var linkSpecial = $('.linkSpecial')
var email = $('.email')
var password = $('.password')
var authForm__heading = $('.auth-form__heading span')
const api1 = "http://localhost:5000/getdataAccount"
const api2 = "http://localhost:5000/getdataInfo"


if (localStorage.getItem('actor') == 1) {
    fetch(api1)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            authForm__heading.innerText = "bên phía seeker";
            authform__submit.onclick = () => {
                const bool = data.some((element) => {
                    if (element.UserName == email.value && element.Password == password.value) {
                        linkSpecial.href = "../index.html"
                        localStorage.setItem('id_seeker', element.ID)
                    }
                    return element.UserName == email.value && element.Password == password.value;
                })

                if (bool == false)
                    alert("Tài khoản hoặc mật khẩu bị sai")
                
            }
        })

}
else {
    fetch(api2)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            authForm__heading.innerText = "bên phía business";
            authform__submit.onclick = () => {
                const bool = data.some((element) => {
                    if (element.UserName == email.value && element.Password == password.value) {
                        linkSpecial.href = "../homebussiness/index.html"
                        localStorage.setItem('id', element.ID)
                    }
                    return element.UserName == email.value && element.Password == password.value;
                })

                if (bool == false)
                    alert("Tài khoản hoặc mật khẩu bị sai")
            }
        })


}