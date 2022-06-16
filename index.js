const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const HomeTeamYear2014 = fifaData.filter((element) => {
    return element.Year === 2014;
});


const HomeTeamName2014 = HomeTeamYear2014.filter((element) => {
    return element['Home Team Name'];
});

const HomeTeamNameFinal2014 = HomeTeamName2014.filter((element) => {
    return element.Stage === 'Final';
});


//(b) Away Team name for 2014 world cup final
const AwayTeamYear2014 = fifaData.filter((element) => {
    return element.Year === 2014;
});

const AwayTeamName2014 = AwayTeamYear2014.filter((element) => {
    return element['Away Team Name'];
});

const AwayTeamNameFinal2014 = AwayTeamName2014.filter((element) => {
    return element.Stage === 'Final';
});


//(c) Home Team goals for 2014 world cup final
const HomeTeamGoals = HomeTeamNameFinal2014.filter((element) => {
    return element["Home Team Goals"];
});
//(d) Away Team goals for 2014 world cup final
const AwayTeamGoals = AwayTeamNameFinal2014.filter((element) => {
    return element["Away Team Goals"];
});

//(e) Winner of 2014 world cup final */
/*
const Winner2014 = HomeTeamName2014.filter((element) => {
    if(element["Win conditions"] !== ""){
        return element
    }
});

console.log(Winner2014.length)
*/

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(ArrayFifa) {
    const FinalsOnly = ArrayFifa.filter((element) => {
       return element['Stage'] === 'Final';
       
    });
    return FinalsOnly
 }

console.log('Finals: ',getFinals(fifaData).length)
//console.log(fifaData.length)

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(ArrayFifa,getFinalsFunction) {
    const years = getFinalsFunction(ArrayFifa).map((element) => {
        return element.Year
    });
    return years
}
console.log("Years: ", getYears(fifaData,getFinals).length)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(ArrayFifa, getFinalsFunction) {
    const winners = [];
    const filterwinners = getFinalsFunction(ArrayFifa).filter((element) => {
        if(element["Home Team Goals"] > element["Away Team Goals"]){
            return winners.push(element["Home Team Name"]);
        } 
        else if(element["Away Team Goals"] > element["Home Team Goals"]) {
            return winners.push(element["Away Team Name"]);
        }
    });
    return winners;
}


console.log('Winners: ',getWinners(fifaData, getFinals).length);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(ArrayFifa, FunctiongetFinals, FunctiongetYears, FunctiongetWinners) {
    const FinalArray = [];
    for(let i = 0; i < FunctiongetYears(ArrayFifa,FunctiongetFinals).length; i++){
        FinalArray[i] = "In " + FunctiongetYears(ArrayFifa, FunctiongetFinals)[i] + ", " + FunctiongetWinners(ArrayFifa, FunctiongetFinals)[i] + " won the world cup!"
    }
    return (FinalArray)
}
//console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(GetFinalsFunction) {
    let Total = [];
    let Average = 0;
    let initialValue = 0;
    const TotalHomeAwayGoals = GetFinalsFunction.filter((element,index) => {
        Total[index] = element["Home Team Goals"] + element["Away Team Goals"]
        initialValue += Total[index]
        Average = initialValue/Total.length
    });
    return Average.toFixed(2)
 }


console.log(getAverageGoals(getFinals(fifaData)));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(FifaArray,TeamInitials) {
    let Total = 0
    const winners = [];
    const Initials = FifaArray.filter((element,index) => {
        if(element["Home Team Goals"] > element["Away Team Goals"]){
            return winners.push(element["Home Team Initials"]);
        } 
        else if(element["Away Team Goals"] > element["Home Team Goals"]) {
            return winners.push(element["Away Team Initials"]);
        }
    });

    for(let i = 0; i < winners.length; i++){
        if(TeamInitials === winners[i]){
            Total += 1;
        }
    }
    //solution found 

    return Total

}
//console.log(getCountryWins(fifaData,'BRA'));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(FifaArray) {
const HomeInitials = [];
const AwayInitials = [];
const Everything = {};
let AllTeamInitials = [];
let TeamInitials = [];


//const TeamInitials = [];
//Figure out every country by putting each name in an array and then getting rid of the duplicates. 
//Object (team name), key = the goals they scored
const HomeTeamInitials = FifaArray.filter((element)=>{
    return HomeInitials.push(element["Home Team Initials"])
});

const AwayTeamInitials = FifaArray.filter((element)=>{
    return AwayInitials.push(element["Away Team Initials"]);
});

TeamInitials = HomeInitials.concat(AwayInitials)
AllTeamInitials = [...new Set(TeamInitials)]

/*
for(let i = 0; i < AllTeamInitials.length; i ++){
    let Total = 0;
    for(let k = 0; k < FifaArray.length; k++){
        if(AllTeamInitials[i] === FifaArray[k]["Home Team Initials"]){
            Total += FifaArray[k]["Home Team Goals"];
            Everything.AllTeamInitials[i] = Total;
        }
        else if(AllTeamInitials[i] === FifaArray[k]['Away Team Initials']){
            Total += FifaArray[k]["Away Team Goals"];
            Everything.AllTeamInitials[i] = Total;
        }
    }

    
}
*/
return AwayInitials

}

console.log(getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense() {

    

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
