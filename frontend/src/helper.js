
export function is_number(e) {
    var char_code = e.charCode ? e.charCode : e.keyCode;
    if ((char_code >= 48 && char_code <= 57) || (char_code == 46)) {
        return true;
    }
    else {
        return false;
    }
}

// 1 for close 
// 2 for login
// 3 for signup
export function addCloseListener(func,id1,id2){
    if (func === 1){
        // console.log(id1, " ", id2);
        var close1 = document.getElementById(id1);
        close1.onclick = () => {
            document.getElementById(id2).style.display = "none";
            // refresh page
            pgswitch();
        };
    }

    if (func === 2){
        var onBut1 = document.getElementById("login_button");
        const dc1 = document.getElementById('signup-01');
        onBut1.onclick = () => {
            if (dc1.style.display == "none") {
                document.getElementById("login-01").style.display = "block";
                pgswitch(1);
            }else{
                dc1.style.display = "none";
                document.getElementById("login-01").style.display = "block";
            }
        };
    }

    if (func === 3) {
        var onBut2 = document.getElementById("signup_button");
        const dc = document.getElementById('login-01');
        onBut2.onclick = () => {
            if (dc.style.display == "none") {
                document.getElementById("signup-01").style.display = "block";
                pgswitch(1); 
            }else{
                dc.style.display = "none";
                document.getElementById("signup-01").style.display = "block";

            }
        };
    }
}


export function pgswitch(option = 0) {
    if (option == 1) {
        document.getElementById('feed').style.display = 'none';
    }
    else {
        document.getElementById('feed').style.display = 'block';
    }
}




// model window

// var modal = document.getElementById('simpleModal');
// var modalBtn = document.getElementById('modalBtn');
// var closeBtn = document.getElementsByClassName('closeBtn')[0];
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);

// window.addEventListener('click', outsideClick);

// function openModal() {
//     modal.style.display = "block";
// }

// function closeModal() {
//     modal.style.display = 'none';
// }

// function outsideClick(e) {
//     if (e.target == modal) {
//         modal.style.display = 'none';
//     }
// }



