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
    // init.addPost("us579", "us579as");
    alert("you have not loged in")
  })

  // frontfeed show 
  anonyFeed();


// login 
const login = document.getElementById("login_submit");
login.addEventListener("click",(event)=>{
  myModule.loginToBack()
  }
)

// myModule.upvote_list("3");

// signup
const signup = document.getElementById("signup_button");
signup.addEventListener("click", (event) => {
    myModule.signupToBack();
})
//  display user's post
const get_post = document.getElementById("my_profile");
  get_post.addEventListener("click",(event)=>{
  addListener();
  window.localStorage.setItem("location", "profile");
})
//  display user's feed
const get_feed= document.getElementById("Home");
  get_feed.addEventListener("click", (event) => {
  myModule.getUserFeed(myModule.checkLocalStore("token"));
  window.localStorage.setItem("location","feed");
  myModule.infinteScroll();
})

async function showFeed(){
  await myModule.getUserFeed(myModule.checkLocalStore("token"));
  // implemete scrool
  document.addEventListener("scroll",()=>{
    const feedLast = document.getElementById("feed").lastChild;
})
  



}

// // post new contents


async function addListener() {
    // alert("dasdasdasd")
    await myModule.getUserPost(myModule.checkLocalStore("token"));
    // let post_button = document.getElementById("post-Bnt")
    // console.log(post_button);
    myModule.newPost();
    
    //--------------for modal of post button-----------------
    let modal = document.getElementById("Post-to-db");
    let btn = document.getElementById("post-Bnt-1");
    btn.onclick = function () {
      modal.style.display = "block";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    //--------------for modal of post button-----------------
  }


// test for thumbs up
// myModule.thumbsup(3);


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
        feed.appendChild(myModule.createPageFeed(res.posts[res2[key]],0));
        }
      })
    }
  // -------------------------------------------------







}


export default initApp;