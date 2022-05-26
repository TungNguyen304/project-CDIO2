let active = document.querySelector(".active");
let user_profile = document.querySelector(".user_profile");
user_profile.onmouseover = function () {
  user_profile.style.display = "block";
};
user_profile.onmouseout = function () {
  user_profile.style.display = "none";
};
active.onmouseover = function () {
  user_profile.style.display = "block";
  active.onmouseout = function () {
    user_profile.style.display = "none";
  };
};

let pre2 = document.querySelector(".pre2");
let next2 = document.querySelector(".next2");
let next1 = document.querySelector(".next1");
let contentform1 = document.querySelector(".content_form_1");
let contentform2 = document.querySelector(".content_form_2");
let contentform3 = document.querySelector(".content_form_3");
let pre3 = document.querySelector(".pre3");

var button_item = document.querySelector('.button_item.link a')




next1.onclick = () => {
  contentform2.style.display = "block";
  contentform1.style.display = "none";
};
pre2.onclick = () => {
  contentform1.style.display = "block";
  contentform2.style.display = "none";

};
next2.onclick = () => {
  contentform3.style.display = "block";
  contentform2.style.display = "none";
}
pre3.onclick = () => {
  contentform3.style.display = "none";
  contentform2.style.display = "block";
}

const $ = document.querySelector.bind(document)
const submit = $('.Submit_seeker')
// page 1
const chucdanh = $("#chucdanh");
const tencongty = $("#tencongty");
const webcongty = $("#webcongty");
const lengthemployee = $("#lengthemployee");

// // page 2
const CategoryOfWork = $(".CategoryOfWork");
const workingPosition = $(".workingPosition");
const Salary = $(".Salary");
const old = $(".old");
const gender = $(".gender");
const AcademicLevel = $(".AcademicLevel");
const ExperienceLevel = $(".ExperienceLevel");

// // page 3
const PreferredLanguage = $(".PreferredLanguage");
const Address = $(".Address");
const Country = $(".Country");
const ContactPhone = $(".ContactPhone");
const ContactEmail = $(".ContactEmail");


const api1 = "http://localhost:5000/getdataInfo"
fetch(api1)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    data.forEach(element => {
      if (element.ID == localStorage.getItem('id')) {
        tencongty.value = element.NameCompany
        tencongty.disabled = true
      }
    });
  })


const api = "http://localhost:5000/postdataPost"

submit.onclick = () => {
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      "id": localStorage.getItem('id'),
      "chucdanh": chucdanh.value,
      "tencongty": tencongty.value,
      "webcongty": webcongty.value,
      "lengthemployee": lengthemployee.options[lengthemployee.selectedIndex].text,
      "CategoryOfWork": CategoryOfWork.options[CategoryOfWork.selectedIndex].text,
      "workingPosition": workingPosition.options[workingPosition.selectedIndex].text,
      "Salary": Salary.value,
      "old": old.options[old.selectedIndex].text,
      "gender": gender.options[gender.selectedIndex].text,
      "AcademicLevel": AcademicLevel.options[AcademicLevel.selectedIndex].text,
      "ExperienceLevel": ExperienceLevel.options[ExperienceLevel.selectedIndex].text,
      "PreferredLanguage": PreferredLanguage.options[PreferredLanguage.selectedIndex].text,
      "Address": Address.value,
      "Country": Country.options[Country.selectedIndex].text,
      "ContactPhone": ContactPhone.value,
      "ContactEmail": ContactEmail.value
    })
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      
    })
    button_item.href = "../businesspage/index.html"
}