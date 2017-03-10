//通用函数
function get(selector) {
    var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}
//随机生成一个值
function random(range) {
    var max=Math.max(range[0],range[1]);
    var min=Math.min(range[0],range[1]);
    var diff=max-min;
    var number=Math.random()*diff+min;
    return parseInt(number);
}
//输出所有图片
//var data=data;
function addPhotos() {
    var template=get('#wrap').innerHTML;
    var html=[];
    var nav=[];
    for(var i in data){
        var _html=template
            .replace('{{index}}',i)
            .replace('{{caption}}',data[i].caption)
            .replace('{{img}}',data[i].img)
            .replace('{{desc}}',data[i].desc);
        html.push(_html);
        var _nav='<span id="nav_'+i+'" class="i" onclick="turn(get(\'#photo_'+i+'\'))"></span>';
        nav.push(_nav);
    }
    html.push('<nav id="nav" class="nav">'+nav.join('')+'</nav>');
    get('#wrap').innerHTML=html.join('');
    resort(random([0,data.length]));
}
addPhotos();
//图片排序
function resort(n){
    var _photos=get('.photo');
    var photos=[];//需要把_photos转化成有序的photos数组；
    for(var s=0;s<_photos.length;s++){
        _photos[s].className=_photos[s].className.replace(/\s*photo-center\s*/,' ');
        _photos[s].className=_photos[s].className.replace(/\s*photo-back\s*/,' photo-front ');
        photos.push(_photos[s]);
        get('#nav_'+s).className='i';
    }
    var photo_center=photos.splice(n,1)[0];//从photos里取出一个
    photo_center.className+='photo-center';

    var photos_left=photos.splice(0,Math.ceil(photos.length/2));
    var photos_right=photos;

    var ranges=range();
    for(var i in photos_left){
        photos_left[i].style.left=random(ranges.left.x)+'px';
        photos_left[i].style.top=random(ranges.left.y)+'px';
        photos_left[i].style['-webkit-transform']='rotate('+random([-150,150])+'deg)';
    }
    for (var j in photos_right){
        photos[j].style.left=random(ranges.right.x)+'px';
        photos[j].style.top=random(ranges.right.y)+'px';
        photos_right[j].style['-webkit-transform']='rotate('+random([-150,150])+'deg)';
    }
    get('#nav_'+n).className+=' i-current i-front';
}
//图片翻转
function turn(ele) {
    var cln=ele.className;
    var _index=ele.getAttribute('id').match(/\d+/g);
    var nav_cln=get('.i-current')[0].className;
        if(/photo-center/.test(cln)){
            if (/photo-front/.test(cln)){
                cln=cln.replace(/photo-front/,'photo-back');
                nav_cln=nav_cln.replace(/front/,'back');
            }
            else {
                cln=cln.replace(/photo-back/,'photo-front');
                nav_cln=nav_cln.replace(/back/,'front');
            }
            ele.className=cln;
            get('.i-current')[0].className=nav_cln;
        }
        else {
            resort(_index);
        }
}
//计算左右分区范围
function range() {
    var range={left:{x:[],y:[]},right:{x:[],y:[]}};
    var wrap={w:get('#wrap').clientWidth,h:get('#wrap').clientHeight};
    var photo={w:get('.photo')[0].clientWidth,h:get('.photo')[0].clientHeight};
    range.left.x=[-photo.w/2,wrap.w/2-photo.w/2];
    range.left.y=[-photo.h/2,wrap.h];
    range.right.x=[wrap.w/2+photo.w/2,wrap.w-photo.w/2];
    range.right.y=range.left.y;   
    return range;
}