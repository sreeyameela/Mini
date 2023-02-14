async function samp() {
    var e = document.getElementById('email').value;
    var r = document.getElementById('roll').value.toLowerCase();
    console.log(r);
    var reg = new RegExp(/\d\db81a05\d\d|\d\db81a05[a-w]\d/);
    var m = document.getElementById('msg').value;
    if(e=="" || r=="" || m=="")
    {
        document.querySelector('.error').style.display='block';
        setTimeout(function(){
            document.querySelector('.error').style.display='none';
        }, 2000)
        return;
    }
    if(!reg.test(r)){
        document.querySelector('.error1').style.display='block';
        setTimeout(function(){
            document.querySelector('.error1').style.display='none';
        }, 2000)
        return;
    }
    else{
        var url = `http://localhost:8081/msg?email=${e}&roll=${r}&msg=${m}`;
        var res = await fetch(url);
        var ans = await res.json();
        if(ans.sent){
            document.querySelector('.error2').style.display='block';
            setTimeout(function(){
                document.querySelector('.error2').style.display='none';
            }, 2000)
            return;
        }
        else{
            document.querySelector('.error3').style.display='block';
            setTimeout(function(){
                document.querySelector('.error3').style.display='none';
            }, 2000)
            return;
        }
    }
    
}


async function signup() {
    var n = document.getElementById('name').value;
    var e = document.getElementById('email').value;
    var p = document.getElementById('pass').value;
    var ps=document.getElementById('psw').value;
    if(n=="" || e=="" || p=="" || ps=="")
    {
        document.querySelector('.error').style.display='block';
        setTimeout(function(){
            document.querySelector('.error').style.display='none';
        }, 2000)
        return;
    }
    else{
        if(ps!=p){
            document.querySelector('.error1').style.display='block';
            setTimeout(function(){
                document.querySelector('.error1').style.display='none';
            }, 2000)
            return;
        }
        
        var url = `http://localhost:8081/signup?name=${n}&email=${e}&pass=${p}`;
        var res = await fetch(url);
        var ans = await res.json();
        if(ans["sent"]==true)
        {
            // alert('Signed up successfully');
            // sessionStorage.setItem("email",e);
            document.querySelector('.modal-fade').style.display='block';
            setTimeout(function(){
                document.querySelector('.modal-fade').style.display='none';
            }, 3000)
            setTimeout(function(){
                location.replace('http://localhost:8081/facultylogin.html');
            },2000)
        }
        //db.collection("users").findOne({"email":e}) =='exists'
        else if(ans["sent"] =='exists'){
            
            document.querySelector('.error2').style.display='block';
            setTimeout(function(){
                document.querySelector('.error2').style.display='none';
            }, 2000)
        return ;
        }
    }
    
}

async function log(){
    var e = document.getElementById('email').value;
    var p = document.getElementById('pass').value;
    if(e=="" & p==""){
        document.querySelector('.error').style.display='block';
        setTimeout(function(){
            document.querySelector('.error').style.display='none';
        }, 2000)
        return;
    }
    if(e==""){
        document.querySelector('.error1').style.display='block';
        setTimeout(function(){
            document.querySelector('.error1').style.display='none';
        }, 2000)
        return;
    }
    if(p==""){
        document.querySelector('.error2').style.display='block';
        setTimeout(function(){
            document.querySelector('.error2').style.display='none';
        }, 2000)
        return;
    }
    else{
        var url = `http://localhost:8081/login?email=${e}&pass=${p}`;
        var res = await fetch(url);
        var ans = await res.json();
        if(ans.sent==true){
            localStorage.setItem("email",e);
            location.href = 'http://localhost:8081/queryinfo.html';

        }
        else if(ans.sent==false){
            document.querySelector('.error4').style.display='block';
            setTimeout(function(){
                document.querySelector('.error4').style.display='none';
            }, 2000)
        }
        else{
            document.querySelector('.error5').style.display='block';
            setTimeout(function(){
                document.querySelector('.error5').style.display='none';
            }, 2000)
        }
    }
    
    
}


async function adlog(){
    var e = document.getElementById('email').value;
    var p = document.getElementById('pass').value;
    if(e=="" & p==""){
        document.querySelector('.error').style.display='block';
        setTimeout(function(){
            document.querySelector('.error').style.display='none';
        }, 2000)
        return;
    }
    if(e==""){
        document.querySelector('.error1').style.display='block';
        setTimeout(function(){
            document.querySelector('.error1').style.display='none';
        }, 2000)
        return;
    }
    if(p==""){
        document.querySelector('.error2').style.display='block';
        setTimeout(function(){
            document.querySelector('.error2').style.display='none';
        }, 2000)
        return;
    }
    else{
        var url = `http://localhost:8081/adlogin?email=${e}&pass=${p}`;
        var res = await fetch(url);
        var ans = await res.json();
        if(ans.sent==true){
           
        
            localStorage.setItem("email",e);
            location.href = 'http://localhost:8081/quicklinks.html';
           

        }
        else if(ans.sent==false){
            document.querySelector('.error4').style.display='block';
            setTimeout(function(){
                document.querySelector('.error4').style.display='none';
            }, 2000)
        }
            
        else{
            document.querySelector('.error5').style.display='block';
            setTimeout(function(){
                document.querySelector('.error5').style.display='none';
            }, 2000)
        }
            
    }
    
    
}   

