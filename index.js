
const us = document.getElementById("username");
const sn = document.getElementById("seatnumber");
let bookingcounter = 0;
const searchInput = document.getElementById("inp1");



window.addEventListener('DOMContentLoaded',(event)=>{
    event.preventDefault();
  
      axios.
      get("https://crudcrud.com/api/e221cfd04f0d4937812ad6ef97abeb25/movie")
      .then((res)=>{ 
        bookingcounter=res.data.length;
        totalBooked(bookingcounter);
          for(let i = 0 ; i < res.data.length;i++){
            displayBooking(res.data[i]);
          }
      })
      .catch((er)=>console.log(er));
})

searchInput.addEventListener("input",searchByName);

function searchByName(){
  const name = searchInput.value;
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  axios
  .get("https://crudcrud.com/api/e221cfd04f0d4937812ad6ef97abeb25/movie")
  .then((res)=>{
    
    const filtered = res.data.filter((item)=>{
      return item.username.includes(name)
    });
    
    filtered.forEach(displayBooking);

   console.log(filtered);

  })

  .catch(err=>console.log(err));
}


function handleFormSubmit(event)
{
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        seatnumber: event.target.seatnumber.value,
    };
   
    axios
    .post("https://crudcrud.com/api/e221cfd04f0d4937812ad6ef97abeb25/movie",userDetails)
    .then((res)=>{ 
      bookingcounter++;
      totalBooked(bookingcounter);
      displayBooking(res.data)}
    )
    .catch((er)=>{alert("fatal error",er)});
    
    us.value = "";
    sn.value = "";
}

function displayBooking(userDetails){
    const userList = document.createElement('li');
    userList.textContent = `${userDetails.username} ${userDetails.seatnumber}  `;
    const delBtn = document.createElement('button');
    delBtn.textContent = "DEL";
    userList.appendChild(delBtn);
    editBtn = document.createElement('button');
    editBtn.textContent = "EDIT";
    userList.appendChild(editBtn);
    const ul = document.querySelector("ul");
    ul.appendChild(userList);

    delBtn.addEventListener('click',(event)=>{
      event.preventDefault();
      deletefunc(userList,userDetails);
    })

    editBtn.addEventListener('click',(event)=>{
      event.preventDefault();
      editslot(userList,userDetails);
    })
}



function totalBooked(count){
  const cnt = document.getElementById('bookingCount');
  cnt.textContent=count;
}

function editslot(userList,userDetails){
  us.value = userDetails.username;
  sn.value = userDetails.seatnumber;
  deletefunc(userList,userDetails);
}

function deletefunc(userList,userDetails){
 axios.
 delete(`https://crudcrud.com/api/e221cfd04f0d4937812ad6ef97abeb25/movie/${userDetails._id}`)
 .then((res)=>{bookingcounter--;
   userList.remove();
  totalBooked(bookingcounter);
  console.log("deleted");})
 .catch((er)=>console.log(err))

}
