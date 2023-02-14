let quick = document.getElementById("quick1");
var url = 'http://localhost:8081/latest';
var res = fetch(url);
res.then((response)=>{
    var data = response.json();
    data.then((finalData)=>{
        console.log(finalData)
        quick.innerHTML = finalData.pdf;
    })
})


let fdp1 = document.getElementById("fdp");
var url = 'http://localhost:8081/latestfdp';
var res = fetch(url);
res.then((response)=>{
    var data = response.json();
    data.then((finalData)=>{
        console.log(finalData)
        fdp1.innerHTML = finalData.fdp;
    })
})

let semi1 = document.getElementById("semi");
var url = 'http://localhost:8081/latestsemi';
var res = fetch(url);
res.then((response)=>{
    var data = response.json();
    data.then((finalData)=>{
        console.log(finalData)
        semi1.innerHTML = finalData.semi;
    })
})


let worksh1 = document.getElementById("worksh");
var url = 'http://localhost:8081/latestworksh';
var res = fetch(url);
res.then((response)=>{
    var data = response.json();
    data.then((finalData)=>{
        console.log(finalData)
        worksh1.innerHTML = finalData.worksh;
    })
})
