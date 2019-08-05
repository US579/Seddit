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
export function addCloseListener(func, id1, id2) {
    if (func === 1) {
        // console.log(id1, " ", id2);
        var close1 = document.getElementById(id1);
        close1.onclick = () => {
            document.getElementById(id2).style.display = "none";
            // refresh page
            pgswitch();
        };
    }

    if (func === 2) {
        var onBut1 = document.getElementById("login_button");
        const dc1 = document.getElementById('signup-01');
        onBut1.onclick = () => {
            if (dc1.style.display == "none") {
                document.getElementById("login-01").style.display = "block";
                pgswitch(1);
            } else {
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
            } else {
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



export function loginToBack() {
    var signup_url = "http://127.0.0.1:5000/auth/login"
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
        .then(function (res) {
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
    var signup_url = "http://127.0.0.1:5000/auth/signup"
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

//--------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------- display user feed when login  (cotains profiles)-------------------------------------
export async function getUserFeed(token, option = 2) {
    var profile_url = "http://127.0.0.1:5000/user/"
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
            let profile = profileGenerator(res, 1);
            if (option === 2) {
                feed.innerHTML = "";
                feed.appendChild(profile);
            }
            fetchUserFeed();
        })
}


function fetchUserFeed() {
    const feed_url = "http://127.0.0.1:5000/user/feed";
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
            // if (res.posts.length === 0) {
            //     feed.appendChild(createElement("div", "Wow,such empty", { class: "empty-feed",id:"empty-feed" }))
            // }
            for (let i = res.posts.length - 1; i > -1; i--) {
                // console.log(i)
                // console.log(res.posts.length)
                let content = createPageFeed(res.posts[i]);
                feed.appendChild(content);
            }
        })
}
//--------------------------------------------------------------------------------------------------


//------------------------infinte feed

export function infinteScroll() {
    document.addEventListener("scroll", () => {
        // alert("scroll")
        // console.log("scroll")
        // const lastNode = document.getElementById("feed").lastChild;
        if (checkLocalStore("location") === 'feed') {
            if (threshold()) {
                getUserFeed(checkLocalStore("token"), 1);
            }
        }
    }, false)
}

function threshold() {
    let fullHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    let viewportHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight);
    let scrollHeight = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    return fullHeight - viewportHeight - scrollHeight < 20;
}


// ----------------------------------------------------------------------------- Post templete  ------------------------------------------------------------------
export function createPageFeed(post, option = 1) {
    // time 
    let postTime = time2time(post.meta.published);
    // let upvote = createElement("span", post.meta.upvotes.length, { "data-id-upvotes": "", className: "post-upvote" });
    let section = createElement('section', null, { "data-id-post": "", class: 'page-feed', id: post.id, style: "display:block;" });
    let post_front_title = createElement("div", null, { class: 'post-front-title' });

    let subreddit = createElement('span', "r/" + post.meta.subseddit + " • ", { class: 'post-subseddit', style: 'cursor:pointer' });
    post_front_title.appendChild(subreddit);
    let postby = createElement('span', "Posted by @ ", { style: "color: rgb(120, 124, 126);", class: "post-by", id: 'post-by' + post.id });
    post_front_title.appendChild(postby);
    let auther = createElement('span', post.meta.author, { "data-id-author": "", class: 'post-auther', style: "color: rgb(120, 124, 126);", style: 'cursor:pointer', id: 'post-author-id' + post.id });
    //转到auther的post
    // author.addEventListener('click', () => userpost(post.meta.author))

    post_front_title.appendChild(auther);
    let time = createElement('h6', postTime, { class: 'post-time', style: "color: rgb(120, 124, 126);" });
    post_front_title.appendChild(time);
    let follow_button = createElement('img', null, { src: '/src/icon/follow.png', id: 'follow_button' + post.id, class: 'follow-button', style: "cursor:pointer" })
    let unfollow_button = createElement('img', null, { src: '/src/icon/unfollow.png', id: 'unfollow_button' + post.id, class: 'follow-button', style: "cursor:pointer" })
    post_front_title.appendChild(follow_button)
    post_front_title.appendChild(unfollow_button)
    follow_button.addEventListener("click", () => toFollow(post.meta.author));
    unfollow_button.addEventListener("click", () => tounFollow(post.meta.author));
    section.appendChild(post_front_title);

    section.appendChild(createElement("h5", post.title, { "data-id-title": "", class: "post-title", id: "post-title-id" + post.id }));
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
    // console.log(post.id)
    likeicon.addEventListener('click', () => thumbsup(post.id));
    section.appendChild(likeicon);

    section.appendChild(createElement('h6', post.meta.upvotes.length, { "data-id-upvotes": "", class: "post_count_num", id: "likes-num" + post.id }));


    const dislikeicon = createElement('img', null,
        { src: '/src/icon/down.png', alt: "dislike", class: 'post-button', style: "cursor:pointer" });
    dislikeicon.addEventListener('click', () => al(post.id))

    section.appendChild(dislikeicon);


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
    section.appendChild(createElement('h6', post.comments.length, { class: "post_count_num", id: "comment-num" + post.id }));

    //delete button
    let delete_post_button = createElement('img', null, { src: '/src/icon/delete.png', id: "delete-post", alt: 'delete', class: 'post-button', style: "cursor:pointer" })
    section.appendChild(delete_post_button);
    delete_post_button.addEventListener('click', () => deletePost(post.id));

    // upvote tag
    let upvote_button = createElement('img', null, { src: '/src/icon/upvote.png', alt: 'upvote', class: 'post-button', style: "cursor:pointer", id: "upvote-name-" + post.id })
    section.appendChild(upvote_button);
    // option for distinguish initial feed between user feed
    if (option === 1) {
        let upvote_tag = upvote_list(post.meta.upvotes, post.id);
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
    // section.appendChild(createElement('h6', post.meta.upvotes.length, { "data-id-upvotes": "", class: "post_count_num", id: "likes-num" + post.id }));
    // section.appendChild(createElement('h6', post.comments.length, { class: "post_count_num", id: "comment-num" + post.id }));
    // section.appendChild(createElement('h6', null, { class: "post-padding" }));
    section.appendChild(createElement("input", null, { class: "comment_add_input", placeholder: "Enter your comment here", id: "comment-add-input-" + post.id }))

    let comment_add_button = createElement("button", "add", { class: "comment_add_button", style: "cursor:pointer", id: "comment-add-button-" + post.id })
    section.appendChild(comment_add_button);
    comment_add_button.addEventListener("click", () => addcomment(post.id));


    section.appendChild(createElement('h6', null, { class: "post-padding" }));
    if (post.comments.length > 0) {
        section.appendChild(commentGenerator(post.id, post.comments))

    } else {
        let div_comment = createElement("div", null, { class: "post-comments-div", style: "display:none;", id: "post-comments-div-" + post.id })
        div_comment.appendChild(createElement("div", "No Comments Yet", { class: "post-comments-div", style: "display: none;", id: "post-comments-div-" + post.id }));
        section.appendChild(div_comment)
    }
    return section;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// sub-function to check whether user thumbs up or not
function al(id){
    // console.log("like-num" + id)
    alert(checkLocalStore("like-num" + id))
     if (checkLocalStore("like-num"+id)){
            thumbsdown(id);
            window.localStorage.removeItem("like-num" + id);
        } else{
            alert("you did not thumbs up");

        }
}



//---------------------------------------------------------------------------------- update profile function----------------------------------------------------------------------------------
export function updateProfile() {
    let email = document.getElementById("profile-email").value
    let name = document.getElementById("profile-name").value
    let password = document.getElementById("profile-password").value
    if (!email && !name && !password) {
        alert("At least on filed must be non empty ")
        return false;
    }

    const content = {
        "email": email,
        "name": name,
        "password": password,
    }
    profileChangeRequest(content);


}

function profileChangeRequest(content) {
    let post_url = "http://127.0.0.1:5000/user/";
    fetch(post_url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
        body: JSON.stringify(content),
    })
        .then(res => res.json())
        .then(function (res) {
            if (res.msg === "success") {
                alert("you have update profile successfully")
            }
        })

}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


//follow function
function toFollow(username) {
    let follow_url = "http://127.0.0.1:5000/user/follow?username=" + username;
    fetch(follow_url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
        .then(res => res.json())
        .then(function (res) {
            if (checkLocalStore("token")) {
                if (checkLocalStore("username") === username) {
                    alert("you can not follow yourself")
                    return false;
                }
                alert("follow successfully!");
                document.getElementById("my_profile").click();
            } else {
                alert("you have to login first");
            }
        })
}

//unfollow function
function tounFollow(username) {
    let unfollow_url = "http://127.0.0.1:5000/user/unfollow?username=" + username;
    fetch(unfollow_url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
        .then(res => res.json())
        .then(function (res) {
            // console.log(res)
            if (checkLocalStore("token")) {
                if (checkLocalStore("username") === username) {
                    alert("you can not follow yourself")
                    return false;
                }
                alert("unfollow successfully!");
                document.getElementById("my_profile").click();
            } else {
                alert("you have to login first");
            }
        })
}


// thumbsup function 
function thumbsup(id) {
    alert("thumbs");
    alert(checkLocalStore("like-num" + id))
    if (checkLocalStore("like-num"+id)){
        alert("you have thumbsup alreadly");
        return false;
    }
    let thumbsup_url = "http://127.0.0.1:5000/post/vote?id=" + id;
    fetch(thumbsup_url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res)
            if (res.message === "success") {
                let addlike = document.getElementById("likes-num" + id);
                alert("likes-num" + id);
                window.localStorage.setItem("like-num" + id,'1');
                console.log("likes-num" + id);
                console.log(checkLocalStore("like-num" + id));
                addlike.innerText = parseInt(document.getElementById("likes-num" + id).innerText) + 1;
            } else {
                if (res.message === "Internal Server Error") {
                    alert('can not like yourself')
                    return;
                }
                alert("you have to login first")
            }
        })

}
// thumbsdown function
function thumbsdown(id) {
    let thumbsup_url = "http://127.0.0.1:5000/post/vote?id=" + id;
    fetch(thumbsup_url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
        .then(res => res.json())
        .then(function (res) {
            // console.log(res)
            if (res.message === "success") {
                let addlike = document.getElementById("likes-num" + id);
                addlike.innerText = parseInt(document.getElementById("likes-num" + id).innerText) - 1;
            } else {
                if (res.message === "Internal Server Error") {
                    alert('can not dislike yourself')
                    return;
                }
                alert("you have to login first")
            }
        })
}



//---------------------------------post function-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// new  post function
export function newPost() {
    // alert("hahahah")
    // before read image clean the img store in the localstorge
    window.localStorage.setItem('postimg', 0);

    // listen on the file uploader and store the image in the localstorge
    fileLoaderlistener();
    // console.log(checkLocalStore("postimg"))
    let post_Bnt = document.getElementById("post-Bnt");
    post_Bnt.onclick = function () {

        let text = document.getElementById("description")
        let title = document.getElementById("post-title")
        let subseddit = document.getElementById("post-sub-seddit")
        if (!text.value || !title.value) {
            alert("description and title must be non empty ")
            return false;
        }
        console.log(checkLocalStore("postimg"))
        if (checkLocalStore("postimg") == "0") {
            const content = {
                "title": title.value,
                "text": text.value,
                "subseddit": subseddit.value,
            };
            post_request(content);
        } else {
            const content = {
                "title": title.value,
                "text": text.value,
                "subseddit": subseddit.value,
                "image": checkLocalStore("postimg")
            };
            post_request(content);
        }
    }
}

//sub function to request
function post_request(content) {
    let post_url = "http://127.0.0.1:5000/post/";
    fetch(post_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
        body: JSON.stringify(content),
    })
        .then(res => res.json())
        .then(function (res) {
            if (res.post_id) {
                document.getElementById("my_profile").click();
                alert("you have posted successfully")
            }
        })
}

// sub function to post 
function fileLoaderlistener() {
    let fileUpload = document.getElementById("file_upload");
    fileUpload.addEventListener("change", (event) => {
        const [file] = event.target.files;
        const validFileTypes = ['image/png']
        const validType = validFileTypes.find(type => type === file.type);
        if (!validType) {
            alert("img must be PNG");
            return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            // alert("hhaha")
            let content = e.target.result.split(',')[1]
            window.localStorage.setItem('postimg', content);
        }
    })
}

//---------------------------------------------------------------------------------------------------------------------------------------post function--------------------------------------------------------------------------------

// ----------------------------------------------------------------- add comment ----------------------------------------------------------------------------------

async function addcomment(id) {
    let addcomment_url = "http://127.0.0.1:5000/post/comment?id=" + id;
    let comments_content = document.getElementById("comment-add-input-" + id)
    const comments = {
        "comment": comments_content.value,
    };
    // console.log(comments)
    // console.log(addcomment_url)
    // console.log(checkLocalStore("token"))
    await fetch(addcomment_url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token"),
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(comments),
    })
        .then(res => res.json())
        .then(function (res) {
            // insert from here 
            let comment_div = document.getElementById("post-comments-div-" + id);
            // console.log(res)
            var myDate = new Date();
            // console.log(myDate)

            if (checkLocalStore("token")) {
                comment_div.insertBefore(createElement("h4", comments_content.value, { class: "post-comments-content", }), comment_div.firstChild);
                comment_div.insertBefore(createElement("span", "   " + myDate.toLocaleString(), { class: "post-comments-time", style: "color: rgb(120, 124, 126);" }), comment_div.firstChild)
                comment_div.insertBefore(createElement("span", checkLocalStore("username"), { class: "post-comments-author", }), comment_div.firstChild)
                comment_div.insertBefore(createElement("span", "* Posted by @ ", { class: "post-comments-postby", style: "color: rgb(120, 124, 126);" }), comment_div.firstChild)
                let comment_num = document.getElementById("comment-num" + id);
                comment_num.innerText = parseInt(document.getElementById("comment-num" + id).innerText) + 1;
            } else {
                // console.log(checkLocalStore("token"))
                alert("you have to login first !")
            }
        })
}





//  ----------------------------------------------------------------- add comment -------------------------------------------------------------------------



// ---------------------------------------------------------------delete post function------------------------------------------------------------------------------------------------------
function deletePost(id) {
    let thumbsup_url = "http://127.0.0.1:5000/post/?id=" + id;
    fetch(thumbsup_url, {
        method: 'DELETE',
        headers: {
            "accept": "application/json",
            "Authorization": "Token " + checkLocalStore("token")
        }
    })
        .then(res => res.json())
        .then(function (res) {
            // alert("delete")
            // console.log(res)
            if (res.message === "success") {
                document.getElementById("my_profile").click();
                alert("Post has been deleted")
            }
            else if (res.message === "You Are Unauthorized To Make That Request") {
                alert("you are not permmit to delete others post")
                return false;
            } else {
                if (res.message === "Internal Server Error") {
                    alert('can not like yourself')
                    return false;
                }
                alert("delete failed")
            }
        })


}


// list : a list of the user id (whe give thumbs up to the user)
// id : the user of the id 
export function upvote_list(list, id) {
    let upvote_div = createElement("div", null, { class: "modal-window", id: "post-upvote-" + id, style: "display:none;" });
    upvote_div.appendChild(createElement("h5", "People who gives you thumbs up ", { id: "upvote=-instruction" }))
    upvote_div.onclick = function () {
        upvote_div.style.display = "none";
    }
    // console.log(list)
    for (let i = 0; i < list.length; ++i) {
        const upvote_url = "http://127.0.0.1:5000/user/?id=" + list[i];
        fetch(upvote_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + checkLocalStore("token")
            },
        })
            .then(res => res.json())
            .then(function (res) {
                upvote_div.appendChild(createElement("p", res.name, { class: "upvote-name" }))
            })
    }
    return upvote_div;
}


