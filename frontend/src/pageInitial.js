
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
    // tag : header->ul
    let newUl = document.createElement("ul");
    newUl.className = 'nav';
    // tag : ul->li

    // tag : li -> input
    let inputTag = document.createElement("input");
    inputTag.id = "search";
    inputTag.setAttribute("data-id-search","");
    inputTag.placeholder = "Search Seddit";
    inputTag.type = "search";

    // tag : li -> button
    let buttonTag = document.createElement("button");
    buttonTag.setAttribute("data-id-login", "");
    buttonTag.className = "button button-primary";
    buttonTag.innerText = "Log In";
    buttonTag.id = "bt1";
    buttonTag.setAttribute("onclick" , "document.getElementById('id01').style.display='block'")
    buttonTag.style ="cursor:pointer";

    // tag : li -> button2
    let buttonTag2 = document.createElement("button");
    buttonTag2.setAttribute("data-id-signup", "");
    buttonTag2.className = "button button-secondary"
    buttonTag2.innerText = "Sign Up";
    buttonTag2.id = "bt2";
    buttonTag2.style = "cursor:pointer";

    // loop for generate <header>
    var but_and_input = [inputTag, buttonTag, buttonTag2]
    for (let i = 0; i < 3; ++i) {
        let newLi = document.createElement("li");
        newLi.className = 'nav-item';
        newLi.appendChild(but_and_input[i]);
        newUl.append(newLi);
    }
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
    input1.id = "username";
    input1.type="text";
    input1.placeholder ="Enter Username";
    input1.name="uname";
    // input1.setAttribute("required","required");

    let input2 = document.createElement("input");
    input2.id = "password";
    input2.type = "password";
    input2.placeholder = "Enter Password";
    input2.name = "psw";
    // input2.setAttribute("required", "required");

    
    let submit = document.createElement("button");
    submit.id="submit";
    submit.className ="submtn";
    submit.type="submit";
    submit.value="Submit";
    submit.innerText = "Submit";

    let close = document.createElement("button");
    // close.setAttribute("onclick","document.getElementById('login-01').style.display='none'")
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
        let input3 = document.createElement("input");
        input3.id = "password";
        input3.type = "password";
        input3.name = "psw";
        input3.placeholder = "Renter the password";
        form.appendChild(input3);
    }
    form.appendChild(br);
    form.appendChild(submit);
    form.appendChild(close);
    var lis = document.getElementById("root");
    console.log(lis.childNodes[lis.childNodes.length-1]);
    lis.insertBefore(form, lis.childNodes[lis.childNodes.length - 1]);

}



// export function openNew() {
//     //获取页面的高度和宽度
//     console.log("asdas");
//     var sWidth = document.body.scrollWidth;
//     var sHeight = document.body.scrollHeight;
//     //获取页面的可视区域高度和宽度
//     var wHeight = document.documentElement.clientHeight;
//     var oMask = document.createElement("div");
//     oMask.id = "mask";
//     oMask.style.height = sHeight + "px";
//     oMask.style.width = sWidth + "px";
//     document.body.appendChild(oMask);
//     alert("ppp");
//     var oLogin = document.getElementById("id01");
//     // oLogin.id = "login";
//     // oLogin.innertxt= "close";
//     // oLogin.innertxt = "<div class='loginCon'><div id='close'>close</div></div>";
//     // document.body.appendChild(oLogin);

//     //获取登陆框的宽和高
//     var dHeight = oLogin.offsetHeight;
//     var dWidth = oLogin.offsetWidth;
//     //设置登陆框的left和top
//     oLogin.style.left = sWidth / 2 - dWidth / 2 + "px";
//     oLogin.style.top = wHeight / 2 - dHeight / 2 + "px";
//     //点击关闭按钮
//     // var oClose = document.getElementById("close");

//     // //点击登陆框以外的区域也可以关闭登陆框
//     // oClose.onclick = oMask.onclick = function () {
//     //     document.body.removeChild(oLogin);
//     //     document.body.removeChild(oMask);
//     // };
// };