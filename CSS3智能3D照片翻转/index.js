var oLi = Array.prototype.slice.call(document.getElementsByTagName('li'));
oLi.forEach(function (ele, index) {
    ele.spec = getSpec(ele);
    ele.addEventListener('mouseenter', function (e) {
        addClass(this, e, 'in');
    })
    ele.addEventListener('mouseleave', function (e) {
        addClass(this, e, 'out');
    })
})
function getSpec(ele) {
    return {
        w: ele.offsetWidth,
        h: ele.offsetHeight
    }
}
function getDirection(ele, e) {
    var x = e.offsetX - ele.spec.w/2;
    var y = e.offsetY - ele.spec.h/2;

    return d = (Math.round(((Math.atan2(y,x) * (180/Math.PI)) + 180)/90) + 3)%4;
    
}
function addClass(ele, e, state) {
    var d = getDirection(ele , e);
    var direction;

    switch(d) {
        case 0: 
            direction = '-top';
            break;
        case 1: 
            direction = '-right';
            break;
        case 2: 
            direction = '-bottom';
            break;
        case 3: 
            direction = '-left';
    }
    ele.className = state + direction;
}