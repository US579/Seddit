
// initial the start page
export function addElement() {
    // create a new div element 
    let newHeader = document.createElement("header");
    newHeader.className = 'banner';
    newHeader.id = "nav";
    //  tag : header->h1
    let newH1 = document.createElement("h1");
    newH1.id = "logo";
    newH1.className = "flex-center";
    newH1.innerText = "Seddit";

    // add to the father
    newHeader.appendChild(newH1);
    // // tag : header->ul
    // let newUl = document.createElement("ul");
    // newUl.className = 'nav';
    // // tag : ul->li

    // // tag : li -> input
    // let inputTag = document.createElement("input");
    // inputTag.id = "search";
    // inputTag.setAttribute("data-id-search","");
    // inputTag.placeholder = "Search Seddit";
    // inputTag.type = "search";

    // // tag : li -> button
    // let buttonTag = document.createElement("button");
    // buttonTag.setAttribute("data-id-login", "");
    // buttonTag.className = "button button-primary";
    // buttonTag.innerText = "Log In";
    // buttonTag.id = "bt1";
    // buttonTag.setAttribute("onclick" , "document.getElementById('id01').style.display='block'")
    // buttonTag.style ="cursor:pointer";

    // // tag : li -> button2
    // let buttonTag2 = document.createElement("button");
    // buttonTag2.setAttribute("data-id-signup", "");
    // buttonTag2.className = "button button-secondary"
    // buttonTag2.innerText = "Sign Up";
    // buttonTag2.id = "bt2";
    // signup_button.style = "cursor:pointer";

    // // loop for generate <header>
    // var but_and_input = [inputTag, buttonTag, logout_button, buttonTag2]
    // for (let i = 0; i < but_and_input.length; ++i) {
    //     let newLi = document.createElement("li");
    //     newLi.className = 'nav-item';
    //     newLi.appendChild(but_and_input[i]);
    //     newUl.append(newLi);
    // }
    // newHeader.appendChild(newUl);
    let newUl = buttonInit();

    newHeader.appendChild(newUl);
    // add the newly created element and its content into the DOM 
    
    let mainTag = document.createElement("main");
    mainTag.setAttribute("role",'main');
    // tag : main -> li
    let feedTag = document.createElement("ul");
    feedTag.id="feed";
    feedTag.setAttribute("data-id-feed","");
    // tag : feed-header
    let divTag = document.createElement("div");
    divTag.className ="feed-header";
    // tag : h3 tag
    let h3Tag = document.createElement("h3");
    h3Tag.className = "feed-title alt-text";
    h3Tag.innerText ="Popular posts";
    //tag : button3
    let buttonTag3 = document.createElement("button");
    buttonTag3.className ="button button-secondary";
    buttonTag3.innerText="Post";
    buttonTag3.id = "bt3";
    buttonTag3.style = "cursor:pointer";

    divTag.appendChild(h3Tag);
    divTag.appendChild(buttonTag3);
    feedTag.append(divTag);

    mainTag.appendChild(feedTag);
    //footer
    let footerTag = document.createElement("footer");
    let pTag = document.createElement("p");
    pTag.innerText="Written by Wanze Liu";
    footerTag.appendChild(pTag);
    // root tag
    var currentDiv = document.getElementById("root");
    currentDiv.appendChild(newHeader);
    currentDiv.appendChild(mainTag);
    currentDiv.appendChild(footerTag);
    addlogin("login-01");
    addlogin("signup-01");
}

function buttonInit(){
    let newUl = document.createElement("ul");
    newUl.className = 'nav';
    let search_input = createElement("input", "Search Seddit", { "data-id-search": "", placeholder: "Search Seddit", type: "search", id: "search_input", display:"inline"});
    let login_button = createElement("button", "Log In", { "data-id-login": "", style: "cursor:pointer", id: "login_button", class: "button button-primary", display:"inline" });
    let signup_button = createElement("button", "Sign Up", { "data-id-signup": "", style: "cursor:pointer", id: "signup_button", class: "button button-primary", display:"inline" });

    let my_profile = createElement("button", "My profile", { "data-id-myprofile": "", style: "cursor:pointer;display:none", id: "my_profile", class: "button button-primary", });
    let Home = createElement("button", "Home", { "data-id-home": "", style: "cursor:pointer;display:none", id: "Home", class: "button button-primary", display: "inline" });
    let logout_button = createElement("button", "Log out", { "data-id-logout": "", style: "cursor:pointer;display:none", id: "logout_button", class: "logout-button-class" });
    // loop for generate <header>
    var but_and_input = [search_input, login_button, signup_button, my_profile, Home, logout_button]
    for (let i = 0; i < but_and_input.length; ++i) {
        let newLi = document.createElement("li");
        newLi.className = 'nav-item';
        newLi.appendChild(but_and_input[i]);
        newUl.append(newLi);
    }
    return newUl;
}

export function addPost(data,auther,options = {}){
    let divTag = document.createElement("div");
    divTag.className="vote";
    divTag.setAttribute("data-id-upvotes","");

    let divTag1 = document.createElement("div");
    divTag1.className = "content";

    let h4Tag = document.createElement("h4");
    h4Tag.setAttribute("data-id-title","");
    h4Tag.className ="post-title alt-text";
    h4Tag.innerText=data;

    let pTag = document.createElement("p");
    pTag.className = "post-author";
    pTag.setAttribute("data-id-author","");
    pTag.innerText ="Posted by @"+auther;

    let postArray = [h4Tag,pTag];
    for(let i = 0 ; i < postArray.length;++i){
        divTag1.appendChild(postArray[i]);
    }
    let liTag = document.createElement("li");
    liTag.className="post";
    liTag.setAttribute("data-id-post","");
    liTag.appendChild(divTag);
    liTag.appendChild(divTag1);

    var currentDiv = document.getElementById("feed");
    currentDiv.appendChild(liTag);
} 


