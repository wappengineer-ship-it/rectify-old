
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
    
    if (x.Level == 50){
       size = x.Width/2;
    }

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
    
    if (x.Level == 50){
       size = x.Width/2;
    }

    ctx.beginPath();
    ctx.rect(canvas.width/2, 10, size/1.5, size);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.closePath();
};


x053.GetHealthPotion = function (){
    if (x.Nuggets >= 100){
        x.Nuggets -= 100;
        localStorage.Nuggets = x.Nuggets;
        x100.HealthPotions++
        localStorage.HealthPotions = x100.HealthPotions;
        x.UpdateBar()
    }
};

x053.GetPoisonBomb = function (){
    if (x.Nuggets >= 100){
        x.Nuggets -= 100;
        localStorage.Nuggets = x.Nuggets;
        x100.PoisonBombs++
        localStorage.PoisonBombs = x100.PoisonBombs;
        x.UpdateBar()
    }
};

x053.ImproveWeapon = function () {
    if (x.Nuggets >= x100.WeaponLevel*500){
        x.Nuggets -= x100.WeaponLevel*500;
        localStorage.Nuggets = x.Nuggets;
        x100.WeaponLevel++
        localStorage.WeaponLevel = x100.WeaponLevel;
        x053.UpdateBarracks()
        x.UpdateBar()
    }
};

x053.ImproveArmour = function () {
    if (x.Nuggets >= x100.ArmourLevel*500){
        x.Nuggets -= x100.ArmourLevel*500;
        localStorage.Nuggets = x.Nuggets;
        x100.ArmourLevel++
        localStorage.ArmourLevel = x100.ArmourLevel;
        x053.UpdateBarracks()
        x.UpdateBar()
    }
};

x053.UpdateBarracks = function (){
    var h = `Hello, fellow warrior!<br><br>`
    + x.GetButton('Recruit (1000 Nuggets)', 'x053.Convince()')
    + x.GetButton('Improve weapon ('+ x100.WeaponLevel*500 +' Nuggets)',
    'x053.ImproveWeapon()')
    + x.GetButton('Improve armour ('+ x100.ArmourLevel*500 +' Nuggets)',
    'x053.ImproveArmour()')

    x.e('x053_BarracksDiv').innerHTML = h;
};

x100.Camels = parseInt(localStorage.Camels) || 0;
    //x100.Camels = 1;
    x053.HireCamel = function () { //
    if (x.Nuggets >= 500){
        if (x100.Followers >= x100.Camels){
            x100.Camels++
            x.Nuggets -= 500;
            localStorage.Camels = x100.Camels;
            localStorage.Nuggets = x.Nuggets;
            x.UpdateBar();
        }
    }
};

x053.UpdateBank = function () {
    var h = '';
    var Banked = parseInt(localStorage.BankedNuggets);
    if (Banked > 0) {
        h += x.GetButton('Withdrawal', 'x053.Withdraw()');

    } else {
        h += x.GetButton('Deposit', 'x053.Deposit()');
    }
    x.e("x053_BankDiv").innerHTML = h;
};

x053.Deposit = function () {

    localStorage.BankedNuggets = x.Nuggets;
    x.Nuggets = 0;
    localStorage.Nuggets = 0;
    localStorage.LastDeposited = new Date()
    x.UpdateBar();
    x053.UpdateBank()
    }//

    x053.Withdraw = function (){
        var date = new Date();
        var BankedNuggets = parseInt(localStorage.BankedNuggets) || 0;
        var OldDate = Date.parse(localStorage.LastDeposited)
        var MS = date - OldDate;
        var H = MS/1000/60/60;
        var Withdraw = BankedNuggets+ parseInt(BankedNuggets*1.1*(H))
        x.Nuggets += Withdraw;

        localStorage.Nuggets = x.Nuggets;
        localStorage.BankedNuggets = 0;
        x.UpdateBar();
        x053.UpdateBank()
    }

    x.UpdateBar = function(){//
    x.e('xBottomBar').innerHTML = 'Level ' + x.Level + ' | Nuggets: ' + x.Nuggets;
};
