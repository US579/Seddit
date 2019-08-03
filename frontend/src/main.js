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
const login = document.getElementById("login_button");
login.addEventListener("click",(event)=>{
  myModule.loginToBack();
})

  
// signup
const signup = document.getElementById("signup_button");
signup.addEventListener("click", (event) => {
    myModule.signupToBack();
  })


// frontfeed show 
anonyFeed();




// Logout button listener
  // logout listener if user not login alret() if login in clean the cache
  const logout = document.getElementById('logout_button');
  logout.onclick = function () {
    if (myModule.checkLocalStore('username')) {
      //display feed
      document.getElementById("feed").style = "block";
      //hide login and signup
      document.getElementById("login_button").style.display = "block";
      document.getElementById("login_button").style.display = "inline";
      document.getElementById("signup_button").style.display = "block";
      document.getElementById("signup_button").style.display = "inline";

      //display home myProfile logout  button
      document.getElementById("Home").style.display = "none";
      document.getElementById("my_profile").style.display = "none";
      document.getElementById("logout_button").style.display = "none";
      window.localStorage.clear();
      alert("successfully logout");
      location.reload();
    } else {
      alert("you are not login");
    }
  }


  // --------------- generate feed -------------------------
  // not login feed show start feed 
  function anonyFeed(){
  fetch("../data/feed.json")
    .then(res => res.json())
    .then(res => {
      const res2 = myModule.sortArray(res);
      let feed = document.getElementById("feed");
      for (let key in res2){
        let content = myModule.createPageFeed_init(res.posts[res2[key]]);
        feed.appendChild(content);
          }
      })
    }
  // -------------------------------------------------


// let login_submit = document.getElementById("login_submit")



getUserProfile(myModule.checkLocalStore("token"))
function getUserProfile(token) {
  var profile_url = "http://127.0.0.1:5003/user/?id=3"
      fetch(profile_url, {
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
          console.log(res)
          console.log(res.following)
          console.log(res.following.length)
          console.log(res.followed_num)
          console.log(res.posts.length)
          let profile = profileGenerator(res);
          feed.innerHTML=""
          feed.appendChild(profile)
          for (let i = 0 ; i < res.following.length ; ++i){
            // console.log(res.following[i])
            fetchUserPost(res.following[i]);
          }
        })
    }



  function profileGenerator(res){
      let profile = myModule.createElement("div", null, { id: "profile-" + res.id, class: "profile" })
          profile.appendChild(myModule.createElement("div", res.name, { class: "profile-name" }))
          profile.appendChild(myModule.createElement("b", "Following: " + res.following.length, {class:"profile-following"}))
          profile.appendChild(myModule.createElement("b", "Followed: " + res.followed_num, {class: "profile-followed"}))
          profile.appendChild(myModule.createElement("b", "Posts: " + res.posts.length, {class: "profile-posts"}))
        return profile;

  }


  function fetchUserPost(id) {
    const feed_url = "http://127.0.0.1:5003/post/?id="+id;
    fetch(feed_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + myModule.checkLocalStore('token')
      }
    })
      .then(res => res.json())
      .then(function (res) {
        // console.log(res);
        if (res.length == 0) {
          console.log(myModule.checkLocalStore('token'))
          alert("user has not posted anything yet");
          return false;
        } else {
          let content = myModule.createPageFeed_init(res);
          feed.appendChild(content);
        }
      })
  }












function getUserFeed(id){
  const feed_url = "http://127.0.0.1:5003/user/feed";
  fetch(feed_url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       'Authorization': 'Token ' + myModule.checkLocalStore('token')
    }
    })
    .then(res => res.json())
    .then(function (res){
      console.log(res.posts);
      if (res.posts.length == 0){
        console.log( myModule.checkLocalStore('token'))
        alert("user has not posted anything yet");
        return false;
      }else{
        for (let i = 0 ;i < res.posts.length; ++i){
          let content = myModule.createPageFeed_init(res.posts[i]);
          feed.appendChild(content);
        }
      }
    })
}


























// function sub_getUserFeed(){

// }



  // export function loginToBack() {
  //   var signup_url = "http://127.0.0.1:5003/auth/login"
  //   var submit = document.getElementById("login_submit");
  //   submit.onclick = function () {
  //     var username = document.getElementById('login-username').value;
  //     var password = document.getElementById('login-password').value;
  //     if ((!username) || (!password)) {
  //       alert('username and password can not be empty');
  //       return false;
  //     }
  //     const user = {
  //       "username": username,
  //       "password": password
  //     };
  //     fetch(signup_url, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(user),
  //     })
  //       .then(res => res.json())
  //       .then(function (res) {
  //         // console.log(res)
  //         if (res["token"]) {
  //           window.alert('You are successfully logged in');
  //           window.localStorage.setItem('username', username);
  //           window.localStorage.setItem('token', res['token']);
  //           location.reload();
  //         }
  //         if (res.message === 'Invalid Username/Password') {
  //           alert("user and password is not correct")
  //           return false;
  //         }
  //       })
  //   }
  // }










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