//1.1
//selectors
const main=document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionaresBtn = document.getElementById('show-millionares')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')




// 1.11 initial setup
let data=[];
getRandomUser()
getRandomUser()
getRandomUser()



//1.2
//fetch random user and money
async function getRandomUser(){
    const res= await fetch('https://randomuser.me/api')
    const data=await res.json()

    const user=data.results[0];

    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }

    addData(newUser)
}


//1.3
//add new object to data arr
function addData(obj){
    data.push(obj)

    updateDOM()
}


//1.4
//update DOM
function updateDOM(providedData=data){
    //clear main div
    main.innerHTML ='<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach((item)=>{
        const element=document.createElement('div')
        element.classList.add('person')
        element.innerHTML=`<strong>${item.name} </strong> ${formatMoney(item.money)}`

        main.appendChild(element)
    })
}


//1.5
//format number as money
//expression taken from soverflow
function formatMoney(number){
    return '₹ '+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//1.6
//double everyones money
function doubleMoney(){
    data=data.map((user)=>{
        return {
            ...user,
            money:user.money*2
        }
    })

    updateDOM()
}

//1.7
//sort
function sortByRichest(){
    data.sort((a,b)=>{
        return b.money-a.money
    })

    updateDOM()
}


//1.8 
//filter
function showMillionares(){
    data=data.filter((item)=>{
        return item.money>1000000
    })

    updateDOM()
}

//1.9
//reduce
//calculate total wealth
function calcEntireWealth(){
    wealth=data.reduce((acc,item)=>{
        return acc+item.money;
    },0)
    console.log(wealth)

    const wealthEl=document.createElement('div')
    wealthEl.innerHTML = `<h3>Total wealth :<strong>${formatMoney(wealth)}</h3>`
    main.appendChild(wealthEl)
}


//1.10
//add user event listener
addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionaresBtn.addEventListener('click', showMillionares)
calculateWealthBtn.addEventListener('click', calcEntireWealth)