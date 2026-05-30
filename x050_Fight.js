
var x050 = {}; // fight
x050.Begin = function (pCaller, pHeading, pMessage, pCallback) {
    x100.Stop();
    x100.Displacement -= 10;
    
    x.Hide(pCaller);
    x050.CallBack = pCallback;
    
    var h = '';
    
    h += '<canvas id = "x050_Canvas"></canvas>';

    h += '<div id="X050_FightDiv">';

    h += x.GetButton('<', 'x050.Respond(7)', 'x050_7');
    h += x.GetButton('^', 'x050.Respond(8)', 'x050_8');
    h += x.GetButton('>', 'x050.Respond(9)', 'x050_9');


    h += x.GetButton('<', 'x050.Respond(4)', 'x050_4');
    h += x.GetButton('^', 'x050.Respond(5)', 'x050_5');
    h += x.GetButton('>', 'x050.Respond(6)', 'x050_6');


    h += x.GetButton('<', 'x050.Respond(1)', 'x050_1');
    h += x.GetButton('V', 'x050.Respond(2)', 'x050_2');
    h += x.GetButton('>', 'x050.Respond(3)', 'x050_3');
     
    h += x.GetButton('HP', 'x050.UseHP()', 'x050_HP');
    h += x.GetButton('PB', 'x050.UsePB()', 'x050_PB');
    h += '</div>';
    
    var e = x.e('x050');
    e.innerHTML = h;
    e.style.display = 'grid';    

    x050.Draw()
    
    x050.UsedPB = 0; 
    setTimeout(x050.Fight, 3000)
};

x050.Draw = function () {
    const canvas = document.getElementById("x050_Canvas");
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
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
};

x050.UseHP = function () {
  x100.HealthPotions--
  localStorage.HealthPotions = x100.HealthPotions;
  x050.HP = 5*x100.ArmourLevel; 
  /*if (x100.HealthPotions == 0) {
    x.Hide('x050_HP')
  }*/
};

x050.UsePB = function () {
  x100.PoisonBombs--
  
  localStorage.PoisonBombs = x100.PoisonBombs;
  x050.UsedPB++
  /*if (x100.PoisonBombs == 0) {
    x.Hide('x050_PB')
  }*/
  if (!x050.Interval == null){
      clearInterval(x050.Interval)
      x050.Interval = setInterval(x050.Fight2, x050.HitDuration*(x100.Followers + 1)*(x050.UsedPB + 1))
  }
  
};

x050.Fight = function (){
    x050.HP = 5*x100.ArmourLevel; 
    if (x.Level == 50){
        x050.HP /= 2;
    }
    x050.EnemyHP = Math.ceil((4 + x.Level));
    x050.EnemyDexRatio = 0.9**x.Level;

    x050.HitDuration = 3000*x050.EnemyDexRatio;
    
    var Switch = 1;
    x050.Fight2 = function () {
        if (x050.DirectionOfStrike){
            x.e('x050_'+ x050.DirectionOfStrike).style.border = '5px solid white';
        }
        if (x.e('x050_'+ x050.HilitedButton)){
            x.e('x050_'+ x050.HilitedButton).style.border = '5px solid white';
        }
        if (x050.Responded == false){
            x050.HP--;
            if (x050.HP <= 0){
                clearInterval(x050.Interval)
                x.Nuggets = 0;
                localStorage.Nuggets = x.Nuggets;                   
                x.UpdateBar()
                x051.Begin('x050', 'You died', 'Reset level?', function (r){
                    if (r == 'y') {
                        x.Level = 1;
                    } else {
                    }        
                    localStorage.Level = x.Level;
                    x100.Begin()     
                    x.e('xBottomBar').innerHTML = 'Level ' + x.Level + '| Nuggets: ' + x.Nuggets;
                })
            }
        }
        x050.Responded = false;
        if (Switch%2 == 1){ //Fight
            var DirectionOfStrike = Math.floor(Math.random()*9) + 1;
            x050.HilitedButton = DirectionOfStrike;
            x.e('x050_'+ x050.HilitedButton).style.border = '5px solid orange';
            x050.CanAttack = false;
        } else { //Between Strike
            x.e('x050_'+ x050.HilitedButton).style.border = '5px solid white';
            x050.CanAttack = true;
            x050.Responded = 'break';
        }

        Switch++
        x050.Switch = Switch;
    }
    x050.Interval = setInterval(x050.Fight2, x050.HitDuration*(x100.Followers + 1)*(x050.UsedPB + 1))
};
x050.Respond = function (pDirectionOfStrike) {
    if (x050.Responded == true){return}
        x050.DirectionOfStrike = pDirectionOfStrike;
        x050.Responded = true;
    if (pDirectionOfStrike == x050.HilitedButton){
        x.e('x050_'+ x050.HilitedButton).style.border = '5px solid green';
    } else {
        if (x050.CanAttack == false){
            //Missed block
            x050.HP--;
            if (x050.HP <= 0){
                clearInterval(x050.Interval)
                x051.Begin('x050', 'You died', 'Reset level?', function (r){
                    if (r == 'y') {
                        x.Level = 1;
                        
                    } else {
           
                    }        
                    x.Nuggets = 0;
                    localStorage.Nuggets = x.Nuggets;                    
                    localStorage.Level = x.Level;
                    x100.Begin()     
                    x.e('xBottomBar').innerHTML = 'Level ' + x.Level + '| Nuggets: ' + x.Nuggets;
    
                })
            }
        } else {
            x050.EnemyHP = x050.EnemyHP - x100.WeaponLevel - x100.Followers;
            x.e('x050_'+ pDirectionOfStrike).style.border = '5px solid red';

            if (x050.EnemyHP <= 0){            
                clearInterval(x050.Interval)
                x051.Begin('x050', 'Victory!', 'Loot?', function (r){
                    x.Level++
                    localStorage.Level = x.Level;
                      if (r == 'y') {
                        if (x.Level <= 50) {
                              x.Nuggets += 10*(x.Level - 1);
                     
                        } else {
                              x.Nuggets += 100000
                     
                        }
                        localStorage.Nuggets = x.Nuggets;

                        x.e('xBottomBar').innerHTML = 'Level ' + x.Level + '| Nuggets: ' + x.Nuggets;

                        x100.Begin();
                    } else {
                        x100.Begin();
                    } 
                })
            }
        }
    }    
};