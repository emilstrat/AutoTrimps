var worth = {'Shield': {}, 'Staff': {}};
function worthOfHeirlooms(){for(var c in worth={Shield:{},Staff:{}},game.global.heirloomsExtra){var d=game.global.heirloomsExtra[c];worth[d.type][c]=d.rarity}for(var e in worth)worth[e]=Object.keys(worth[e]).sort(function(f,g){return worth[e][g]==worth[e][f]?evaluateHeirloomMods(g,'heirloomsExtra')-evaluateHeirloomMods(f,'heirloomsExtra'):worth[e][g]-worth[e][f]})}
var animated = (game.options.menu.showHeirloomAnimations.enabled) ? "animated " : "";
var worth2 = {'Shield': [], 'Staff': []};
function worthOfHeirlooms2(){for(var c in worth2={Shield:[],Staff:[]},game.global.heirloomsExtra){var d=game.global.heirloomsExtra[c],e={location:'heirloomsExtra',index:c,rarity:d.rarity,eff:evaluateHeirloomMods(c,'heirloomsExtra')};worth2[d.type].push(e)}var f=function(g,h){return h.rarity==g.rarity?h.eff-g.eff:h.rarity-g.rarity};worth2.Shield.sort(f),worth2.Staff.sort(f)}
function autoHeirlooms2(){if(!heirloomsShown&&0<game.global.heirloomsExtra.length){for(var a=game.global.heirloomsCarried.length,b=0;b<a;b++)selectHeirloom(0,'heirloomsCarried'),stopCarryHeirloom();for(var c,a=game.global.heirloomsExtra.length,b=0;b<a;b++)c=game.global.heirloomsExtra[b],c.protected&&game.global.heirloomsCarried.length<game.global.maxCarriedHeirlooms&&(selectHeirloom(b,'heirloomsExtra'),carryHeirloom(),b--,a--);for(worthOfHeirlooms2();game.global.heirloomsCarried.length<game.global.maxCarriedHeirlooms&&0<game.global.heirloomsExtra.length;){if(worthOfHeirlooms2(),0<worth2.Shield.length){var d=worth2.Shield.shift();selectHeirloom(d.index,'heirloomsExtra'),carryHeirloom()}if(worthOfHeirlooms2(),0<worth2.Staff.length){var e=worth2.Staff.shift();selectHeirloom(e.index,'heirloomsExtra'),carryHeirloom()}}for(var f in worthOfHeirlooms(),game.global.heirloomsCarried){var c=game.global.heirloomsCarried[f],g={Shield:'Staff',Staff:'Shield'};if(0!=worth[g[c.type]].length){var b=worth[g[c.type]][0];c.rarity<game.global.heirloomsExtra[b].rarity&&!c.protected&&(selectHeirloom(f,'heirloomsCarried'),stopCarryHeirloom(),selectHeirloom(b,'heirloomsExtra'),carryHeirloom(),worthOfHeirlooms())}}}else heirloomsShown&&0<game.global.selectedHeirloom.length}
function autoHeirlooms(){if(!heirloomsShown&&0<game.global.heirloomsExtra.length){for(var a in game.global.heirloomsExtra){var b=game.global.heirloomsExtra[a];b.protected&&game.global.heirloomsCarried.length<game.global.maxCarriedHeirlooms&&(selectHeirloom(a,'heirloomsExtra'),carryHeirloom())}for(var c in worthOfHeirlooms(),game.global.heirloomsCarried){var b=game.global.heirloomsCarried[c];if(0!=worth[b.type].length){var d=worth[b.type][0];(b.rarity<game.global.heirloomsExtra[d].rarity||b.rarity==game.global.heirloomsExtra[d].rarity&&evaluateHeirloomMods(c,'heirloomsCarried')<evaluateHeirloomMods(d,'heirloomsExtra'))&&!b.protected&&(selectHeirloom(c,'heirloomsCarried'),stopCarryHeirloom(),selectHeirloom(d,'heirloomsExtra'),carryHeirloom(),worthOfHeirlooms())}}game.global.heirloomsCarried.length<game.global.maxCarriedHeirlooms&&(0<worth.Shield.length?selectHeirloom(worth.Shield[0],'heirloomsExtra'):0<worth.Staff.length&&selectHeirloom(worth.Staff[0],'heirloomsExtra'),carryHeirloom())}else heirloomsShown&&0<game.global.selectedHeirloom.length}
function autoNull(){try{for(var b,g,c=[game.global.ShieldEquipped,game.global.StaffEquipped],f=0;2>f;f++)if(g=c[f],b=evaluateHeirloomMods(0,g.type+"Equipped",!0),b.index){selectedMod=b.index;var h=getModUpgradeCost(g,selectedMod);if(game.global.nullifium<h)continue;game.global.nullifium-=h;var j=getModUpgradeValue(g,selectedMod),k=g.mods[selectedMod];k[1]=j,"undefined"==typeof k[3]?(k[2]=0,k[3]=1):k[3]++,game.heirlooms[g.type][g.mods[selectedMod][0]].currentBonus=j}}catch(m){debug("AutoSpendNull Error encountered, no Heirloom detected?: "+m.message,"general")}}
function checkForMod(a,b,c){var d=game.global[c][b];for(var e in d.mods)if(d.mods[e][0]==a)return!0;return!1}
function evaluateHeirloomMods(e,r,a){var t,o,s=e,m={index:null,name:"",effect:0};e=r.includes("Equipped")?game.global[r]:game.global[r][e];var i=0;for(var d in e.mods){var c=getPlayerCritDamageMult(),f=getPlayerCritChance(),p=c-game.heirlooms.Shield.critDamage.currentBonus/100,g=f-game.heirlooms.Shield.critChance.currentBonus/100;switch(e.mods[d][0]){case"critChance":i+=t=e.mods[d][1]/10*p/(g*p+1-g),a&&(t=(o=game.heirlooms.Shield.critChance.steps[e.rarity])[2]/10*c/(f*c+1-f),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="critChance",m.index=d));break;case"critDamage":i+=t=e.mods[d][1]/10*g/(p*g+1-g),a&&(t=(o=game.heirlooms.Shield.critDamage.steps[e.rarity])[2]/10*f/(f*c+1-f),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="critDamage",m.index=d));break;case"trimpAttack":i+=t=e.mods[d][1]/10,a&&(t=(o=game.heirlooms.Shield.trimpAttack.steps[e.rarity])[2]/10/(game.heirlooms.Shield.trimpAttack.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="trimpAttack",m.index=d));break;case"voidMaps":i+=t=e.mods[d][1]/10,a&&(t=(o=game.heirlooms.Shield.voidMaps.steps[e.rarity])[2]/10/(game.heirlooms.Shield.voidMaps.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="voidMaps",m.index=d));break;case"plaguebringer":i+=t=e.mods[d][1]/10,a&&(t=(o=game.heirlooms.Shield.plaguebringer.steps[e.rarity])[2]/1/(game.heirlooms.Shield.plaguebringer.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="plaguebringer",m.index=d));break;case"MinerSpeed":i+=t=.75*e.mods[d][1]/10,a&&(t=.75*(o=game.heirlooms.defaultSteps[e.rarity])[2]/10/(game.heirlooms.Staff.MinerSpeed.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="MinerSpeed",m.index=d));break;case"metalDrop":i+=t=.75*e.mods[d][1]/10,a&&(t=.75*(o=game.heirlooms.defaultSteps[e.rarity])[2]/10/(game.heirlooms.Staff.metalDrop.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="metalDrop",m.index=d));break;case"fragmentsDrop":i+=t=.75*e.mods[d][1]/10,a&&(t=.75*(o=game.heirlooms.defaultSteps[e.rarity])[2]/10/(game.heirlooms.Staff.fragmentsDrop.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="DragimpSpeed",m.index=d));break;case"ExplorerSpeed":i+=t=.75*e.mods[d][1]/10,a&&(t=.75*(o=game.heirlooms.defaultSteps[e.rarity])[2]/100/(game.heirlooms.Staff.ExplorerSpeed.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="gemsDrop",m.index=d));break;case"FarmerSpeed":i+=t=.75*e.mods[d][1]/100,a&&(t=.5*(o=game.heirlooms.defaultSteps[e.rarity])[2]/100/(game.heirlooms.Staff.FarmerSpeed.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="FarmerSpeed",m.index=d));break;case"LumberjackSpeed":i+=t=.75*e.mods[d][1]/100,a&&(t=.5*(o=game.heirlooms.defaultSteps[e.rarity])[2]/100/(game.heirlooms.Staff.LumberjackSpeed.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="LumberjackSpeed",m.index=d));break;case"FluffyExp":i+=t=.9*e.mods[d][1]/10,a&&(t=.5*(o=game.heirlooms.defaultSteps[e.rarity])[2]/1/(game.heirlooms.Staff.FluffyExp.currentBonus/100+1),(t/=getModUpgradeCost(e,d))>m.effect&&(m.effect=t,m.name="FluffyExp",m.index=d));break;case"empty":var l;if(a)break;"Shield"==e.type&&(checkForMod("trimpAttack",s,r)?checkForMod("voidMaps",s,r)?checkForMod("critChance",s,r)?checkForMod("critDamage",s,r)?checkForMod("plaguebringer",s,r)||(i+=t=(l=(o=game.heirlooms[e.type].plaguebringer.steps[e.rarity])[0]+(o[1]-o[0])/2)/1):i+=t=(l=(o=game.heirlooms[e.type].critDamage.steps[e.rarity])[0]+(o[1]-o[0])/2)*g/(p*g+1-g):i+=t=(l=(o=game.heirlooms[e.type].critChance.steps[e.rarity])[0]+(o[1]-o[0])/2)*p/(g*p+1-g):(l=(o=game.heirlooms[e.type].voidMaps.steps[e.rarity])[0]+(o[1]-o[0])/2,i+=t=o[2]/10):i+=t=(l=(o=game.heirlooms[e.type].trimpAttack.steps[e.rarity])[0]+(o[1]-o[0])/2)/10),"Staff"==e.type&&(l=(o=game.heirlooms.defaultSteps[e.rarity])[0]+(o[1]-o[0])/2,checkForMod("MinerSpeed",s,r)&&checkForMod("metalDrop",s,r)&&checkForMod("fragmentsDrop",s,r)&&checkForMod("ExplorerSpeed",s,r)&&checkForMod("FluffyExp",s,r)||(i+=.8*l/100))}}return a?m:i}
var hrlmProtBtn1=document.createElement('DIV');hrlmProtBtn1.setAttribute('class','noselect heirloomBtnActive heirBtn'),hrlmProtBtn1.setAttribute('onclick','protectHeirloom(this, true)'),hrlmProtBtn1.innerHTML='Protect/Unprotect',hrlmProtBtn1.id='protectHeirloomBTN1';var hrlmProtBtn2=document.createElement('DIV');hrlmProtBtn2.setAttribute('class','noselect heirloomBtnActive heirBtn'),hrlmProtBtn2.setAttribute('onclick','protectHeirloom(this, true)'),hrlmProtBtn2.innerHTML='Protect/Unprotect',hrlmProtBtn2.id='protectHeirloomBTN2';var hrlmProtBtn3=document.createElement('DIV');hrlmProtBtn3.setAttribute('class','noselect heirloomBtnActive heirBtn'),hrlmProtBtn3.setAttribute('onclick','protectHeirloom(this, true)'),hrlmProtBtn3.innerHTML='Protect/Unprotect',hrlmProtBtn3.id='protectHeirloomBTN3',document.getElementById('equippedHeirloomsBtnGroup').appendChild(hrlmProtBtn1),document.getElementById('carriedHeirloomsBtnGroup').appendChild(hrlmProtBtn2),document.getElementById('extraHeirloomsBtnGroup').appendChild(hrlmProtBtn3);
function protectHeirloom(a,b){var c=game.global.selectedHeirloom,d=c[1],e=game.global[d];if(-1!=c[0])var e=e[c[0]];b&&(e.protected=!e.protected),a||(d.includes("Equipped")?a=document.getElementById("protectHeirloomBTN1"):"heirloomsCarried"==d?a=document.getElementById("protectHeirloomBTN2"):"heirloomsExtra"==d&&(a=document.getElementById("protectHeirloomBTN3"))),a&&(a.innerHTML=e.protected?"UnProtect":"Protect")}
function newSelectHeirloom(a,b,c){selectHeirloom(a,b,c),protectHeirloom()}
function generateHeirloomIcon(a,b,c){if("undefined"==typeof a.name)return"<span class='icomoon icon-sad3'></span>";var d="Shield"==a.type?"icomoon icon-shield3":"glyphicon glyphicon-grain",e=game.options.menu.showHeirloomAnimations.enabled?"animated ":"",f="<span class=\"heirloomThing "+e+"heirloomRare"+a.rarity;"Equipped"==b&&(f+=" equipped");var g="";return g+="Equipped"==b?"-1,'"+a.type+"Equipped'":c+", 'heirlooms"+b+"'",f+="\" onmouseover=\"tooltip('Heirloom', null, event, null, "+g+")\" onmouseout=\"tooltip('hide')\" onclick=\"newSelectHeirloom(",f+=g+", this)\"> <span class=\""+d+"\"></span></span>",f}
function highdmgshield(){for(loom of game.global.heirloomsCarried)if(loom.name==getPageSetting('highdmg'))return loom;}
function lowdmgshield(){for(loom of game.global.heirloomsCarried)if(loom.name==getPageSetting('lowdmg'))return loom;}
function dhighdmgshield(){for(loom of game.global.heirloomsCarried)if(loom.name==getPageSetting('dhighdmg'))return loom;}
function dlowdmgshield(){for(loom of game.global.heirloomsCarried)if(loom.name==getPageSetting('dlowdmg'))return loom;}

