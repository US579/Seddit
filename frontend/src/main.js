/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
import * as init from './pageInitial.js';
import * as myModule from './helper.js';

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  // initial page
  init.addElement();
  var onBut3 = document.getElementById("bt3");

  // add event listener
  myModule.addCloseListener(1,"close1","login-01");
  myModule.addCloseListener(1,"close2","signup-01");
  myModule.addCloseListener(2, "", "");
  myModule.addCloseListener(3, "", "");

  onBut3.addEventListener("click",(event)=>{
    init.addPost("us579", "us579as");
  })



// login 
loginToBack();

// signup
signupToBack() 





function loginToBack(){
  var signup_url = "http://127.0.0.1:5003/auth/login"
  var submit = document.getElementById("login_submit");
  submit.onclick = function () {
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
      .then(function (data) {
        if (data.status === 200) {
          alert("regis")
        }
        console.log(JSON.stringify(data));
        console.log(data.status)
        console.log('Request succeeded with JSON response', data);
      })
      .then(function (res) {
        if (res["token"]) {
          window.alert('You are successfully logged in');
          window.localStorage.setItem('username', username);
          window.localStorage.setItem('token', res['token']);
          location.reload();
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }
}


function signupToBack() {
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
      "email" : email,
      "name" : name
    };
    fetch(signup_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user),
    })
      .then(function (data) {
        if (data.status === 200){
          alert("login")
        }
        if (data.status === 409){
          alert("User already exists!")
          return false;
        }
        console.log(JSON.stringify(data));
        console.log(data.status)
        console.log('Request succeeded with JSON response', data);
      })
      .then(function (res) {
        if (res["token"]) {
          window.alert('You are successfully logged in');
          window.localStorage.setItem('username', username);
          window.localStorage.setItem('token', res['token']);
          location.reload();
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }
}








  // --------------- generate feed -------------------------
  console.log("hello")
  fetch("../data/feed.json")
    .then(res => res.json())
    .then(res => {
      console.log(res.posts.length);
      
      let feed = document.getElementById("feed");
      for (let i = 0; i < res.posts.length;++i){
        let content = init.createFeed(res.posts[i]);
        feed.appendChild(content);
          }
      })
  // -------------------------------------------------


  // console.log("hello")
  // fetch("../data/feed.json")
  //   .then(res => res.json())
  //   .then(res => {
  //     let feed = document.getElementById("feed");
  //       console.log(res.posts[3].text);
  //       let content = init.createFeed(res.posts[3]);
  //       feed.appendChild(content);
  //     }
  //   );
  // alert('asd');
  // let a = init.createFeed("103")
  // let page = document.getElementById("feed");
  // alert(page);
  // page.appendChild(a);





  // //--------------- templete -------------------------
  // console.log("hello")
  // fetch("../data/feed.json")
  //   .then(res => res.json())
  //   .then(res => {
  //     let data = res.posts[3].image;
  //     console.log(res.posts[3].image)
  //     let imgs = document.createElement("img");
  //     imgs.setAttribute("src", "data:image/png;base64, " + data);
  //     let feed = document.getElementById("feed");
  //     feed.appendChild(imgs);
  //   }
  // );
  // //-------------------------------------------------













}


export default initApp;