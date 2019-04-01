
window.onload = function(){
    imgLocation('container','box')  //1

    var imgData = {data : [{'src' : '1.jpg'},{'src' : '2.jpg'},{'src' : '3.jpg'},{'src' : '4.jpg'},{'src' : '5.jpg'},{'src' : '6.jpg'},{'src' : '7.jpg'},{'src' : '8.jpg'},{'src' : '9.jpg'},{'src' : '10.jpg'},{'src' : '11.jpg'},{'src' : '12.jpg'},{'src' : '13.jpg'}]}

    window.onscroll = function(){
        if(checkFlag()){    //20当返回true时，创建文档节点并调用摆放图片位置的方法
            var cparent = document.getElementById('container');
            for(var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement('div');
                ccontent.className = 'box';
                cparent.appendChild(ccontent);
                var img_box = document.createElement('div');
                img_box.className = 'img_box';
                ccontent.appendChild(img_box);
                var img = document.createElement('img');
                img.src = './img/'+imgData.data[i].src;
                img_box.appendChild(img);
            }
            imgLocation('container','box');
        }
    }
}

function checkFlag(){       //15设定加载图片条件
    var cparent = document.getElementById('container');     
    var ccontent = getChildElement(cparent,'box');
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;  //16获取最后一张图片距顶部的高度a
    var scrollTop = document.documentElement.scrollTop || document.body.scroll;     //17获取滚动条滚动的距离b
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;   //18获取页面内容的高度c
    console.log(lastContentHeight+':'+scrollTop+':'+pageHeight)
    if(lastContentHeight<scrollTop+pageHeight){     //19当a<b+c时返回true
        return true;
    }
}


function imgLocation(parent,content){   //摆放图片位置的方法
    var cparent = document.getElementById(parent);  //2获取父元素container
    var ccontent = getChildElement(cparent,content);    //4接收
    // console.log(ccontent)
    var imgWidth = ccontent[0].offsetWidth;     //5获取图片宽度
    var num = Math.floor(document.documentElement.clientWidth/imgWidth);    //6计算一行能放几张图片
    cparent.style.cssText = 'width:'+imgWidth*num+'px;margin:0 auto;';      //7设置container宽度及使图片居中
    var boxHeightArr = [];      //8创建存放图片高度的数组
    for(var i=0;i<ccontent.length;i++){
        if(i<num){  
            boxHeightArr[i] = ccontent[i].offsetHeight;     //9把第一行图片的高度存入数组 
        }else{
            var minHeight = Math.min.apply(null,boxHeightArr);      //10.得出第一行最低的图片
            var minIndex = getminHeightLocation(boxHeightArr,minHeight);    //12接收
            // console.log(ccontent)
            // console.log(i)
            // console.log(ccontent[i])
            ccontent[i].style.position = 'absolute';     //13给第二行图片定位到第一行最低的图片下面
            ccontent[i].style.top = minHeight+'px';     //最低图片距窗口上方距离
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+'px';    //最低图片距窗口左边距离
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;       //14得出排列后的新高度
        }
    }
}

function getminHeightLocation(boxHeightArr,minHeight){      //11.获取最低图片的下标
    for(var i=0 in boxHeightArr){
        if(boxHeightArr[i] == minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content){   //3
    var contentArr = [];    //存放box
    var allcontent = parent.getElementsByTagName('*');   //找到container下所有元素
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className == content){     //把类名为box的放入数组
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}