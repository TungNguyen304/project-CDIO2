var $ = document.querySelector.bind(document)

var btnregis = $('.btn-regis')
var link = $('.buss-regis__submit a')
var email = $('.email')
var password = $('.password')
var namecompany = $('.namecompany')
var nameowner = $('.nameowner')
var phone = $('.phone')
var address = $('.country')

const api = "http://localhost:5000/postdataInfo";

btnregis.onclick = () => {
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "UserName": email.value,
            "Password": password.value,
            "NameCompany": namecompany.value,
            "NameOwner": nameowner.value,
            "Phone": phone.value,
            "Address": address.options[address.selectedIndex].text
        })
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

        })
        localStorage.setItem("actor", "2")
        link.href = "../loginbusiness/login.html"

}