function getHeirloomEff(name, type) {
  if (type == "staff") {
    if (getPageSetting('slot1modst') == name) return 5;
    else if (getPageSetting('slot2modst') == name) return 4;
    else if (getPageSetting('slot3modst') == name) return 3;
    else if (getPageSetting('slot4modst') == name) return 2;
    else if (getPageSetting('slot5modst') == name) return 1;
	else return 0;
  }
  else if (type == "shield") {
    if (getPageSetting('slot1modsh') == name) return 5;
    else if (getPageSetting('slot2modsh') == name) return 4;
    else if (getPageSetting('slot3modsh') == name) return 3;
    else if (getPageSetting('slot4modsh') == name) return 2;
    else if (getPageSetting('slot5modsh') == name) return 1;
	else return 0;
  }
}

function evaluateHeirloomMods2(loom, location) {

  var index = loom;
  var eff = 0;
  var name;
  var type;
  var rarity;
  var raretokeep = getPageSetting('raretokeep');
	if (raretokeep == 'Any' || raretokeep == 'Common') raretokeep = 0;
	else if (raretokeep == 'Uncommon') raretokeep = 1;
	else if (raretokeep == 'Rare') raretokeep = 2;
	else if (raretokeep == 'Epic') raretokeep = 3;
	else if (raretokeep == 'Legendary') raretokeep = 4;
	else if (raretokeep == 'Magnificent') raretokeep = 5;
	else if (raretokeep == 'Ethereal') raretokeep = 6;
	else if (raretokeep == 'Magmatic') raretokeep = 7;
	else if (raretokeep == 'Plagued') raretokeep = 8;

  if (location.includes('Equipped'))
    loom = game.global[location];
  else
    loom = game.global[location][loom];

  for (var m in loom.mods) {
    name = loom.mods[m][0];
    type = loom.type;
    rarity = loom.rarity;
    if (type == "Shield") {
      eff += getHeirloomEff(name, "shield");
    }
    if (type == "Staff") {
      eff += getHeirloomEff(name, "staff");
    }
    if (name == "empty" && type == "Shield") {
      if (getPageSetting('slot1modsh') == name) eff *= 4;
      if (getPageSetting('slot2modsh') == name) eff *= 4;
      if (getPageSetting('slot3modsh') == name) eff *= 4;
      if (getPageSetting('slot4modsh') == name) eff *= 4;
      if (getPageSetting('slot5modsh') == name) eff *= 4;
    }
    if (name == "empty" && type == "Staff") {
      if (getPageSetting('slot1modst') == name) eff *= 4;
      if (getPageSetting('slot2modst') == name) eff *= 4;
      if (getPageSetting('slot3modst') == name) eff *= 4;
      if (getPageSetting('slot4modst') == name) eff *= 4;
      if (getPageSetting('slot5modst') == name) eff *= 4;
    }
    if (rarity >= raretokeep) {
       eff *= 2;
    }
    else if (rarity < raretokeep) {
       eff = 1;
    }
  }
  return eff;
}

