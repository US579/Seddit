
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
    let buttonTag3 = createElement("button", "Post", { class: "button button-secondary", id: "bt3", style:"cursor:pointer"})

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

// initial all the buttons 
function buttonInit(){
    let newUl = document.createElement("ul");
    newUl.className = 'nav';
    let search_input = createElement("input", "Search Seddit", { "data-id-search": "", placeholder: "Search Seddit", type: "search", id: "search_input", display:"inline"});
    let login_button = createElement("button", "Log In", { "data-id-login": "", style: "cursor:pointer", id: "login_button", class: "button button-primary", display:"inline" });
    let signup_button = createElement("button", "Sign Up", { "data-id-signup": "", style: "cursor:pointer", id: "signup_button", class: "button button-primary", display:"inline" });
    let search = createElement("button", "search", { "data-id-search": "", style: "cursor:pointer;display:none", id: "search", class: "button button-primary", });
    let settings = createElement("button", "Setting", { "data-id-settings": "", style: "cursor:pointer;display:none", id: "setting", class: "button button-primary", });
    let my_profile = createElement("button", "My profile", { "data-id-myprofile": "", style: "cursor:pointer;display:none", id: "my_profile", class: "button button-primary", });
    let Home = createElement("button", "Home", { "data-id-home": "", style: "cursor:pointer;display:none", id: "Home", class: "button button-primary", display: "inline" });
    let logout_button = createElement("button", "Log out", { "data-id-logout": "", style: "cursor:pointer;display:none", id: "logout_button", class: "logout-button-class" });
    // loop for generate <header>
    var but_and_input = [search_input, login_button, signup_button, search,settings, my_profile, Home, logout_button]
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


// the function to create the html
export function createElement(tag, data, options = {}) {
    const ele = document.createElement(tag);
    ele.textContent = data;
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, ele);
}


