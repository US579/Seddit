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
  myModule.addCloseListener(1, "close1", "login-01");
  myModule.addCloseListener(1, "close2", "signup-01");
  myModule.addCloseListener(2, "", "");
  myModule.addCloseListener(3, "", "");

  onBut3.addEventListener("click", (event) => {
    // init.addPost("us579", "us579as");
    alert("you have not loged in")
  })

  // frontfeed show 
  anonyFeed();
  // myModule.searchHighlight();


  // login 
  const login = document.getElementById("login_submit");
  login.addEventListener("click", (event) => {
    alert("sad")
    myModule.loginToBack()
    window.localStorage.setItem("location", "feed")
    myModule.infinteScroll();
    // document.getElementById("my_profile").click();
    alert("ppppp")
    document.getElementById("search").οnclick = function () {
      // 获取关键词
      alert("search")
      var pattern = document.getElementById("search_input").value;
      //定义正则表达式
      var re = new RegExp(pattern, "g");
      //获取操作文本对象
      var searching = document.getElementById("incoming").value;
      //给文本中的关键词添加样式
      var resulting = searching.replace(re, "<span class='highLight'>$&</span>");
      //将结果输出
      document.getElementById("searchResult").innerHTML = resulting;
    }
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
  get_post.addEventListener("click", (event) => {
    addListener();
    window.localStorage.setItem("location", "profile");
  })
  //  display user's feed
  const get_feed = document.getElementById("Home");
  get_feed.addEventListener("click", (event) => {
    myModule.getUserFeed(myModule.checkLocalStore("token"));
    window.localStorage.setItem("location", "feed");
    myModule.infinteScroll();
  })


  // // post new contents
  async function addListener() {
    // alert("dasdasdasd")
    await myModule.getUserPost(myModule.checkLocalStore("token"));
    // let post_button = document.getElementById("post-Bnt")
    // console.log(post_button);
    myModule.newPost();

    //display setting to change profile
    document.getElementById("setting").style.display = "inline";

    //--------------for modal of post button-----------------
    let modal = document.getElementById("Post-to-db");
    let btn = document.getElementById("post-Bnt-1");
    btn.onclick = function () {
      modal.style.display = "block";
    }

    //---------------------------------------------------

    //--------------for modal of chang profile button-----------------
    let modal2 = document.getElementById("profile-change-div");
    let btn2 = document.getElementById("setting");
    btn2.onclick = function () {
      modal2.style.display = "block";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      } else if (event.target == modal2) {
        modal2.style.display = "none";
      }
    }
    let profile_change_Bnt = document.getElementById("profile-change-Bnt");
    profile_change_Bnt.addEventListener("click", (event) => {
      myModule.updateProfile();
      document.getElementById("my_profile").click();
    })
    //-----------------------------------------------------
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
      document.getElementById("search").style.display = "none";
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
  function anonyFeed() {
    let url = "http://127.0.0.1:5000/post/public"
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const res2 = myModule.sortArray(res);
        let feed = document.getElementById("feed");
        for (let key in res2) {
          feed.appendChild(myModule.createPageFeed(res.posts[res2[key]], 0));
        }
      })
      .catch(
        //if backend is not launched use feed.json 
      fetch("../data/feed.json")
      .then(res => res.json())
      .then(res => {
        const res2 = myModule.sortArray(res);
        let feed = document.getElementById("feed");
        for (let key in res2) {
          feed.appendChild(myModule.createPageFeed(res.posts[res2[key]], 0));
        }
      })
      )
  }

}


export default initApp;