//time
var c=0;
var t;
function time(){

    var tt=document.getElementById("tt");

    var min=parseInt(Number(c)/60);
    if(min/10<=1){min="0"+min;}
    var s=Number(c)%60;

    if(s/10<=1){s="0"+s;}


    tt.value=min+":"+s;

    //c=Number(c)+1;

    t=setTimeout("time()",1000);
    c=Number(c)+1;

}
function stopTime(){
    clearTimeout(t);
    return c;
}
function clearAll(){
    c=0;
    document.getElementById('tt').value="00:00" ;
    clearTimeout(t);
}



var arr=["m5","m4","m2","m3"];
var ans={
    range:	[{id:"p1",src:"images/m5.png"},
        {id:"p2",src:"images/m1.png"},
        {id:"p3",src:"images/m2.png"},
        {id:"p4",src:"images/m3.png"}],
    chose:{ans1:"",ans2:""},
    flag:0,
    way:"",
    time:"",
    cnt:0
}


function randomsort(a,b){
    return Math.random()>0.5 ?-1:1;
}

document.onreadystatechange = subSomething;

function subSomething()
{
    if(document.readyState == "complete") {//当页面加载状态
        arr.sort(randomsort);
        setImg();

    }
}

function randomNum(){
    return parseInt(4*Math.random());
}

function swap(a,b){
    var x=ans.range[a].src;
    ans.range[a].src=ans.range[b].src;
    ans.range[b].src=x;
//	console.log(String(ans));

}
function reset(){
    arr.sort(randomsort);
    setImg();
    ans.way="";
    ans.cnt=0;
    document.getElementById("way").innerHTML=ans.way;
    var x=document.getElementById("stars");
    x.innerHTML="";
    clearAll();
}
function change(){
    for(var i=0;i<4;i++){
        var str1=String("p"+(Number(i)+1));
        var x=document.getElementById(str1);
        x.src="images/m6.png";
    }
    var a=randomNum();
    var b=randomNum();
    while(a==b){
        a=randomNum();
        b=randomNum();
    }
    swap(a,b);
    ans.cnt++;
    console.log(ans.cnt);
    ans.flag=1;
    ans.chose.ans1="";
    var z=(Number(a)+1)+"<->"+(Number(b)+1)+";";
    ans.way+=z;
    document.getElementById("way").innerHTML=ans.way;
}

function choose(p){

    if(ans.flag==0) {alert("请至少交换一次!"); return;}
    if(ans.chose.ans1==""){
        document.getElementById(p).src="images/m.png";

        for(var i=0;i<4;i++){
            if(p==ans.range[i].id){

                ans.chose.ans1=ans.range[i].src;
                break;
            }
        }
    }
    else{
        alert("已经选择过了呀!");
    }
}

function choose2(str){
    if(ans.chose.ans1==""){ alert("请选择待选图"); return; }
    /*ans.cnt++;
    console.log(ans.cnt);
*/	ans.chose.ans2=str;

    if(ans.chose.ans1==ans.chose.ans2){
        alert("success");//成功效果
        stopTime();
        //ans.time=document.getElementById("tt").value;
        ans.time=c;
        //console.log(ans.time);

        getScore();//获得成绩
        //设置div效果
        show();
    }
    else{//选择错误增加一次交换
        change();
    }

}

function show(){
    //console.log(ach.star);
    str='<img src="images/stargood.png">';
    stri=ach.type;
    for(i=1;i<=ach.star;i++){
        stri+=str;
    }

    var x=document.getElementById("stars");
    x.innerHTML=stri;
    x.style.display="block";
}



function setImg(){
    for(i in arr){
        var str="images/"+arr[i]+".png";
        ans.range[i].src=str;

        var x=document.getElementById(ans.range[i].id).src=ans.range[i].src;
    }


}


var rule=[
    {level:4,type:"简单",tim:[{r:30,star:5},{r:60,star:4},{r:80,star:3},{r:120,star:2},{r:1200,star:1},]},
    {level:8,type:"一般",tim:[{r:50,star:5},{r:90,star:4},{r:120,star:3},{r:180,star:2},{r:1200,star:1},]},
    {level:100,type:"困难",tim:[{r:80,star:5},{r:120,star:4},{r:180,star:3},{r:240,star:2},{r:1200,star:1},]},

];

var ach={type:"",star:0};

function getScore(){
    var num=ans.cnt;
    var tt=ans.time;


    for(p in rule){
        if(num<=rule[p].level){
            console.log(rule[p].type);
            for(x in rule[p].tim){
                if(tt<=rule[p].tim[x].r){
                    console.log(rule[p].tim[x].r);
                    ach.type=rule[p].type;
                    ach.star=rule[p].tim[x].star;
                    return;

                }
            }
        }

    }

}