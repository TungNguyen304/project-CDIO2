var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var search_namecompany = $('.search_namecompany')
var search_locacompany = $('.search_locacompany')
var search_btn = $('.search_btn')
var content_mid = $$('.content_mid')


var dangki = $('.header__nav_list_item span')
const api = "http://localhost:5000/getdataAccount"
fetch(api)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach(element => {
            if (element.ID == localStorage.getItem('id_seeker')) {
                dangki.innerText = element.FullName
            }
        });
    })





const api1 = "http://localhost:5000/getdataPost"
function load() {
    fetch(api1)
        .then(async (res) => {
            return res.json()
        })

        .then(async (data) => {
            var result = data.map((element, index) => {
                if (index <= 9) {
                    return `<div class="content_mid-list">
                <div class="list_img">
                    <img src="https://dxwd4tssreb4w.cloudfront.net/web/images/common/no-logo.png" alt="">
                </div>
                <div class="list_content">
                    <h1>${element.Position}</h1>
                    <p>Công ty cổ phần ${element.CompanyName} Việt Nam</p>
                    <div class="list_mid">
                        <span>${element.Country}, ${element.Address}</span>
                        <div class="apply" name = "${element.IDPOST}" title="${element.ID}">Apply</div>
                    </div>
                    <div class="list_bot">
                        <span>Lương : ${element.Salary} VND</span>
                    </div>
                </div>
            </div>
                `
                }
            })
            var htmls = result.join("")
            content_mid[0].innerHTML = htmls
        })
}
load()

function stand(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");

    str = str.toLowerCase()
    return str;
}

search_btn.onclick = () => {
    fetch(api1)
        .then((res) => {
            return res.json()
        })

        .then((data) => {
            if (search_namecompany.value != '') {
                if (search_locacompany.value != '') {
                    var result = data.map((element, index) => {
                        if ((stand(search_namecompany.value) == stand(element.Position) || stand(search_namecompany.value) == stand(element.CompanyName)) && ((stand(search_locacompany.value) == stand(element.Address) || stand(search_locacompany.value) == stand(element.Country)))) {

                            return `<div class="content_mid-list">
                            <div class="list_img">
                                <img src="https://dxwd4tssreb4w.cloudfront.net/web/images/common/no-logo.png" alt="">
                            </div>
                            <div class="list_content">
                                <h1>${element.Position}</h1>
                                <p>Công ty cổ phần ${element.CompanyName} Việt Nam</p>
                                <div class="list_mid">
                                    <span>${element.Country}, ${element.Address}</span>
                                    <div class="apply" name = "${element.IDPOST}" title="${element.ID}">Apply</div>
                                </div>
                                <div class="list_bot">
                                    <span>Lương : ${element.Salary} VND</span>
                                </div>
                            </div>
                        </div>
                            `
                        }
                    })
                    var htmls = result.join("")
                    content_mid[1].innerHTML = htmls
                    content_mid[0].style.display = "none"
                }
                else {
                    var result = data.map((element, index) => {
                        if (stand(search_namecompany.value) == stand(element.Position) || stand(search_namecompany.value) == stand(element.CompanyName)) {

                            return `<div class="content_mid-list">
                        <div class="list_img">
                            <img src="https://dxwd4tssreb4w.cloudfront.net/web/images/common/no-logo.png" alt="">
                        </div>
                        <div class="list_content">
                            <h1>${element.Position}</h1>
                            <p>Công ty cổ phần ${element.CompanyName} Việt Nam</p>
                            <div class="list_mid">
                                <span>${element.Country}, ${element.Address}</span>
                                <div class="apply" name = "${element.IDPOST}" title="${element.ID}">Apply</div>
                            </div>
                            <div class="list_bot">
                                <span>Lương : ${element.Salary} VND</span>
                            </div>
                        </div>
                    </div>
                        `
                        }
                    })
                    var htmls = result.join("")
                    content_mid[1].innerHTML = htmls
                    content_mid[0].style.display = "none"
                }
            } else if (search_locacompany.value != '') {
                var result = data.map((element, index) => {
                    if (stand(search_locacompany.value) == stand(element.Address) || stand(search_locacompany.value) == stand(element.Country)) {

                        return `<div class="content_mid-list">
                        <div class="list_img">
                            <img src="https://dxwd4tssreb4w.cloudfront.net/web/images/common/no-logo.png" alt="">
                        </div>
                        <div class="list_content">
                            <h1>${element.Position}</h1>
                            <p>Công ty cổ phần ${element.CompanyName} Việt Nam</p>
                            <div class="list_mid">
                                <span>${element.Country}, ${element.Address}</span>
                                <div class="apply" name = "${element.IDPOST}" title="${element.ID}">Apply</div>
                            </div>
                            <div class="list_bot">
                                <span>Lương : ${element.Salary} VND</span>
                            </div>
                        </div>
                    </div>
                        `
                    }
                })
                var htmls = result.join("")
                content_mid[1].innerHTML = htmls
                content_mid[0].style.display = "none"
            } else {
                content_mid[0].style.display = "block"
                load()
            }


        })
}

