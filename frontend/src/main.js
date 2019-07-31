/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
// import addElement from './helper.js'
import * as init from './pageInitial.js';
import * as myModule from './helper.js';
// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  // initial page
  init.addElement();
  // var onBut1 = document.getElementById("bt1");
  // var onBut2 = document.getElementById("bt2");
  var onBut3 = document.getElementById("bt3");
  // var close1 = document.getElementById("login-01");


  myModule.addCloseListener(1,"close1","login-01");
  myModule.addCloseListener(1,"close2","signup-01");
  myModule.addCloseListener(2, "", "");
  myModule.addCloseListener(3, "", "");

  // close1.onclick = () => {
  //   console.log('clicked');
  //   document.getElementById("login-01").style.display = "none";
  //   myModule.pgswitch(2);
  // };


  // login 
  // const dc = document.getElementById('login-01');
  // const dc1 = document.getElementById('signup-01');
  // onBut1.onclick = () => {
  //   if (dc1.style.display == "none") {
  //   document.getElementById("login-01").style.display="block";
  //   myModule.pgswitch(1);
  //   };
  // };

  
  // onBut2.onclick = () => {
  //   if (dc.style.display == "none") {
  //   document.getElementById("signup-01").style.display = "block";
  //   myModule.pgswitch(1);
  //   }
  // };
  onBut3.addEventListener("click",(event)=>{
    init.addPost("us579", "us579as");
  })
  var submit = document.getElementById("submit");
  submit.onclick = function () {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    if ((!username) || (!password)) {
      alert('username and password can not be empty')
    }
  }

  

}
export default initApp;