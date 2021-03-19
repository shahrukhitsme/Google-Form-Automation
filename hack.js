//Automate a google form to fill in as many responses as many there are items in the data, using nodejs and seleniuum

var webdriver = require('selenium-webdriver');
  By = webdriver.By,
  until = webdriver.until,
  Key = webdriver.Key,
  Actions = webdriver.Actions;
  

  var fs = require("fs");
const { elementIsDisabled } = require('selenium-webdriver/lib/until');
const { cpuUsage } = require('process');
  console.log("\n *START* \n");
  var contents = fs.readFileSync("data.json");
  var data = JSON.parse(contents);
  
console.log(data.length);

let paths = {
  "email": {
    "type":"text",
    "value": '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div[1]/input'
  },
  "gender": {
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[2]/label/div/div[1]',
    2: '//*[@id="i9"]/div[3]/div'
  },
  "age":{
    "type":"radio",
    1: '//*[@id="i22"]/div[3]/div',
    2: '//*[@id="i25"]/div[3]/div',
    3: '//*[@id="i28"]/div[3]/div',
    4: '//*[@id="i31"]/div[3]/div',
    5: '//*[@id="i34"]/div[3]/div'
  },
  "experience":{
    "type":"radio",
    1: '//*[@id="i41"]/div[3]/div',
    2: '//*[@id="i44"]/div[3]/div',
    3: '//*[@id="i47"]/div[3]/div',
    4: '//*[@id="i50"]/div[3]/div'
  },
  "jobSecurity":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[2]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[2]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[2]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[2]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[2]/span/div[6]/div/div/div[3]/div'
  },
  "careerDev":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[4]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[4]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[4]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[4]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[4]/span/div[6]/div/div/div[3]/div'
  },
  "higherEd":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[6]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[6]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[6]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[6]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[6]/span/div[6]/div/div/div[3]/div'
  },
  "rewards":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[8]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[8]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[8]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[8]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[8]/span/div[6]/div/div/div[3]/div'
  },
  "promotion":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[10]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[10]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[10]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[10]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[5]/div/div/div[2]/div/div[1]/div/div[10]/span/div[6]/div/div/div[3]/div'
  },
  "respect":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[2]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[2]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[2]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[2]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[2]/span/div[6]/div/div/div[3]/div'
  },
  "appreciation":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[4]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[4]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[4]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[4]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[4]/span/div[6]/div/div/div[3]/div'
  },
  "suggestions":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[6]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[6]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[6]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[6]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[6]/div/div/div[2]/div/div[1]/div/div[6]/span/div[6]/div/div/div[3]/div'
  },
  "incentives":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[2]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[2]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[2]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[2]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[2]/span/div[6]/div/div/div[3]/div'
  },
  "compensation":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[4]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[4]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[4]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[4]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[4]/span/div[6]/div/div/div[3]/div'
  },
  "overtime":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[6]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[6]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[6]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[6]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[6]/span/div[6]/div/div/div[3]/div'
  },
  "salaryStructure":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[8]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[8]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[8]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[8]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[8]/span/div[6]/div/div/div[3]/div'
  },
  "bonus":{
    "type":"radio",
    1: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[10]/span/div[2]/div/div/div[3]/div',
    2: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[10]/span/div[3]/div/div/div[3]/div',
    3: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[10]/span/div[4]/div/div/div[3]/div',
    4: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[10]/span/div[5]/div/div/div[3]/div',
    5: '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[7]/div/div/div[2]/div/div[1]/div/div[10]/span/div[6]/div/div/div[3]/div'
  },
  "training":{
    "type":"radio",
    1: '//*[@id="i69"]/div[3]/div',
    2: '//*[@id="i72"]/div[3]/div'
  },
  "factorsForStay":{
    "type":"check",
    1: '//*[@id="i80"]/div[2]',
    2: '//*[@id="i83"]/div[2]',
    3: '//*[@id="i86"]/div[2]',
    4: '//*[@id="i89"]/div[2]',
    5: '//*[@id="i92"]/div[2]',
    6: '//*[@id="i95"]/div[2]',
    7: '//*[@id="i98"]/div[2]',
    8: '//*[@id="i101"]/div[2]',
    9: '//*[@id="i104"]/div[2]'
  },
  "factorsForLeaving":{
    "type":"check",
    1: '//*[@id="i112"]/div[2]',
    2: '//*[@id="i115"]/div[2]',
    3: '//*[@id="i118"]/div[2]',
    4: '//*[@id="i121"]/div[2]'
  },
  "supportWorkingSystem":{
    "type":"radio",
    1: '//*[@id="i131"]/div[3]/div',
    2: '//*[@id="i134"]/div[3]/div',
    3: '//*[@id="i137"]/div[3]/div',
    4: '//*[@id="i140"]/div[3]/div',
    5: '//*[@id="i143"]/div[3]/div'
  },
  "responsibility":{
    "type":"radio",
    1: '//*[@id="i150"]/div[3]/div',
    2: '//*[@id="i153"]/div[3]/div',
    3: '//*[@id="i156"]/div[3]/div',
    4: '//*[@id="i159"]/div[3]/div',
    5: '//*[@id="i162"]/div[3]/div'
  },
  "morale":{
    "type":"radio",
    1: '//*[@id="i169"]/div[3]/div',
    2: '//*[@id="i172"]/div[3]/div',
    3: '//*[@id="i175"]/div[3]/div',
    4: '//*[@id="i178"]/div[3]/div',
    5: '//*[@id="i181"]/div[3]/div'
  },
  "participation":{
    "type":"radio",
    1: '//*[@id="i188"]/div[3]/div',
    2: '//*[@id="i191"]/div[3]/div',
    3: '//*[@id="i194"]/div[3]/div',
    4: '//*[@id="i197"]/div[3]/div',
    5: '//*[@id="i200"]/div[3]/div'
  },
  "custom": {
    "type":"text",
    "value": '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[15]/div/div/div[2]/div/div[1]/div[2]/textarea'
  }
};