// create comment elements and return 
function commentGenerator(id, comment) {
    let div_comment = createElement("div", null, { class: "post-comments-div", style: "display:none;", id: "post-comments-div-" + id })
    // div_comment.appendChild(createElement("input", null, { class: "comment_add_input", style: "display:inline;", placeholder: "Enter your comment here", id: "comment-add-input-" + id }))
    // div_comment.appendChild(createElement("button", "add", { class: "comment_button_input", style: "cursor:pointer", id: "comment-add-button-" + id }))
    // div_comment.appendChild(createElement('h6', null, { class: "post-padding" }));
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
export async function getUserPost(token) {
    var profile_url = "http://127.0.0.1:5000/user/"
    // var profile_url = "http://127.0.0.1:5000/user/?id=3"
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
            let profile = profileGenerator(res, 2);
            feed.innerHTML = "";
            feed.appendChild(profile)
            feed.appendChild(postGenerator());
            feed.appendChild(updateProfileGenerator());
            // if (res.following.length === 0) {
            //     feed.appendChild(createElement("div", "Wow,such empty", { class: "empty-feed" }))
            // }
            // let buttonTag3 = createElement("button", "Post", { class: "button button-secondary", id: "post-button", style: "cursor:pointer" })
            // feed.appendChild(buttonTag3);
            if (res.posts.length > 0) {
                // console.log(res.posts.length )
                for (let i = res.posts.length - 1; i != -1; i--) {
                    console.log(i)
                    // console.log(res.following[i])
                    fetchUserPost(res.posts[i]);
                }
            }
        })
}

