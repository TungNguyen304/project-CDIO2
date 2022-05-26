var $ = document.querySelector.bind(document)

var fullname = $('.fullname')
var email = $('.email')
var password = $('.password')
var btn_register = $('.btn_register')
var link = $('.re-auth-form__controls a')
const api = "http://localhost:5000/postdataAccount";


btn_register.onclick = () => {
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "FullName": fullname.value,
            "UserName": email.value,
            "Password": password.value
        })
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

        })

    localStorage.setItem("actor", "1")
    link.href = "../loginbusiness/login.html"
}