let submitButtonPath = '//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div/div/span';
let submitAnotherResponse = '/html/body/div[1]/div[2]/div[1]/div/div[4]/a';


(async function example() {
  let driver = await new webdriver.Builder().forBrowser('chrome').build();
  try {
    driver.get('https://docs.google.com/forms/d/e/1FAIpQLSeb8Vy-JELYMFJ3c1l2GXAZfd-VpNdw9hF4SDAPOfqC9FJIlw/viewform');
    for(let iter=0; iter<data.length; iter++){
      await driver.wait(until.elementLocated(By.xpath(paths["email"]["value"])),10000);
      let data2 = data[iter];
      for(let key in paths){
        console.log("Key",key);
        let details = paths[key];
        console.log(details["type"]);
        if(details["type"]=="text"){
          console.log("eheh");
          driver.findElement(By.xpath(paths[key]["value"])).sendKeys(data2[key]);
        }
        else if(details["type"]=="check"){
          let checkBoxesToClick = data2[key];
          let pathsForChk = paths[key];
          let visited = [];
          for(let i=0; i<checkBoxesToClick.length; i++){
            let num = checkBoxesToClick.charAt(i);
            if(visited[num])
              continue;
            visited[num] = true;
            console.log("Checkbox ", key, num, typeof(num), pathsForChk[num.toString()]);
            driver.findElement(By.xpath(pathsForChk[num.toString()])).click();  
          }
        }
        else{ //radio
          let radioToClick = data2[key];
          console.log("peheh");
          driver.findElement(By.xpath(paths[key][radioToClick])).click();
        }
      }
      await driver.findElement(By.xpath(submitButtonPath)).click();
      await driver.wait(until.elementLocated(By.xpath(submitAnotherResponse)),10000);
      driver.findElement(By.xpath(submitAnotherResponse)).click();  
    }
  } finally {
    //await driver.quit();
  }
})();