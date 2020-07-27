let prev = document.getElementById("previous-value");
let cur = document.getElementById("current-value");
let ON = false;
let pDot = false;
let cDot = false;
let pValue;
let pOperator;
let inf = false;
// console.log(cur.innerHTML.substr(0,cur.innerHTML.length-1));
// console.log(cur.innerHTML.substr(-4,1));//8
// console.log(cur.innerHTML.substr(-4,2));//48
// console.log(cur.innerHTML.substr(-4,3));//448
// console.log(cur.innerHTML.substr(-4,4));//2448
function getPrevious(){//float value dibe...
    return prev.innerHTML.replace(/[.](?=.*?\.)/g, '').replace(/[^0-9.]/g, "");
}
function getCurrent(){//float value dibe...
    return cur.innerHTML.replace(/[.](?=.*?\.)/g, '').replace(/[^0-9.]/g, "");
}
// console.log(getCurrent());
function putPrevious(opp){//Ekhne call hobe just operator e click hole...
    if(opp=='.'){return;}//eta na dileo hobe inshallah
    if(cur.innerHTML!=="" && opp!='percentage'){
        prev.innerHTML += Number(getCurrent()).toLocaleString('en-IN');
    }
    if((prev.innerHTML == "" && opp=='percentage') || (prev.innerHTML != "" && cur.innerHTML !="" && opp=='percentage')){
        // console.log("check1");
        prev.innerHTML = Number(getCurrent()).toLocaleString('en-IN')+"%";
        cur.innerHTML = (Number(getCurrent())*0.01).toLocaleString('en-IN');
        return;
    }
    if(cur.innerHTML == "" && opp=='percentage'){
        // console.log("check2");
        prev.innerHTML = Number(getPrevious()).toLocaleString('en-IN')+"%";
        cur.innerHTML = (Number(getPrevious())*0.01).toLocaleString('en-IN');
        return;
    }
    // console.log(prev.innerHTML);
    if(parseFloat(prev.innerHTML.substr(-1,1))>0){
        prev.innerHTML+=opp;
        cur.innerHTML = "";
        // console.log('ck');
        return;
    }
    prev.innerHTML += opp;
    // console.log(prev.innerHTML);
    // console.log(prev.innerHTML.substr(0,prev.innerHTML.length-1),opp);
    // debugger;
    if(opp=="="){prev.innerHTML += findAnswer(); return;}//result chole ashbe & current vanish hole jabe, so findAnswer() niye kaj korte hobe...
    if(cur.innerHTML==""){prev.innerHTML = prev.innerHTML.substr(0,prev.innerHTML.length-2)+opp; return;}
    cur.innerHTML = "";
}
function putCurrent(digit){//Ekhne call hobe just digit e click hole...
    if(cur.innerHTML=="0"){
        cur.innerHTML="";
    }
    if(digit=='dot' && checkSame('.')){
        if(cur.innerHTML == ""){
            cur.innerHTML = "0.";
            return;
        }
        cur.innerHTML += ".";
        return;
    }else if(digit=='dot'){return;}
    // let idx = pDot==false ? (cur.innerHTML.indexOf('.')-cur.innerHTML.length) : 0;
    let oldCurrent = getCurrent() + digit;
    // console.log(oldCurrent.toLocaleString('en-IN'));
    if(oldCurrent.length==1){
        cur.innerHTML = oldCurrent;
        return;
    }
    cur.innerHTML = oldCurrent;
}
function checkSame(add){
    let st = cur.innerHTML;
    // console.log(st);
    if(add=='.'){
        for(let i=0;i<st.length;i++){
            if(st[i]=='.'){
                // console.log('dot ase');
                pDot = false;
                return false;
            }
        }
    }
    // console.log('dot nai');
    pDot=true;
    return true;
}
document.getElementById('backspace').addEventListener('click', function(){
    if(ON==false){
        return;
    }
    if(cur.innerHTML.length==1){clearing(); return;}
    //prev.innerHTML = "";
    let oldCurrent = cur.innerHTML.substr(0,cur.innerHTML.length-1);
    // console.log(oldCurrent);
    cur.innerHTML = Number(parseFloat(oldCurrent.replace(/,/g, ""))).toLocaleString('en-IN');
});
document.getElementById('clear').addEventListener('click', clearing);
document.getElementById('on').addEventListener('click', function(){
    ON = true;
    pDot = false;
    cur.innerHTML = "0";
    prev.innerHTML = "";
});
function clearing(){
    if(ON==false){
        return;
    }
    pDot = false;
    cur.innerHTML = "0";
    prev.innerHTML = "";
}