function view(){
    var email = localStorage.getItem('email');
        if(email!=undefined){
            document.getElementById("gmail").innerHTML=email;
        }
}

async function view1() {
    var email = localStorage.getItem('email');
    if(email!=undefined){
        document.getElementById("gmail").innerHTML=email;
    }
    var url = `http://localhost:8081/view?email=${email}`;
    var result = await fetch(url);
    var jsonN = await result.json();
    if(jsonN==null){
        document.getElementById("no").innerHTML = "No new Queries";
        return;
    }
    else if(jsonN.arr.length==0){
        document.getElementById("no").innerHTML = "No new Queries";
        return;
    }
    var list = jsonN.arr;
    var cols = [];  
    if(list!=null){
        for (var i = 0; i < list.length; i++)   
        {
            for (var k in list[i])
            {
                if (cols.indexOf(k) === -1)
                {
                    cols.push(k);
                }
            }
        }

        var table = document.createElement("table");
        var tr = table.insertRow(-1);
        
        // for (var i = 0; i < cols.length; i++)
        // {
        //     var theader = document.createElement("th");
        //     theader.innerHTML = cols[i];
        //     tr.appendChild(theader);
        // }
        var theader = document.createElement("th");
        theader.innerHTML="Roll Number";
        theader.style.textAlign="center";
        tr.appendChild(theader);
        var theader2 =  document.createElement("th");
        theader2.innerHTML = "Queries"
        theader2.style.textAlign="center";
        tr.appendChild(theader2);
        var theader3 =  document.createElement("th");
        theader3.innerHTML = "Actions"
        theader3.style.textAlign="center";
        theader3.colSpan=2
        tr.appendChild(theader3);
        for (var i = 0; i < list.length; i++) 
        {
            trow = table.insertRow(-1);
            
            for (var j = 0; j < cols.length; j++)
            {
                var cell = trow.insertCell(-1);
                cell.classList.add(i);
                cell.innerHTML = list[i][cols[j]];
                if(j==cols.length-1){
                    trow.insertCell(-1).innerHTML = `<i class="fa fa-trash" aria-hidden="true" id="${i}" onclick="rem(${i})"></i>`;
                    trow.insertCell(-1).innerHTML = `
                    <style>
                        
                        .openBtn {
                            display: flex;
                            justify-content: left;
                        }
                        .openButton {
                            border: none;
                            border-radius: 5px;
                            background-color: #1c87c9;
                            color: white;
                            padding: 14px 20px;
                            cursor: pointer;
                            position: fixed;
                        }
                        .loginPopup {
                            position: relative;
                            text-align: center;
                            width: 100%;
                        }
                        .formPopup {
                            display: none;
                            position: fixed;
                            left: 45%;
                            top: 5%;
                            transform: translate(-50%, 5%);
                            border: 0px solid #999999;
                            z-index: 9;
                            padding-top:150px;
                        }
                        .formContainer {
                            max-width: 300px;
                            padding: 20px;
                            background-color: #fff;
                            border: 5px solid #999999;
                        }
                        .formContainer .btn {
                            padding: 12px 20px;
                            border: none;
                            background-color: #8ebf42;
                            color: #fff;
                            cursor: pointer;
                            width: 100%;
                            margin-bottom: 15px;
                            opacity: 0.8;
                        }
                        .formContainer .cancel {
                            background-color: #cc0000;
                        }
                        .formContainer .btn:hover,
                        .openButton:hover {
                            opacity: 1;
                        }
                        .formPopup form textarea{
                            background: #f8f9fa;
                            border: 2px solid rgba(216, 216, 216, 0.3);
                            color: #777;
                            font-size: 16px;
                            padding: 12px 15px;
                            width: 100%;
                            border-radius: 4px;
                            height: 55px;
                            resize: none;
                            min-height: 140px;
                        }
                        .formPopup form textarea:focus{
                            outline: none;
                            border: 2px solid #051b35;
                            background: #fff;
                            box-shadow: none;
                        }
                        </style>
                <body>
                    <div class="openBtn">
                    <i class="fas fa-reply" class="openButton" onclick="openForm(${i})" style="font-size:20px"></i> 
                        </div>
                        <div class="loginPopup" >
                        <div class="formPopup" id="popupForm${i}" >
                            <form name="formc" class="formContainer" action= "javascript:sendmail(${i})" method="post">
                            <div style="padding-left:250px;" >
                            <i class="fas fa-times"  onclick="closeForm(${i})"></i>
                            </div>
                            <label for="reply" style="text-align:left">
                                <strong>Reply</strong>
                            </label>
                            <textarea name="Reply" class="form-control" id="Reply${i}" placeholder="Reply" required=""></textarea><br>
                            <button type="submit" class="btn"  style="font-size:medium">Send</button>
                            <button type="reset" class="btn" style="font-size:medium">Reset</button>
                            </form>
                        </div>
                        </div>
                        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
                        
                       
                        </body>
                    `
                }
            }
        }
                    
        var el = document.getElementById("table");
        el.innerHTML = "";
        el.appendChild(table);
    }
    else{   
        document.getElementById("no").innerHTML = "No new Queries"
    }
    
}
function sendmail(id) {
    console.log(id);
    
    let elements = document.getElementsByClassName(id);
    let email = elements[0].innerHTML+'@cvr.ac.in';
    let reply = elements[1].innerHTML;
    let Email = { send: function (a) {
        return new Promise(function (n, e) {
             a.nocache = Math.floor(1e6 * Math.random() + 1), 
             a.Action = "Send"; var t = JSON.stringify(a); 
             Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    var message = $('#Reply'+id).val();
    var Body = message;
    console.log( message);
    console.log(email);
    console.log(reply);
    
    Email.send({
        SecureToken: "d02b7485-c6a6-4d76-bc13-dcfb15279fb6",
        To: email,
        From: localStorage.getItem("email"),
        Subject: "Re: "+reply ,
        Body: Body,
    }).then(
        message => {
            console.log (message);
            if (message == 'OK') {
                alert('Your mail has been send.');
            } else {
                console.error(message);
                alert('There is error at sending message. ')

            }

        }
    );
    closeForm(id);
    

}
function openForm(id) {
    document.getElementById("popupForm"+id).style.display = "block";
  }
  function closeForm(id) {
    document.getElementById("popupForm"+id).style.display = "none";
  }

 async function rem(id){
    console.log(id);
    var email = localStorage.getItem("email");
    var url = `http://localhost:8081/removeQuery?email=${email}&id=${id}`;
    var result = await fetch(url);
    var response = await result.json();

    if(response.delete)
    {
        window.location.reload();
    }
    else{
        alert("An unexepected error has occured");
    }
}
function deleteItem() {
    localStorage.removeItem("email");
    window.location.href="index.html";
  }
  


async function retr() {
    var res = await fetch('http://localhost:8081/faljson');
    var customers = await res.json();
    console.log(customers);
    var email = $("#email");
    $(customers).each(function () {
        var option = $("<option />");
        option.html(this.name+" "+this.email);
        option.val(this.email);
        email.append(option);
    });
}   
   
async function link() {
    var f = document.getElementById('pdf').value;
    if(f==""){
        document.querySelector('.error1').style.display='block';
        setTimeout(function(){
            document.querySelector('.error1').style.display='none';
        }, 2000)
        return;
        
    }
    else{
        var url = `http://localhost:8081/quicklinks.html/quick?pdf=${f}`;   
        var res = await fetch(url);
        var ans = await res.json();
        var a =document.getElementById('pdf').value = '';
        document.querySelector('.error2').style.display='block';
        setTimeout(function(){
            document.querySelector('.error2').style.display='none';
        }, 2000)
        return;
    }
    
}

async function fdp() {
    var fd = document.getElementById('fdp').value;
    if(fd==""){
        document.querySelector('.error4').style.display='block';
        setTimeout(function(){
            document.querySelector('.error4').style.display='none';
        }, 2000)
        return;
        
    }
    else{
        var url = `http://localhost:8081/quicklinks.html/fdp?fdp=${fd}`;   
        var res = await fetch(url);
        var ans = await res.json();
        var a1 =document.getElementById('fdp').value = '';
        document.querySelector('.error5').style.display='block';
        setTimeout(function(){
            document.querySelector('.error5').style.display='none';
        }, 2000)
        return;
    }
    
}

async function semi() {
    var semi = document.getElementById('semi').value;
    if(semi==""){
        document.querySelector('.error6').style.display='block';
        setTimeout(function(){
            document.querySelector('.error6').style.display='none';
        }, 2000)
        return;
        
    }
    else{
        var url = `http://localhost:8081/quicklinks.html/semi?semi=${semi}`;   
        var res = await fetch(url);
        var ans = await res.json();
        var a1 =document.getElementById('semi').value = '';
        document.querySelector('.error7').style.display='block';
        setTimeout(function(){
            document.querySelector('.error7').style.display='none';
        }, 2000)
        return;
    }
    
}
async function worksh() {
    var works = document.getElementById('worksh').value;
    if(works==""){
        document.querySelector('.error8').style.display='block';
        setTimeout(function(){
            document.querySelector('.error8').style.display='none';
        }, 2000)
        return;
        
    }
    else{
        var url = `http://localhost:8081/quicklinks.html/worksh?worksh=${works}`;   
        var res = await fetch(url);
        var ans = await res.json();
        var a1 =document.getElementById('worksh').value = '';
        document.querySelector('.error9').style.display='block';
        setTimeout(function(){
            document.querySelector('.error9').style.display='none';
        }, 2000)
        return;
    }
    
}