export function loginToBack() {
    var signup_url = "http://127.0.0.1:5003/auth/login"
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    if ((!username) || (!password)) {
        alert('username and password can not be empty');
        return false;
    }
   
    const user = {
        "username": username,
        "password": password
    };
    fetch(signup_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(function (res) {
            if (res["token"]) {
                console.log(res["token"])
                window.alert('You are successfully logged in');
                window.localStorage.setItem('username', username);
                window.localStorage.setItem('id', res.id);
                window.localStorage.setItem('token', res['token']);
                hidebutton();
                // location.reload()
            }
            console.log(res.message)
            if (res.message === "Invalid Username/Password") {
                alert("user and password is not correct")
                return false;
            }
        })
        .then(function (res){
            getUserFeed(checkLocalStore("token"))
        })
    
}

function hidebutton() {
    document.getElementById("login-01").style.display = "none";
    document.getElementById("signup-01").style.display = "none";
    document.getElementById("login_button").style.display = "none";
    document.getElementById("signup_button").style.display = "none"
    document.getElementById("Home").style.display = "inline";
    document.getElementById("my_profile").style.display = "inline";
    document.getElementById("logout_button").style.display = "inline";
    document.getElementById("feed").style = "block";
}


export function signupToBack() {
    var signup_url = "http://127.0.0.1:5003/auth/signup"
    var submit = document.getElementById("signup_submit");
    submit.onclick = function () {
        var username = document.getElementById('signup-username').value;
        var password = document.getElementById('signup-password').value;
        var email = document.getElementById('signup-email').value;
        var name = document.getElementById('signup-name').value;
        if ((!username) || (!password) || (!email) || (!name)) {
            alert('Input can not be empty');
            return false;
        }
        const user = {
            "username": username,
            "password": password,
            "email": email,
            "name": name
        };
        fetch(signup_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(function (res) {
                if (res["token"]) {
                    // console.log(res["token"])
                    window.alert('You are successfully signup');
                    window.localStorage.setItem('username', username);
                    window.localStorage.setItem('token', res['token']);
                    location.reload();
                }
                if (res.message === 'Username Taken') {
                    alert("user alreadly exists")
                    return false;
                }
            })
    }
}



//--------------------------------------------------------------------------------------------------------













//------------------------------------- display user feed when login  (cotains profiles)-------------------------------------
// getUserProfile(checkLocalStore("token"))
export async function getUserFeed(token) {
    var profile_url = "http://127.0.0.1:5003/user/"
    await fetch(profile_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
        .then(function (res) {
            // console.log(res.id);
            let profile = profileGenerator(res,1);
            feed.innerHTML = "";
            feed.appendChild(profile);
            fetchUserFeed();
        })
    }
function fetchUserFeed() {
    const feed_url = "http://127.0.0.1:5003/user/feed";
    fetch(feed_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore('token')
        }
    })
    .then(res => res.json())
    .then(function (res) {
        console.log(res);
        // if (res.posts.length === 0) {
        //     feed.appendChild(createElement("div", "Wow,such empty", { class: "empty-feed",id:"empty-feed" }))
        // }
        for (let i = res.posts.length-1; i > -1  ;i--){
            let content = createPageFeed(res.posts[i]);
            feed.appendChild(content);
        }
    })
}
//--------------------------------------------------------------------------------------------------




// -------------------------------------------- Post templete  ---------------------------------
export function createPageFeed(post,option=1) {
    // time 
    let postTime = time2time(post.meta.published);
    // let upvote = createElement("span", post.meta.upvotes.length, { "data-id-upvotes": "", className: "post-upvote" });
    let section = createElement('section', null, { "data-id-post": "", class: 'page-feed', id: post.id , style: "display:block;"});
    let post_front_title = createElement("div", null, { class: 'post-front-title' });

    let subreddit = createElement('span', "r/" + post.meta.subseddit + " • ", { class: 'post-subseddit', style: 'cursor:pointer' });
    post_front_title.appendChild(subreddit);
    let postby = createElement('span', "Posted by @ ", { style: "color: rgb(120, 124, 126);", class: "post-by", id: 'post-by' + post.id });
    post_front_title.appendChild(postby);
    let auther = createElement('span', post.meta.author, { class: 'post-auther', style: "color: rgb(120, 124, 126);", style: 'cursor:pointer', id: 'post-author-id' + post.id });
    //转到auther的post
    // author.addEventListener('click', () => userpost(post.meta.author));

    post_front_title.appendChild(auther);
    let time = createElement('h6', postTime, { class: 'post-time', style: "color: rgb(120, 124, 126);" });
    post_front_title.appendChild(time);
    section.appendChild(post_front_title);

    section.appendChild(createElement("h5", post.title, { class: "post-title", id: "post-title-id" + post.id }));
    section.appendChild(createElement("h5", post.text, { class: "post-content", id: "post-content-id" + post.id }));

    if (post.image != null) {
        section.appendChild(createElement('img', null, { src: 'data:image/png;base64,' + post.image, class: 'post-image', id: 'post-image' + post.id, float: "" }));
    }
    // if (post.thumbnail != null) {
    //     section.appendChild(createElement('img', null, { src: 'data:image/png;base64,' + post.thumbnail, class: 'post-image', id: 'post-image' + post.id, float: "" }));
    // }
    const likeicon = createElement('img', null,
        { src: '/src/icon/up.png', alt: 'Likes', class: 'post-button', style: "cursor:pointer" });

    //增加like计数
    console.log(post.id)
    likeicon.addEventListener('click', () => thumbsup(post.id));
    section.appendChild(likeicon);
   
    //comment button
    let comment_button = createElement('img', null, { src: '/src/icon/comment.png', alt: 'Comments', class: 'post-button', style: "cursor:pointer" })
    section.appendChild(comment_button);


    // add event listener to the comment_button
    comment_button.addEventListener('click', () => {
        if (document.getElementById("post-comments-div-" + post.id).style.display === "block") {
            document.getElementById("post-comments-div-" + post.id).style.display = "none";
        } else {
            document.getElementById("post-comments-div-" + post.id).style.display = "block";
        }
    });
    //delete button
    let delete_post_button = createElement('img', null, { src: '/src/icon/delete.png', id:"delete-post",alt: 'delete', class: 'post-button', style: "cursor:pointer" })
    section.appendChild(delete_post_button);
    delete_post_button.addEventListener('click', () => deletePost(post.id));


    // upvote tag
    let upvote_button = createElement('img', null, { src: '/src/icon/upvote.png', alt: 'upvote', class: 'post-button', style: "cursor:pointer", id: "upvote-name-" + post.id })
    section.appendChild(upvote_button);
    // option for distinguish initial feed between user feed
    if (option === 1){
        let upvote_tag = upvote_list(post.meta.upvotes,post.id);
        section.appendChild(upvote_tag)
        upvote_button.addEventListener('click', () => {
            if (document.getElementById("post-upvote-" + post.id).style.display === "block") {
                document.getElementById("post-upvote-" + post.id).style.display = "none";
            } else {
                document.getElementById("post-upvote-" + post.id).style.display = "block";
            }
        });
    }

    // upvote_button.addCloseListener("click", () => upvote_list(post.meta.upvotes));

    section.appendChild(createElement('h6', null, { class: "post-padding" }));
    section.appendChild(createElement('h6', post.meta.upvotes.length, { "data-id-upvotes": "", class: "post_count_num", id: "likes-num" + post.id }));
    section.appendChild(createElement('h6', post.comments.length, { class: "post_count_num", id: "comment-num" + post.id }));
    section.appendChild(createElement('h6', null, { class: "post-padding" }));
    if (post.comments.length > 0) {
        section.appendChild(commentGenerator(post.id, post.comments))
    } else {
        section.appendChild(createElement("div", "No Comments Yet", { class: "post-comments-div", style: "display: none;", id: "post-comments-div-" + post.id }))
    }
    return section;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// thumbsup function 
function thumbsup(id){
    alert(id);
    let thumbsup_url = "http://127.0.0.1:5003/post/vote?id="+id;
    fetch(thumbsup_url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
    .then(res=>res.json())
    .then(function(res){
        console.log(res)
        if (res.message === "success"){
            let addlike = document.getElementById("likes-num" + id);
            addlike.innerText = parseInt(document.getElementById("likes-num" + id).innerText) + 1;
        }else{
            if (res.message === "Internal Server Error"){
                alert('can not like yourself')
                return;
            }
            alert("you have to login first")
        }
    })
    
}


// //follow function
// function follow(){

// }


// delete post function
// problem   依旧存在问题 返回 400
function deletePost(id){
    alert(id);
    let thumbsup_url = "http://127.0.0.1:5003/post/?id=" + id;
    console.log(checkLocalStore("token"))
    console.log("http://127.0.0.1:5003/post/?id=" + id)
    console.log("Token " + checkLocalStore("token"))
    fetch(thumbsup_url, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Authorization": "Token " + checkLocalStore("token")
        }
    })
        .then(res => res.json())
        .then(function (res) {
            alert("delete")
            console.log(res)
            if (res.message === "success") {
                alert("post has been deleted")
            } else {
                if (res.message === "Internal Server Error") {
                    alert('can not like yourself')
                    return;
                }
                alert("delete failed")
            }
        })


}


// list : a list of the user id (whe give thumbs up to the user)
// id : the user of the id 
export function upvote_list(list,id){
    let upvote_div = createElement("div", null, { class: "modal-window", id: "post-upvote-" + id, style: "display:none;"});
    upvote_div.appendChild(createElement("h5", "People who gives you thumbs up ", { id: "upvote=-instruction" }))
    upvote_div.onclick= function() {
        upvote_div.style.display="none";
    }
    console.log(list)
    for (let i = 0 ;i< list.length ; ++i){
    const upvote_url = "http://127.0.0.1:5003/user/?id=" + list[i];
    fetch(upvote_url,{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
    .then(res=>res.json())
    .then(function(res) {
        upvote_div.appendChild(createElement("p", res.name , {class: "upvote-name" }))
        })
    }
    return upvote_div; 
}




// create comment elements and return 
function commentGenerator(id, comment) {
    var div_comment = createElement("div", null, { class: "post-comments-div", style: "display:none;", id: "post-comments-div-" + id })
    // console.log(comment.length)
    // console.log(comment)
    for (let i = 0; i < comment.length; ++i) {
        // console.log(comment[i])
        div_comment.appendChild(createElement("span", "* Posted by @ ", { class: "post-comments-postby", style: "color: rgb(120, 124, 126);" }))
        div_comment.appendChild(createElement("span", comment[i].author, { class: "post-comments-author", }))

        div_comment.appendChild(createElement("span", "   " + time2time(comment[i].published), { class: "post-comments-time", style: "color: rgb(120, 124, 126);" }))
        div_comment.appendChild(createElement("h4", comment[i].comment, { class: "post-comments-content", }));
    }
    return div_comment;
}


//give some body thumbs up




//------------------------------------- display user post when login -------------------------------------
// getUserProfile(checkLocalStore("token"))
export async function getUserPost(token) {
    var profile_url = "http://127.0.0.1:5003/user/"
    // var profile_url = "http://127.0.0.1:5003/user/?id=3"
    await fetch(profile_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        //  .then(alert("asdasdas"))
        .then(res => res.json())
        .then(function (res) {
            // console.log(res)
            let profile = profileGenerator(res,2);
            feed.innerHTML = "";
            feed.appendChild(profile)
            feed.appendChild(postGenerator());
            // if (res.following.length === 0) {
            //     feed.appendChild(createElement("div", "Wow,such empty", { class: "empty-feed" }))
            // }
            // let buttonTag3 = createElement("button", "Post", { class: "button button-secondary", id: "post-button", style: "cursor:pointer" })
            // feed.appendChild(buttonTag3);
            for (let i = res.posts.length-1; i != 0; i--) {
                // console.log(res.following[i])
                fetchUserPost(res.posts[i]);
            }
        })
}

function fetchUserPost(id) {
    const feed_url = "http://127.0.0.1:5003/post/?id=" + id;
    fetch(feed_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore('token')
        }
    })
        .then(res => res.json())
        .then(function (res) {
            // console.log(res);
            let content = createPageFeed(res);
            // console.log(content)
            // console.log(res.meta)
            // document.getElementById("feed").appendChild(postGenerator());
            document.getElementById("feed").appendChild(content);
        })
}



function postGenerator(){
    let postDIv = createElement("div",null,{id:"Post-to-db",class:"post-to-db"})
    postDIv.appendChild(createElement("input", null, { type: "file", id: "file_upload", placeholder:"Enter your description here"}));
    postDIv.appendChild(createElement("input", null, { id: "decription", placeholder: "Enter your description here",}));
    postDIv.appendChild(createElement("button", "Post", { class: "post-Bnt", id: "post-Bnt", style: "cursor:pointer" }));
    // test for post button
    return postDIv;
}

// user feed : 1
// user post : 2
function profileGenerator(res,option) {
    let profile = createElement("div", null, { id: "profile-" + res.id, class: "profile" })
    // if (option===2){
    // profile.appendChild(createElement("button", "Post", { class: "post-Bnt", id: "post-Bnt", style: "cursor:pointer" }));
    // }
    profile.appendChild(createElement("div", res.name, { class: "profile-name" }))
   
    // console.log(res.following)
    profile.appendChild(createElement("b", "Following: " + res.following.length, { class: "profile-following" }))
    profile.appendChild(createElement("b", "Upvotes: " + res.followed_num, { class: "profile-upvotes" }))
    profile.appendChild(createElement("b", "Followed: " + res.followed_num, { class: "profile-followed" }))
    profile.appendChild(createElement("b", "Posts: " + res.posts.length, { class: "profile-posts" }))
    return profile;

}

//--------------------------------------------------------------------------------------------------------------





// ------------------------------------------function tools--------------------------------------------------

// sort published 
export function sortArray(res) {
    var dic = {};
    for (let i = 0; i < res.posts.length; ++i) {
        let published = res.posts[i].meta.published;
        dic[i] = parseInt(published);
    }
    var res2 = Object.keys(dic).sort(function (a, b) { return dic[b] - dic[a]; });
    return res2;
}

export function checkLocalStore(key) {
    if (window.localStorage) {
        console.log(window.localStorage.getItem(key));
        return window.localStorage.getItem(key);
    } else {
        return null
    }
}


function time2time(Time) {
    const unixTime = new Date(Time * 1000);
    return unixTime.toLocaleString('en-AU');
}


export function createElement(tag, data, options = {}) {
    const ele = document.createElement(tag);
    ele.textContent = data;
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, ele);
}

// ---------------------------------------------------------------------------------------------------