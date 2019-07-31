
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
        console.log(id1, " ", id2);
        var close1 = document.getElementById(id1);
        close1.onclick = () => {
            document.getElementById(id2).style.display = "none";
            pgswitch();
        };
    }


    if (func === 2){
        var onBut1 = document.getElementById("bt1");
        const dc1 = document.getElementById('signup-01');
        onBut1.onclick = () => {
            if (dc1.style.display == "none") {
                document.getElementById("login-01").style.display = "block";
                pgswitch(1);
            };
        };
    }
    if (func === 3) {
        var onBut2 = document.getElementById("bt2");
        const dc = document.getElementById('login-01');
        onBut2.onclick = () => {
            if (dc.style.display == "none") {
                alert("asdas");
                document.getElementById("signup-01").style.display = "block";
                pgswitch(1); 
            }
        };
    }
}

export function pgswitch(option = 0) {
    if (option == 1) {
        document.getElementById('feed').style.display = 'none';
        // let collection = document.getElementsByClassName("post");
        // console.log(collection);
        // if (collection.length>0){
        // document.getElementsByClassName("post").style.display = 'none';
        // }
        // document.getElementById('root').innerText = 'Please log in or register, here are some example images:';
    }
    else {
        document.getElementById('feed').style.display = 'block';
        let collection1 = document.getElementsByClassName("post");
        // if (collection1.length > 0) {
        //     document.getElementsByClassName("post").style.display = 'block';
        // }
    }
}

function tologin() {
    const login_2 = document.getElementById('login_button_2');
    login_2.onclick = function () {
        const username = document.getElementById('luname').value;
        const password = document.getElementById('lpass').value;

        if (!username || !password) {
            window.alert('Empty username or password!');
            return false;
        }
        const user = {
            "username": username,
            "password": password
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const method = 'POST';
        const path = 'auth/login';

        api.makeAPIRequest(path, {
            method, headers,
            body: JSON.stringify(user),
        })
            .then(function (res) {
                if (res["token"]) {
                    window.alert('You are successfully logged in');
                    window.localStorage.setItem('username', username);
                    window.localStorage.setItem('token', res['token']);
                    location.reload();
                }
                else {
                    window.alert(res["message"]);
                }
            });
    }
}