var worth3 = {'Shield': [], 'Staff': []};
function worthOfHeirlooms3(){
    worth3 = {'Shield': [], 'Staff': []};
    for (var index in game.global.heirloomsExtra) {
        var theLoom = game.global.heirloomsExtra[index];
        var data = {'location': 'heirloomsExtra', 'index': index, 'rarity': theLoom.rarity, 'eff': evaluateHeirloomMods2(index, 'heirloomsExtra')};
        worth3[theLoom.type].push(data);
    }
    var valuesort = function(a, b){return b.eff - a.eff;};
    worth3['Shield'].sort(valuesort);
    worth3['Staff'].sort(valuesort);
}

function autoheirlooms3() {

    if(!heirloomsShown && game.global.heirloomsExtra.length > 0){
        var originalLength = game.global.heirloomsCarried.length;
        for(var index=0; index < originalLength; index++) {
            selectHeirloom(0, 'heirloomsCarried');
            stopCarryHeirloom();
        }

	//CARRY
        var originalLength = game.global.heirloomsExtra.length;
        for(var index=0; index < originalLength; index++) {
            var theLoom = game.global.heirloomsExtra[index];
            if ((theLoom.protected) && (game.global.heirloomsCarried.length < game.global.maxCarriedHeirlooms)){
                selectHeirloom(index, 'heirloomsExtra');
                carryHeirloom();
                index--; originalLength--;
            }
        }

	//SHIELD
	if (getPageSetting('typetokeep') == 1) {
       		 while ((game.global.heirloomsCarried.length < game.global.maxCarriedHeirlooms) && game.global.heirloomsExtra.length > 0){
                        worthOfHeirlooms3();
                        if (worth3["Shield"].length > 0){
                            var carryshield = worth3["Shield"].shift();
                            selectHeirloom(carryshield.index, 'heirloomsExtra');
                            carryHeirloom();
                        }
                }
	}

	//STAFF
	else if (getPageSetting('typetokeep') == 2) {
       		 while ((game.global.heirloomsCarried.length < game.global.maxCarriedHeirlooms) && game.global.heirloomsExtra.length > 0){
                        worthOfHeirlooms3();
                        if (worth3["Staff"].length > 0){
                            var carrystaff = worth3["Staff"].shift();
                            selectHeirloom(carrystaff.index, 'heirloomsExtra');
                            carryHeirloom();
                        }
                }
	}

	//BOTH
	else if (getPageSetting('typetokeep') == 3) {
       		 while ((game.global.heirloomsCarried.length < game.global.maxCarriedHeirlooms) && game.global.heirloomsExtra.length > 0){
            		worthOfHeirlooms3();
            		if (worth3["Shield"].length > 0){
                	    var carryshield = worth3["Shield"].shift();
                	    selectHeirloom(carryshield.index, 'heirloomsExtra');
                            carryHeirloom();
              		}
                        worthOfHeirlooms3();
                        if (worth3["Staff"].length > 0){
                            var carrystaff = worth3["Staff"].shift();
                            selectHeirloom(carrystaff.index, 'heirloomsExtra');
                            carryHeirloom();
                        }
                }
	}
    }
}

