// Your code here
document.addEventListener("DOMContentLoaded",()=>{
    
    displayContent()
})



function displayContent(){
    const bar=document.getElementById("character-bar")
    bar.innerHTML=""
   
    fetch("http://localhost:3000/characters")
    .then(res=>res.json())
    .then(characters=>characters.forEach(character=> {
        const span = document.createElement("span")
        bar.appendChild(span)
        span.innerText=character.name
        span.addEventListener("click",function displayDetails(){
            const details=document.getElementById("detailed-info")
            const name= document.getElementById("name")
            const image=document.getElementById("image")
            const votes= document.getElementById("vote-count")
            name.innerText=character.name
            image.src=character.image
            votes.innerText=character.votes


            const submit= document.getElementById("votes-form")
            const addedVotes=document.getElementById("votes")
            submit.onsubmit=null
            submit.onsubmit=function(e){
                e.preventDefault();
                const newVotes=parseInt(votes.innerText)+parseInt(addedVotes.value)
                fetch(`http://localhost:3000/characters/${character.id}`,{
                    method:"PATCH",
                    headers:{
                            "Content-Type": "application/json",
                            "Accept": "application/json"},
                    body:JSON.stringify({votes:newVotes})
                      })
                      .then(response => response.json())
                      .then(updatedCharacter => {
                          
                        document.getElementById("vote-count").innerText = updatedCharacter.votes;
                          addedVotes.value = ""
                      })
                      
                
            }

        })
     })
    )}
