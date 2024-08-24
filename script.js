const checkBoxList= document.querySelectorAll('.custom-checkbox')

const allinputs= document.querySelectorAll('.input-goal')

const progressBarLabel=document.querySelector('.progress-bar')

const progressValue=document.querySelector('.progress-value')

const progressLabel=document.querySelector('.progress-label')

let allQuotes = [
   'Raise the bar by completing yours goals!',
   'Well begun is half done!',
   'Just a step away, keep going!',
   'wow! You just completed all the goals,time for chill :-)',
]


const allGoals= JSON.parse( localStorage.getItem('allGoals') )     ||      { 
first:{
   name:'',
   completed:false,
},
second:{
   name:'',
   completed:false,
},
third:{
   name:'',
   completed:false,
},
}
   let completedGoalsCount=Object.values(allGoals).filter((goals)=>goals.completed).length
progressValue.style.width=`${completedGoalsCount/3*100}%`
 progressValue.firstElementChild.innerText=`${completedGoalsCount}/3 completed`  
 
 progressLabel.innerText = allQuotes[completedGoalsCount]


checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{

       const allFeilsInput=[...allinputs].every((input)=>{
        return input.value
       })
         if(allFeilsInput){
            checkbox.parentElement.classList.toggle('completed')

            

           const inputId=checkbox.nextElementSibling.id
           allGoals[inputId].completed=!allGoals[inputId].completed
          
           completedGoalsCount=Object.values(allGoals).filter((goals)=>goals.completed).length
           progressValue.style.width=`${completedGoalsCount/3*100}%`
           progressValue.firstElementChild.innerText=`${completedGoalsCount}/3 completed`
           progressLabel.innerText = allQuotes[completedGoalsCount]

           localStorage.setItem('allGoals',JSON.stringify(allGoals))


         }
       else{
        progressBarLabel.classList.add('show-error')
       }
    
    })
})
allinputs.forEach((input)=>{
    input.value=allGoals[input.id].name
  
 if(allGoals[input.id].completed){
  input.parentElement.classList.add('completed')
  }

 input.addEventListener('focus',(e)=>{
    progressBarLabel.classList.remove('show-error')
 })

input.addEventListener('input',(e)=>{
 if(allGoals[input.id].completed){
   e.target.value= allGoals[input.id].name
   return
 }

   allGoals[input.id]={
     name:  e.target.value,
   completed:false}
   localStorage.setItem('allGoals',JSON.stringify(allGoals))
})

})