//loom swapping

function lowHeirloom() {
	if (lowdmgshield() != undefined && game.global.ShieldEquipped.name != getPageSetting('lowdmg')) {
        selectHeirloom(game.global.heirloomsCarried.indexOf(loom), "heirloomsCarried", true);
        equipHeirloom();
	}
}
function dlowHeirloom() {
	if (dlowdmgshield() != undefined && game.global.ShieldEquipped.name != getPageSetting('dlowdmg')) {
        selectHeirloom(game.global.heirloomsCarried.indexOf(loom), "heirloomsCarried", true);
        equipHeirloom();
	}
}
function highHeirloom() {
	if (highdmgshield() != undefined && game.global.ShieldEquipped.name != getPageSetting('highdmg')) {
        selectHeirloom(game.global.heirloomsCarried.indexOf(loom), "heirloomsCarried", true);
        equipHeirloom();
	}
}
function dhighHeirloom() {
	if (dhighdmgshield() != undefined && game.global.ShieldEquipped.name != getPageSetting('dhighdmg')) {
        selectHeirloom(game.global.heirloomsCarried.indexOf(loom), "heirloomsCarried", true);
        equipHeirloom();
	}
}

//nu

function calcLoomNu(slot) {
	nuloom();
	var heirloom = getSelectedHeirloom();
	var tot = 0;
	var thisMod = heirloom.mods[slot];
	var dummyHeirloom = setupDummyHeirloom(heirloom, thisMod);
	tot = countPriceOfUpgrades(dummyHeirloom, heirloom.mods[slot][3]);
	var result = Math.floor(tot) + Math.floor(game.heirlooms.values[heirloom.rarity] / 2);
	if (isNumberBad(result)) return 0;
	return result;
}

