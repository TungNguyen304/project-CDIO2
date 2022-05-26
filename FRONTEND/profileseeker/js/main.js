var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var next = $('.next.save--l')
var page1 = $('.Page1')
var page2 = $('.page2')
var page3 = $('.page3')
var page4 = $('.page4')
var page5 = $('.page5')
var link = $('.LUU a')
var step = $$('.step')
var inputTitle = $('.info-center1--input')
var previous = $$('.LUU button')[0]



page1.style.display = "block"
next.style.display = "block"


next.onclick = () => {
    if (page1.style.display != "none") {
        page1.style.display = "none"
        page2.style.display = "block"
        step[0].classList.remove("active")
        step[1].classList.add("active")
        previous.style.display = "block"
    }
    else if (page2.style.display != "none") {
        page2.style.display = "none"
        page3.style.display = "block"
        step[1].classList.remove("active")
        step[2].classList.add("active")
        previous.style.display = "block"
    }
    else if (page3.style.display != "none") {
        page3.style.display = "none"
        page4.style.display = "block"
        step[2].classList.remove("active")
        step[3].classList.add("active")
        previous.style.display = "block"
    }
    else if (page4.style.display != "none") {
        page4.style.display = "none"
        page5.style.display = "block"
        step[3].classList.remove("active")
        step[4].classList.add("active")
        next.style.display = "none"
        previous.style.display = "block"
    }

}

previous.onclick = () => {
    if (page5.style.display != "none") {
        page5.style.display = "none"
        page4.style.display = "block"
        step[4].classList.remove("active")
        step[3].classList.add("active")
        next.style.display = "block"
    }
    else if (page4.style.display != "none") {
        page4.style.display = "none"
        page3.style.display = "block"
        step[3].classList.remove("active")
        step[2].classList.add("active")
    }
    else if (page3.style.display != "none") {
        page3.style.display = "none"
        page2.style.display = "block"
        step[2].classList.remove("active")
        step[1].classList.add("active")
    }
    else if (page2.style.display != "none") {
        page2.style.display = "none"
        page1.style.display = "block"
        step[1].classList.remove("active")
        step[0].classList.add("active")
        previous.style.display = "none"
    }
}



var registertext = document.querySelector('.register span')
var register = document.querySelector('.wrap_register_top')
var btn = document.querySelectorAll('.wrap_register_top a button')
var link2 = document.querySelectorAll('.wrap_register_top a')[2]
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
        link2.onclick = () => {
            localStorage.removeItem('id_seeker')
            localStorage.setItem("actor", "1")
            link2.href = "../loginbusiness/login.html"
        }
        btn[0].onclick = () => {
            localStorage.setItem("actor", "1")
        }
    })





function tinh(element) {
    for (i = 0; i < element.length; i++) {
        if (element[i].checked == true)
            return element[i].value
    }
}

var Title = $('.info-center1--input')
var Name = $('.hoten-input')
var Nationality = $('.quoctich-select')
var DayOfBitrh = $('.browser-year')
var Married = tinh(document.getElementsByName('single'))
var Sex = tinh(document.getElementsByName('sex'))


var Phone = $('.phone')
var Email = $('.email')
var Country = $('.select-quocgia')
var Address = $('.address')
var Education = $('.tdhv')
var School = $('.tentruong')
var Specialize = $('.chuyenmon')
var Exp = $('.sonamkn')
var Majors = $('.nghanhnghe')
var Status = tinh(document.getElementsByName('search_alow'))

var save = $('.save')
const api2 = "http://localhost:5000/postdataProfile"
const api3 = "http://localhost:5000/uploadfile"
var formPickImage = document.querySelector('.center3-right')

function uploadImage() {
    var form = document.querySelector('.center3-right')
    var formData = new FormData(form);
    const file = fetch(api3, {
        method: 'POST',
        body: formData
    });
    return file
}




const updateImage = () => {
    fetch('http://localhost:5000/getdataProfile')
        .then((res) => res.json())
        .then((data) => {
            const inputFile = document.querySelector('.center3-right .choose_image')
            const currentFile = inputFile.files[0]

            let IdUpdate;
            if (data.length == 0) {
                IdUpdate = 1
            }
            else {
                console.log(data);
                IdUpdate = data[data.length - 1].ID
            }
            console.log(currentFile);
            console.log(IdUpdate);
            fetch('http://localhost:5000/putdataProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    file: currentFile.name,
                    profileName: IdUpdate
                })
            })

        })

}

function uploadData() {
    fetch(api2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "IDSEEKER": localStorage.getItem('id_seeker'),
            "Title": Title.value,
            "Name": Name.value,
            "Nationality": Nationality.options[Nationality.selectedIndex].text,
            "DayOfBitrh": DayOfBitrh.options[DayOfBitrh.selectedIndex].text,
            "Married": Married,
            "Sex": Sex,
            "Phone": Phone.value,
            "Email": Email.value,
            "Country": Country.options[Country.selectedIndex].text,
            "Address": Address.value,
            "Education": Education.options[Education.selectedIndex].text,
            "School": School.options[School.selectedIndex].text,
            "Specialize": Specialize.options[Specialize.selectedIndex].text,
            "Exp": Exp.options[Exp.selectedIndex].text,
            "Majors": Majors.options[Majors.selectedIndex].text,
            "Status": Status
        })
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("hello");
            updateImage();
            uploadImage();
        })
}


save.onclick = (event) => {
    uploadData()
}



