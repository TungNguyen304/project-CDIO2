var registertext = document.querySelector('.register span')
var wrap_register_name = document.querySelector('.wrap_register_name')
var container_name = document.querySelector('.container_name')
var container_email = document.querySelector('.container_email')

const api = "http://localhost:5000/getdataInfo"
fetch(api)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach(element => {
            if (element.ID == localStorage.getItem('id')) {
                registertext.innerText = element.NameCompany
                wrap_register_name.innerText = element.NameCompany
                container_name.innerText = element.NameCompany
                container_email.innerText = element.UserName
            }
        });
    })


const api2 = "http://localhost:5000/getdataPost"

var wrap_post_item = document.querySelector('.wrap_post_item')
var container_notthing = document.querySelector('.container_notthing')
var dem = 0;
fetch(api2)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        var result = data.map((element) => {
            if (element.ID == localStorage.getItem('id')) {
                dem++;
                return `<div class="post_item">
             <div class="row">
               <div class="col l-6">
                   <div class="post_position">
                       ${element.Position}
                   </div>
                   <div class="post_info">
                       <span class="post_address">${element.Country}</span>
                       <span class="post_salary">${element.Salary}<span>vnđ</span></span>
                   </div>
               </div>
               <div class="col l-6">
                   <div class="row" style="height: 100%;">
                       <div class="col l-6">
                           <div class="feature">
                               <i class="fas fa-folder"></i>
                               0
                               <i class="fas fa-eye"></i>
                               0
                           </div>
                       </div>
                       <div class="col l-6">
                           <div class="manager">
                               <div>
                                   <i class="fas fa-ellipsis-h"></i>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>`
            }
        })
        if (dem != 0)
            container_notthing.style.display = "none"
        var htmls = result.join('')
        wrap_post_item.innerHTML = htmls
        wrap_post_item.style.display = "block"
    })


var container_section1 = document.querySelector('.container_section1')
var container_notthing1 = document.querySelector('.container_notthing1')
const apiGetProfile = "http://localhost:5000/getdataProfile"
const apiGetApply = "http://localhost:5000/getdataApply"
const apiGetPost = "http://localhost:5000/getdataPost"
const apiPostOption = "http://localhost:5000/postdataOption"
function loadProfileApply() {
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
                                        if (apply.IDCOMPANY == localStorage.getItem('id') && apply.IDPROFILE == profile.ID && apply.IDPOST == post.IDPOST) {
                                            d++;
                                            return `<div tite=${apply.ID} class="wrap_item">
                                            <div class="file_item">
                                            <div class="file_avt">
                                                <img src="../../BACKEND/upload/${profile.Image}" alt="">
                                            </div>
                                            <div class="file_info">
                                                <h4 class="file_title">
                                                    ${profile.Title}
                                                </h4>
                                                <h4 class="file_name">
                                                    ${profile.Name}
                                                </h4>
                                                <div class="file_country">
                                                    ${profile.Country}
                                                </div>
                                                <div class="file_contact">
                                                    <span class="file_email">${profile.Email}</span>
                                                    <span class="file_phone">${profile.Phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="xinungtuyen">
                                            Xin ứng tuyển cho công việc
                                        </div>
                                        <div class="post_item1">
                                            <div class="post_position">
                                                ${post.Position}
                                            </div>
                                            <div class="post_info">
                                                <span class="post_address">${post.Country}</span>
                                                <span class="post_salary">${post.Salary}<span>vnđ</span></span>
                                            </div>
                                        </div>
        
                                        <div class="section_option">
                                            <div title="${apply.ID}" class="option_accept">accept</div>
                                            <div title="${apply.ID}" class="option_refuse">refuse</div>
                                        </div>
                                            </div>`
                                        }
                                    }).join("")
                                }).join("")
                            })

                            var htmls = result.join("")
                            container_section1.innerHTML = htmls
                            container_section1.style.display = "block"
                            if (d != 0) {
                                container_notthing1.style.display = "none"
                            }
                        })
                })
        })



}

loadProfileApply();

var option_accept
var option_refuse
var wrap_item;
const apiDeleteApply = "http://localhost:5000/deletedataApply";
var bien = setInterval(() => {
    option_accept = document.querySelectorAll('.option_accept')
    option_refuse = document.querySelectorAll('.option_refuse')
    wrap_item = document.querySelectorAll('.wrap_item')
    if (wrap_item && option_accept && option_refuse) {
        clearInterval(bien)
        option_accept.forEach((element) => {
            element.onclick = (e) => {
                e.path.forEach(item => {
                    if (item.className == 'wrap_item') {
                        postOption(item, element)
                    }
                })
            }
        })
        option_refuse.forEach((element) => {
            element.onclick = (e) => {
                e.path.forEach(item => {
                    if (item.className == 'wrap_item') {
                        postOption(item, element)
                    }
                })
            }
        })
    }
}, 500)
function postOption(item, element) {
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
                    applys.forEach((apply) => {
                        profiles.forEach((profile) => {
                            if (element.title == apply.ID && apply.IDPROFILE == profile.ID) {
                                console.log(element.title);
                                fetch(apiPostOption, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: JSON.stringify({
                                        "IDPOST": apply.IDPOST,
                                        "IDSEEKER": profile.IDSEEKER,
                                        "IDCOMPANY": apply.IDCOMPANY,
                                        "IDPROFILE": apply.IDPROFILE,
                                        "STATUS": element.textContent
                                    })
                                })
                                fetch(apiDeleteApply + `/${apply.IDPOST}/${apply.IDPROFILE}`, {
                                    method: 'DELETE'
                                })
                            }
                        })
                        item.style.display = "none"
                    })
                })
        })

}

