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
            link.href = "../loginbusiness/login.html"
        }
        btn[0].onclick = () => {
            localStorage.setItem("actor", "1")
        }
    })


var dem = 0;
var wrap_file = document.querySelector('.wrap_file')
const api2 = "http://localhost:5000/getdataProfile"
fetch(api2)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        result = data.map((element) => {
            if (element.IDSEEKER == localStorage.getItem('id_seeker')) {
                dem++;
                return `<div class="file_item">
                <div class="file_avt">
                    <img src="../../BACKEND/upload/${element.Image}"
                        alt="">
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
        wrap_file.innerHTML = htmls
        if (dem != 0) {
            var not_profile = document.querySelector('.not_profile h4')
            not_profile.style.display = "none"
        }

        link.onclick = () => {
            localStorage.removeItem('id_seeker')
            localStorage.setItem("actor", "1")
            link.href = "../loginbusiness/login.html"
        }
        btn[0].onclick = () => {
            localStorage.setItem("actor", "1")
        }
    })

var wrap_post_item = document.querySelector('.wrap_post_item')
var Recent_item = document.querySelector('.Recent_item h4')
const apiGetProfile = "http://localhost:5000/getdataProfile"
const apiGetApply = "http://localhost:5000/getdataApply"
const apiGetPost = "http://localhost:5000/getdataPost"
function loadApplyCompany() {
    var d = 0;
    fetch(apiGetApply)
        .then((res) => {
            return res.json()
        })
        .then((applys) => {
            fetch(apiGetProfile)
                .then((res) => {
                    return res.json()
                })
                .then((profiles) => {
                    fetch(apiGetPost)
                        .then((res) => {
                            return res.json()
                        })
                        .then((posts) => {
                            var result = applys.map((apply) => {
                                return profiles.map((profile) => {
                                    return posts.map((post) => {
                                        if (profile.IDSEEKER == localStorage.getItem('id_seeker') && apply.IDPROFILE == profile.ID && apply.IDPOST == post.IDPOST) {
                                            d++;
                                            return `<div class="post_item">
                                            <div class="row">
                                              <div class="col l-8">
                                                  <div class="post_company">
                                                      Công ty :
                                                      <span>${post.CompanyName}</span>
                                                  </div>
                                                  <div class="post_position">
                                                      Chức vụ :
                                                      <span>${post.Position}</span>
                                                  </div>
                                                  <div class="post_info">
                                                      <span class="post_address">${post.Country}</span>
                                                      <span class="post_salary">${post.Salary}<span>vnđ</span></span>
                                                  </div>
                                              </div>
                                              <div class="col l-4">
                                                  <div class="row" style="height: 100%;">
                                                      <div class="col l-12">
                                                          <div class="feature">
                                                              <i class="fas fa-folder"></i>
                                                              0
                                                              <i class="fas fa-eye"></i>
                                                              0
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                       </div>`
                                        }
                                    }).join("")
                                }).join("")
                            })

                            var htmls = result.join("")
                            wrap_post_item.innerHTML = htmls
                            wrap_post_item.style.display = "block"
                            if (d != 0) {
                                Recent_item.style.display = "none"
                            }
                        })
                })
        })
}
loadApplyCompany()

var wrap_notifi = document.querySelector('.wrap_notifi')
const apiGetNottification = "http://localhost:5000/getdataOption"
const apiGetDataInfo = "http://localhost:5000/getdataInfo"
function loadNotification() {
    fetch(apiGetNottification)
        .then((res) => {
            return res.json()
        })
        .then((options) => {
            fetch(apiGetDataInfo)
                .then((res) => {
                    return res.json()
                })
                .then((infos) => {
                    var result = options.map((option) => {
                        return infos.map((info) => {
                            if (option.STATUS == "accept" && Number(option.IDCOMPANY) == Number(info.ID) && option.IDSEEKER == localStorage.getItem('id_seeker')) {
                                return `<div class="notifi_item success">
                                <div class="notifi_text">Công ty <span class="notifi_company">${info.NameCompany}</span> đã đồng ý Bạn</div>
                                <div class="notifi_time">16/5/2022</div>
                            </div>`
                            }
                            else if(option.STATUS == "refuse" && option.IDCOMPANY == info.ID && option.IDSEEKER == localStorage.getItem('id_seeker')) {
                                return `<div class="notifi_item">
                                <div class="notifi_text">Công ty <span class="notifi_company">${info.NameCompany}</span> đã Từ chối Bạn</div>
                                <div class="notifi_time">16/5/2022</div>
                            </div>`
                            }
                        }).join("")
                    })
                    var htmls = result.join("")
                    wrap_notifi.innerHTML = htmls
                    // wrap_notifi.style.display = "flex"
                })
        })
}

loadNotification()