function calcLoomNuInfinity(slot) {
	nuloom();
	var heirloom = getSelectedHeirloom();
	if (Math.ceil(getModUpgradeCost(heirloom, slot, 1)) != "Infinity") {
		return true;
	} else { 
		return false;
	}
}

function calcAutoNuRatio(slot) {
	nuloom();
	var heirloom = getSelectedHeirloom();
	
	//Shield
	if (heirloom.mods[slot][0] == "critChance")
		return 100;
	else if (heirloom.mods[slot][0] == "voidMaps")
		return 95;
	else if (heirloom.mods[slot][0] == "plaguebringer")
		return 85;
	else if (heirloom.mods[slot][0] == "trimpAttack")
		return 75;
	else if (heirloom.mods[slot][0] == "critDamage")
		return 54;
	else if (heirloom.mods[slot][0] == "trimpHealth")
		return 18;
	else if (heirloom.mods[slot][0] == "storageSize")
		return 7;
	else if (heirloom.mods[slot][0] == "trimpBlock")
		return 4;
	else if (heirloom.mods[slot][0] == "trainerEfficiency")
		return 2.8;
	else if (heirloom.mods[slot][0] == "breedSpeed")
		return 2;
	else if (heirloom.mods[slot][0] == "playerEfficiency")
		return 0.3;
	
	//Staff
	else if (heirloom.mods[slot][0] == "FluffyExp")
		return 100;
	else if (heirloom.mods[slot][0] == "fragmentsDrop")
		return 8;
	else if (heirloom.mods[slot][0] == "ExplorerSpeed")
		return 7;
	else if (heirloom.mods[slot][0] == "metalDrop")
		return 6;
	else if (heirloom.mods[slot][0] == "minerSpeed")
		return 5;
	else if (heirloom.mods[slot][0] == "woodDrop")
		return 1;
	else if (heirloom.mods[slot][0] == "LumberjackSpeed")
		return 0.8;
	else if (heirloom.mods[slot][0] == "foodDrop")
		return 0.2;
	else if (heirloom.mods[slot][0] == "FarmerSpeed")
		return 0.05;
	else if (heirloom.mods[slot][0] == "DragimpSpeed")
		return 0.04;
	else if (heirloom.mods[slot][0] == "gemsDrop")
		return 0.03;
	else if (heirloom.mods[slot][0] == "ScientistSpeed")
		return 0.03;
}