function addlogin(value){
    let form = document.createElement("div");
    form.id = value;
    form.className="formlc";
    form.setAttribute("style","display:none");
    
    
    let div1 = document.createElement("div");
    div1.innerText ="Username:";
    let div2 = document.createElement("div");
    div2.innerText = "Password:";
    let br = document.createElement("br");

    let input1 = document.createElement("input");
    if (value === "signup-01") {
        input1.id = "signup-username";
    }else{
        input1.id = "login-username";
    }
    input1.type="text";
    input1.placeholder ="Enter Username";
    input1.name="uname";
    // input1.setAttribute("required","required");

    let input2 = document.createElement("input");
    if (value === "signup-01") {
        input2.id = "signup-password";
    }else{
        input2.id = "login-password";
    }
    input2.type = "password";
    input2.placeholder = "Enter Password";
    input2.name = "psw";
    // input2.setAttribute("required", "required");
    
    let submit = document.createElement("button");
    if (value === "signup-01") {
        submit.id="signup_submit";
    }else{
        submit.id = "login_submit";
    }
    submit.className ="submtn";
    submit.type="submit";
    submit.value="Submit";
    submit.innerText = "Submit";

    let close = document.createElement("button");
    if (value === "signup-01") {
        close.id="close2";
    }else{
        close.id = "close1";
    }
    close.className ="cancelbtn";
    close.innerText="Cancel";

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(input1);
    form.appendChild(div2);
    form.appendChild(input2);
    if (value === "signup-01") {
        form.appendChild(createElement("div","Email",{id:"singup-email"}));
        form.appendChild(createElement("input", null,{placeholder:"Enter email address",class:"signup-input",id:"signup-email"}));
        form.appendChild(createElement("div","Name", {id: "singup-name"}));
        form.appendChild(createElement("input", null, {placeholder: "Enter name",class:"signup-input",id:"signup-name"}));
    }
    form.appendChild(createElement("br"));
    form.appendChild(createElement("br"));
    form.appendChild(submit);
    form.appendChild(close);
    var lis = document.getElementById("root");
    lis.insertBefore(form, lis.childNodes[lis.childNodes.length - 1]);

}


export function createFeed(post){
    return createPostTile(post);
}


function createPostTile(post) {
    // time 
    let postTime = time2time(post.meta.published);
    // let upvote = createElement("span", post.meta.upvotes.length, { "data-id-upvotes": "", className: "post-upvote" });
    let section = createElement('section', null, { "data-id-post": "", class: 'post', id: post.id });
    let post_front_title = createElement("div", null, { class: 'post-front-title' })
    
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

    section.appendChild(createElement("h5",post.title,{class:"post-title",id:"post-title-id"+post.id}));
    section.appendChild(createElement("h5",post.text,{class:"post-content",id:"post-content-id"+post.id}));

    if (post.image != null) {
        section.appendChild(createElement('img', null, { src: 'data:image/png;base64,' + post.image, class: 'post-image', id: 'post-image' + post.id, float: "" }));
    }
    // if (post.thumbnail != null) {
    //     section.appendChild(createElement('img', null, { src: 'data:image/png;base64,' + post.thumbnail, class: 'post-image', id: 'post-image' + post.id, float: "" }));
    // }
    const likeicon = createElement('img', null,
        { src: '/src/icon/up.png', alt: 'Likes', class: 'post-button', style: "cursor:pointer" });

    //增加like计数
    // likeicon.addEventListener('click', () => tolike(post.id));
    section.appendChild(likeicon);
    let comment_button = createElement('img', null, { src: '/src/icon/comment.png', alt: 'Comments', class: 'post-button', style: "cursor:pointer" })
    section.appendChild(comment_button);
    comment_button.addEventListener('click', () => {
        if (document.getElementById("post-comments-div-" + post.id).style.display === "block"){
            document.getElementById("post-comments-div-" + post.id).style.display = "none";
        }else{
            document.getElementById("post-comments-div-" + post.id).style.display = "block";
        }
        
    });
    section.appendChild(createElement('h6', null, { class: "post-padding" }));
    section.appendChild(createElement('h6', post.meta.upvotes.length, { "data-id-upvotes": "", class: "post_count_num", id: "likes-num" + post.id }));
    section.appendChild(createElement('h6', post.comments.length, { class: "post_count_num", id: "comment-num" + post.id }));
    section.appendChild(createElement('h6', null, { class: "post-padding" }));
    if (post.comments.length > 0){
        section.appendChild(commentGenerator(post.id, post.comments))
    }else{
        section.appendChild(createElement("div", "No Comments Yet", { class: "post-comments-div", style: "display: none;", id: "post-comments-div-" + post.id }))
    }
    return section;
}

function commentGenerator(id,comment){
    var div_comment = createElement("div", null, { class: "post-comments-div", style:"display:none;",id:"post-comments-div-"+id})
    // console.log(comment.length)
    // console.log(comment)
    for (let i = 0; i < comment.length; ++i){
        // console.log(comment[i])
        div_comment.appendChild(createElement("span", "* Posted by @ ", { class: "post-comments-postby", style: "color: rgb(120, 124, 126);" }))
        div_comment.appendChild(createElement("span", comment[i].author, { class: "post-comments-author", }))
            
        div_comment.appendChild(createElement("span", "   " + time2time(comment[i].published), { class: "post-comments-time", style: "color: rgb(120, 124, 126);" }))
        div_comment.appendChild(createElement("h4", comment[i].comment, { class: "post-comments-content", }));
    }
    return div_comment;
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