let number = document.getElementsByClassName('number');
for(let i=0;i<number.length;i++){
    // console.log(number[i].innerHTML);
    number[i].addEventListener('click', function(){
        if(ON==false){
            return;
        }
        if(inf){
            inf = false;
            clearing();
            // return;
        }
        //eta % এবং = jhamela nibaron kore...
        // console.log(prev.innerHTML.substr(-3,1));
        if(prev.innerHTML.substr(prev.innerHTML.length-1)=="%" || equalCheck()){
            prev.innerHTML = "";
            cur.innerHTML = "0";
        }
        if(this.id=="dot"){
            pDot=true;
        }
        putCurrent(this.id)
        
        // console.log(this.id);
    });
}
function equalCheck(){
    let st = prev.innerHTML;
    for(let i=0;i<st.length;i++){if(st[i]=="=")return true;}
    return false;
}
// console.log(Number(parseFloat(cur.innerHTML.replace(/,/g, ""))).toLocaleString('en-IN'));
let operation = document.getElementsByClassName('operator');
for(let i=0;i<operation.length;i++){
    operation[i].addEventListener('click', function(){
        pDot=true;
        if(ON==false || inf){
            return;
        }
        if(this.id=='equal' && cur.innerHTML==""){
            return;
        }
        if(this.id == 'equal' && prev.innerHTML==""){
            // console.log('ck');
            prev.innerHTML=cur.innerHTML;
            cur.innerHTML="";
            return;
        }
        if(this.id == 'equal' && parseInt(prev.innerHTML.substr(prev.innerHTML.length-1))>-1){
            // console.log('ck');
            prev.innerHTML=cur.innerHTML;
            cur.innerHTML="";
            return;
        }
        if(this.id=='equal' && prev.innerHTML.substr(-1,1)=="%"){
            // console.log('ck');
            prev.innerHTML=cur.innerHTML;
            cur.innerHTML="";
            return;
        }
        if(this.id == 'equal'){
            const op = prev.innerHTML.substr(prev.innerHTML.length-1);
            let p = prev.innerHTML.substr(0,prev.innerHTML.length-1).toLocaleString('en-IN');
            // console.log({p});
            let c = getCurrent().toLocaleString('en-IN');
            // console.log(prev.innerHTML.substr(prev.innerHTML.length-1));
            const res = calculation(prev.innerHTML.substr(prev.innerHTML.length-1),this.id);
            if(res==Infinity){
                return;
            }
            prev.innerHTML = p + " " + op + " " + c + " = " + res;
            cur.innerHTML = res.toLocaleString("en-IN");
            return;
        }
        // % ase abar korar jonno eta deye lagbe...
        if(this.id == "percentage"){
            putPrevious(this.id);
            return;
        }
        // % ekbar kora hoise er upor kono operation chalano hole...
        if(prev.innerHTML!="" && cur.innerHTML!="" && parseInt(prev.innerHTML.substr(prev.innerHTML.length-1))>=-2 == false){
            // calculation for any operator except equal(=)
            // console.log('ck3');
            if(prev.innerHTML.substr(prev.innerHTML.length-1)=="%"){
                prev.innerHTML = cur.innerHTML+this.id;
                cur.innerHTML = "";
                // calculation(cur.innerHTML,this.id);
                return;
            }
            calculation(prev.innerHTML.substr(prev.innerHTML.length-1),this.id);
            // debugger;
            // console.log(parseInt(prev.innerHTML.substr(prev.innerHTML.length-1)));
            return;
        }
        // console.log('ck');
        if(equalCheck()){
            prev.innerHTML = cur.innerHTML;
            cur.innerHTML = "";
        }
        putPrevious(this.id);
        // calculation(this.id);
    });
}
function calculation(opp,curOperation){
    let ans;
    let a = parseFloat(prev.innerHTML.replace(/,/g,"").substr(0,prev.innerHTML.length-1));
    let b = parseFloat(cur.innerHTML.replace(/,/g,""));
    switch(opp){
        case "+":
            ans = a+b;
            break;
        case "-":
            ans = a-b;
            break;
        case "*":
            ans = a*b;
            break;
        case "/":
            ans = a/b;
            break;
        case "percentage":
            ans = a*0.01;
            // console.log(ans);
            break;
        default:
            break;
    }

    if(curOperation=='equal' && ans!= Infinity){
        return ans;
    }
    putPrevious(opp);
    cur.innerHTML = ans.toLocaleString('en-IN');
    if(ans==Infinity){
        inf = true;
        prev.innerHTML = "math error!"
        return ans;
    }
    prev.innerHTML = cur.innerHTML+curOperation;
    // debugger;
    cur.innerHTML = "";
}