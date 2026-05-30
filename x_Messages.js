
var x051 = {}; // Yes/No screen
x051.Begin = function (pCaller, pHeading, pMessage, pCallback) {
    x.Hide(pCaller);
    
    var h = '<div></div>'; //Column 1
    h += '<div>'; //Column 2 start
    h += '<h1>' +pHeading + '</h1>';
    h += '<p>' + pMessage + '</p>';
    h += x.GetButton('Yes', 'x.Hide(`x051`);x051.CallBack(\'y\');', 'x051_DefaultButton');
    h += x.GetButton('No', 'x.Hide(`x051`);x051.CallBack(\'n\');');
    h += '</div>'; //End column 2
    h += '<div></div>'; //Column 3
    

    x051.div = x.e('x051');
    x051.div.innerHTML = h;
    x051.div.style.display = 'grid';
    x.e('x051_DefaultButton').focus();
    x051.CallBack = pCallback;
};

var x052 = {}; // dialogue
x052.Begin = function (pCaller, pHeading, pMessage, pCallback) {
    x.Hide(pCaller);
    x052.CallBack = pCallback;

    var h = '<canvas id = "x052_Canvas" ></canvas>';
    h += '<div>'; 
    h += '<h1>' +pHeading + '</h1>';
    h += '<p>' + pMessage + '</p>';
    h += x.GetButton('Continue', 'x.Hide(`x052`);x052.CallBack()')
    h += '</div>'; 

    var e = x.e('x052');
    e.innerHTML = h;
    e.style.display = 'grid';

    const canvas = document.getElementById("x052_Canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = x100.TerrainColor;
    ctx.rect(0,0,canvas.width,canvas.width)
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    var size = 50;
    if (x.Level == 50){
        size = 100;
    }
    ctx.rect(canvas.width/2 -size/2, canvas.height - size - 10, size/1.5, size);
    ctx.fillStyle = x100.BodyColor;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(canvas.width/2, 10, size/1.5, size);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.closePath();
};

var x053 = {}; // in building
x053.Begin = function (pCaller, pHeading, pMessage, pCallback) {
    x.Hide(pCaller);
    x053.CallBack = pCallback;

    var h = '<canvas id = "x053_Canvas" ></canvas>';
    h += '<div>'; 
    h += '<h1>' +pHeading + '</h1>';
    h += '<p>' + pMessage + '</p>';
    h += x.GetButton('Continue', 'x.Hide(`x053`);x053.CallBack()')
    h += '</div>';

    var e = x.e('x053');
    e.innerHTML = h;
    e.style.display = 'grid';
    scrollTo(0, 0);

    const canvas = document.getElementById("x053_Canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(0,0,canvas.width,canvas.width)
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    var size = 50;
    if (x.Level == 50){
        size = 100;
    }
    ctx.rect(canvas.width/2 -size/2, canvas.height - size - 10, size/1.5, size);
    ctx.fillStyle = x100.BodyColor;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(canvas.width/2, 10, size/1.5, size);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.closePath();
};