function nuRatio() {

    //Find Nu Ratio
	
    var slot1, slot1r, slot2, slot2r, slot3, slot3r, slot4, slot4r, slot5, slot5r, slot1spend, slot2spend, slot3spend, slot4spend, slot5spend;

    slot1 = calcLoomNuInfinity(0) ? calcLoomNu(0) : 0;
    slot2 = calcLoomNuInfinity(1) ? calcLoomNu(1) : 0;
    slot3 = calcLoomNuInfinity(2) ? calcLoomNu(2) : 0;
    slot4 = calcLoomNuInfinity(3) ? calcLoomNu(3) : 0;
    slot5 = calcLoomNuInfinity(4) ? calcLoomNu(4) : 0;

    var total = (slot1 + slot2 + slot3 + slot4 + slot5);
console.log("Total: " + total);

    slot1r = (slot1 != 0) ? (total / slot1) : 0;
    slot2r = (slot2 != 0) ? (total / slot2) : 0;
    slot3r = (slot3 != 0) ? (total / slot3) : 0;
    slot4r = (slot4 != 0) ? (total / slot4) : 0;
    slot5r = (slot5 != 0) ? (total / slot5) : 0;

    var totalr = (slot1r + slot2r + slot3r + slot4r + slot5r);
    if (totalr <= 0)
        totalr = 1;
console.log("Total Ratio: " + totalr);


    //Find Player ratio
	
    if (getPageSetting('autonu') == true && getPageSetting('rationu') == 1 && getPageSetting('heirloomnu') != undefined) { 
	slot1spend = (getPageSetting('slot1nu') > 0 && calcLoomNuInfinity(0)) ? getPageSetting('slot1nu') : 0;
	slot2spend = (getPageSetting('slot2nu') > 0 && calcLoomNuInfinity(1)) ? getPageSetting('slot2nu') : 0;
	slot3spend = (getPageSetting('slot3nu') > 0 && calcLoomNuInfinity(2)) ? getPageSetting('slot3nu') : 0;
	slot4spend = (getPageSetting('slot4nu') > 0 && calcLoomNuInfinity(3)) ? getPageSetting('slot4nu') : 0;
	slot5spend = (getPageSetting('slot5nu') > 0 && calcLoomNuInfinity(4)) ? getPageSetting('slot5nu') : 0;
	}
	
    if (getPageSetting('autonu') == true && getPageSetting('rationu') == 0 && getPageSetting('heirloomnu') != undefined) { 
	slot1spend = (calcLoomNuInfinity(0)) ? calcAutoNuRatio(0) : 0;
	slot2spend = (calcLoomNuInfinity(1)) ? calcAutoNuRatio(1) : 0;
	slot3spend = (calcLoomNuInfinity(2)) ? calcAutoNuRatio(2) : 0;
	slot4spend = (calcLoomNuInfinity(3)) ? calcAutoNuRatio(3) : 0;
	slot5spend = (calcLoomNuInfinity(4)) ? calcAutoNuRatio(4) : 0;
	}
	
    var totalspend = (slot1spend + slot2spend + slot3spend + slot4spend + slot5spend);
    if (totalspend <= 0)
        totalspend = 1;
console.log("Total Spend Ratio: " + totalspend);

    if (totalspend > 0 && totalr > 0) {
    var ratio = totalspend / totalr;
    slot1r = (slot1r / ratio);
    slot2r = (slot2r / ratio);
    slot3r = (slot3r / ratio);
    slot4r = (slot4r / ratio);
    slot5r = (slot5r / ratio);
    }

    //Find Next Spend
    var dickmunch = "suck my balls";
    return dickmunch;	
}
