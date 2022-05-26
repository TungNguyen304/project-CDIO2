var registertext = document.querySelector('.register span')
var register = document.querySelector('.wrap_register')
var btn = document.querySelectorAll('.register a button')
var link = document.querySelectorAll('.register a')[2]
const api = "http://localhost:5000/getdataInfo"
fetch(api)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach(element => {
            if (element.ID == localStorage.getItem('id')) {
                registertext.innerText = element.NameCompany
                btn[2].style.display = "unset";
                register.style.justifyContent = "center"
                btn[0].style.display = "none"
                btn[1].style.display = "none"

            }
        });
        btn[2].onclick = () => {
            localStorage.removeItem('id')
            localStorage.setItem("actor", "3")
            link.href = "../loginbusiness/login.html"
        }
        btn[0].onclick = () => {
            localStorage.setItem("actor", "2")
        }
    })