function fetchUserPost(id) {
    const feed_url = "http://127.0.0.1:5000/post/?id=" + id;
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


function postGenerator() {
    let postDIv = createElement("div", null, { id: "Post-to-db", class: "post-to-db" })
    // postDIv.appendChild(createElement("span", , { type: "file", class: "inputfile", id: "file_upload", placeholder: "Enter your description here" }));
    postDIv.appendChild(createElement("input", null, { type: "file", class: "inputfile", id: "file_upload", placeholder: "Enter your description here" }));
    postDIv.appendChild(createElement("input", null, { id: "post-title", class: "post-input", placeholder: "Enter your title here", }));
    postDIv.appendChild(createElement("input", null, { id: "description", class: "post-input", placeholder: "Enter your description here", }));
    postDIv.appendChild(createElement("input", null, { id: "post-sub-seddit", class: "post-input", placeholder: "Enter your subseddit here", }));
    postDIv.appendChild(createElement("button", "Post", { class: "post-Bnt", id: "post-Bnt", style: "cursor:pointer" }));
    // test for post button
    return postDIv;
}


function updateProfileGenerator() {
    let postDIv = createElement("div", null, { id: "profile-change-div", class: "post-to-db" })
    // postDIv.appendChild(createElement("span", , { type: "file", class: "inputfile", id: "file_upload", placeholder: "Enter your description here" }));
    postDIv.appendChild(createElement("input", null, { id: "profile-email", class: "post-input", placeholder: "Enter your email here", }));
    postDIv.appendChild(createElement("input", null, { id: "profile-name", class: "post-input", placeholder: "Enter your name here", }));
    postDIv.appendChild(createElement("input", null, { id: "profile-password", class: "post-input", placeholder: "Enter your password here", }));
    postDIv.appendChild(createElement("button", "Change", { class: "post-Bnt", id: "profile-change-Bnt", style: "cursor:pointer" }));
    // test for post button
    return postDIv;
}

// user feed : 1
// user post : 2
function profileGenerator(res, option) {
    let profile = createElement("div", null, { id: "profile-" + res.id, class: "profile" })
    if (option === 2) {
        profile.appendChild(createElement("button", "Post", { class: "post-Bnt-1", id: "post-Bnt-1", style: "cursor:pointer" }));
    }
    let img_name_div = createElement("div", null, { class: "img-name-div", id: "img-name-div-" + res.id, style: "display:inline" })
    img_name_div.appendChild(createElement('img', null, { src: '/src/icon/default.png', id: "default-img", alt: 'default', class: 'default-img', style: "cursor:pointer" }))
    img_name_div.appendChild(createElement("div", res.name, { class: "profile-name", style: "display:inline" }))
    profile.appendChild(img_name_div)
    // console.log(res.following)
    let profile_sub_div = createElement("div", null, { class: "profile-sub-div", id: "profile-sub-div" + res.id })
    profile_sub_div.appendChild(createElement("b", "Following: " + res.following.length, { class: "profile-following" }))

    upvoteCaculator(res.id)

    profile_sub_div.appendChild(createElement("b", "Upvotes: " + likenum, { class: "profile-upvotes" }))
    profile_sub_div.appendChild(createElement("b", "Followed: " + res.followed_num, { class: "profile-followed" }))
    profile_sub_div.appendChild(createElement("b", "Posts: " + res.posts.length, { class: "profile-posts" }))
    profile.appendChild(profile_sub_div);
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



// ----------------------------------------total upvotes-----------------------------------------------------------

// global var  only to caculate the total upvotes
var likenum = 0;
var nummm = 0;


export async function upvoteCaculator(id) {
    var profile_url = "http://127.0.0.1:5000/user/"

    fetch(profile_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + checkLocalStore("token")
        },
    })
        .then(res => res.json())
        .then(function (res) {
            for (let i = 0; i < res.posts.length; i++) {
                console.log(res.posts[i])
                getUpvoteNum(res.posts[i])
                likenum += nummm;
            }
        })
}

async function getUpvoteNum(id) {
    let thumbsup_url = "http://127.0.0.1:5000/post/?id=" + id;
    await fetch(thumbsup_url, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": "Token " + checkLocalStore("token")
        }
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res.meta.upvotes.length)
            nummm = res.meta.upvotes.length
        })

}
// ---------------------------------------------------------------------------------------------------