var applys = []
const apiPostApply = "http://localhost:5000/postdataApply"
const apiGetApply = "http://localhost:5000/getdataApply"
const apiDeleteApply = "http://localhost:5000/deletedataApply"

var list_profile = $('.list_profile')
var wrap_list_profile = $('.wrap_list_profile')
var list_profile_title = $('.list_profile_title')
const apiGetProfile = "http://localhost:5000/getdataProfile"
var i = 0;
var stop = setInterval(() => {
    applys = document.querySelectorAll('.apply')
    if (applys.length != 0) {
        clearInterval(stop)
        applys.forEach((apply) => {
            apply.style.backgroundColor = "#0069DB"
            apply.onclick = () => {
                if (apply.style.backgroundColor == "rgb(0, 105, 219)") {
                    fetch(apiGetProfile)
                        .then((res) => {
                            return res.json()
                        })
                        .then((data) => {
                            result = data.map((element) => {
                                if (element.IDSEEKER == localStorage.getItem('id_seeker')) {
                                    return `<div title = "${element.ID}" class="file_item">
                <div class="file_avt">
                    <img src="../../BACKEND/upload/${element.Image}" alt="">
                </div>
                <div class="file_info">
                    <div>
                        <h4 class="file_title">
                            ${element.Title}
                        </h4>
                        <h4 class="file_name">
                        ${element.Name}
                        </h4>
                        <div class="file_country">
                        ${element.Country}
                        </div>
                        <div class="file_contact">
                            <span class="file_email">${element.Email}</span>
                            <span class="file_phone">${element.Phone}</span>
                        </div>
                    </div>
                </div>
            </div>
                `
                                }
                            })

                            var htmls = result.join('')
                            wrap_list_profile.innerHTML = `<div class="list_profile_title">Vui lòng chọn hồ sơ bạn muốn ứng tuyển</div>` + htmls
                            list_profile.onclick = () => {
                                wrap_list_profile.style.display = "none"
                                list_profile.style.display = "none"
                            }
                            var file_items = $$('.file_item')
                            file_items.forEach((file_item, index) => {
                                file_item.onclick = () => {
                                    i = index;
                                    list_profile.style.display = "none"
                                    wrap_list_profile.style.display = "none"
                                    fetch(apiPostApply, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: JSON.stringify({
                                            "IDCOMPANY": apply.title,
                                            "IDPROFILE": file_item.title,
                                            "IDPOST": apply.getAttribute("name")
                                        })
                                    })
                                    apply.style.backgroundColor = "#ccc"
                                    apply.textContent = "Applied"
                                }
                            })
                        })
                    list_profile.style.display = "block"
                    wrap_list_profile.style.display = "flex"

                }
                else {
                    console.log(i);
                    fetch(apiDeleteApply + `/${apply.getAttribute("name")}/${i}`, {
                        method: 'DELETE'
                    })
                    apply.style.backgroundColor = "rgb(0, 105, 219)"
                    apply.textContent = "Apply"

                }
            }

        })
        loadApply();
    }
}, 500)


function loadApply() {
    fetch(apiGetApply)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            fetch(apiGetProfile)
                .then((res) => {
                    return res.json()
                })
                .then((profiles) => {
                    data.forEach((element) => {
                        applys.forEach((apply) => {
                            profiles.forEach((profile) => {
                                if (Number(apply.getAttribute("name")) == element.IDPOST && element.IDPROFILE == profile.ID && profile.IDSEEKER == localStorage.getItem('id_seeker')) {
                                    apply.style.backgroundColor = "#ccc"
                                    apply.textContent = "Applied"
                                }
                            })
                        })
                    })
                })
        })
}



