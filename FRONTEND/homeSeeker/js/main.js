
var registertext = document.querySelector('.register span')
var register = document.querySelector('.wrap_register_top')
var btn = document.querySelectorAll('.wrap_register_top a button')
var link = document.querySelectorAll('.wrap_register_top a')[2]
const api = "http://localhost:5000/getdataAccount"
fetch(api)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach(element => {
            if (element.ID == localStorage.getItem('id_seeker')) {
                registertext.innerText = element.FullName
                btn[2].style.display = "unset";
                register.style.justifyContent = "center"
                btn[0].style.display = "none"
                btn[1].style.display = "none"

            }
        });
        link.onclick = () => {
            localStorage.removeItem('id_seeker')
            localStorage.setItem("actor", "1")
            link.href = "./loginbusiness/login.html"
        }
        btn[0].onclick = () => {
            localStorage.setItem("actor", "1")
        }
    })