///////////Global variable
let ToDoArray=[];

///////////function define///////////
  function register_events(){    



  const addBtn=document.getElementById("add-To-Do");
  const editBtn=document.getElementById("edit-To-Do");
  const cancelBtn=document.getElementById("cancel-To-Do");
  const listContainer=document.getElementById('To-Do-List');

  if(!addBtn)return ;
  addBtn.addEventListener("click",additemInput);
 // listContainer.addEventListener("click",updateAction);
 // editBtn.addEventListener("click",updateitemInput);
 // cancelBtn.addEventListener("click",cancelEdit);
   
  
}

////////////////////////
function storeInLocal(){
localStorage.setItem("ToDoArray",JSON.stringify(ToDoArray));
}

register_events();
/////////////////////////
  function cancelEdit(e){

    const addBtn=document.getElementById("add-itemInput");
    const editBtn=document.getElementById("edit-itemInput");
    const cancelBtn=document.getElementById("cancel-edit");
    const itemInputInput =document.getElementById("item");

    editBtn.style.display="none";
    addBtn.style.display="initial";
    cancelBtn.style.display="none";
    itemInputInput.value="";


  }

////////////////////////////////============itemInput input============
function additemInput(e){
let Input =document.getElementById("item");
let itemInput =Input.value;
console.log(itemInput);

let item={
  value:itemInput,
  status:"To-do"//Doing //Done
};
let d = new Date();
let time = d.getTime();
  
ToDoArray.push({
    id:time,
    ...item
  }) 

  

console.log(ToDoArray);
  Input.value="";
  updateUi();
}

///////////////////////////////////
  function renderList(ToDoArray){
  const listContainer=document.getElementById('To-Do-List');
  let listHtml="";
  let i=1;
  for(let item of ToDoArray)
  {
    if(item.status=="To-do")
    listHtml+=`
    <div id="item-${item.id}" class="item">
     <div class="item-value">

      <span ><input type="checkbox" name="status" id="done" value="Done"></span> 
      <span >${i}.</span> 
      <span >${item.value}</span> 
     </div> 

    <div id="buttons">
    <span>
      <button id="start">Start</button>&nbsp
      <button id="delete">Delete</button>&nbsp 
      <button id="edit">Edit</button>
    </span>
    </div>
    </div>`

    else if( item.status=="Doing")
    listHtml+=`
    <div id="item-${item.id}" class="item">
     <div class="item-value">
      <span >${item.value}</span> 
     </div> 

    <div id="buttons">
    <span>
      <button id="start">Resume</button>&nbsp
      <button id="delete">Delete</button>&nbsp 
      <button id="edit">Edit</button>
    </span>
    </div>
    </div>`
    i++;
  }

  listContainer.innerHTML=listHtml;
  // storeInLocal();
}
///////////////////////////////////
function updateUi()
{
 renderList(ToDoArray);
}
// ////////////////////////////////////
// function updateAction(e)
// {
//  //(e.target.parentElement.parentElement.id);
//  if(e.target.id==="delete")
//  deleteItem(e.target);
// else if(e.target.id==="edit")
// {
//   editItem(e.target);
// }
// }

// function getItemId(item){
//   const parent=item.parentElement.parentElement.parentElement;
//   const index=parent.id;
//   const  idSplit=index.split("-");
//   const itemId=parseInt(idSplit.pop()); 
//   return itemId;
// }
///////////////////////////////////
// function deleteItem(item)
// {
//   const itemId=getItemId(item);
//    //parent.remove();
//   ToDoArray=ToDoArray.filter(item=>item.id!==itemId);
  
//   renderList(ToDoArray);
//   updateCalculation();
// } 

/////////////////////////////
// function updateitemInput(e){
//  const itemId=editState.id;
//  const transectionItem=ToDoArray.find(item=>item.id===itemId);

//  const itemInputInput =document.getElementById("itemInput");

//  const itemInput=parseInt(itemInputInput.value);

 
//  if(itemInput<0)
//  {
//   transectionItem.type="expense";
//   transectionItem.value=Math.abs(itemInput) ;
//  }
// else {
//   transectionItem.type="income";
//   transectionItem.value=itemInput ;
// }


//  let transectionIndex=ToDoArray.findIndex(item=>item.id===itemId);
  
//   ToDoArray[transectionIndex]=transectionItem;

  
//   renderList(ToDoArray);
//   updateCalculation();

//   const addBtn=document.getElementById("add-itemInput");
//   const editBtn=document.getElementById("edit-itemInput");
//   const cancelBtn=document.getElementById("cancel-edit");

//   editBtn.style.display="none";
//   addBtn.style.display="initial";
//   cancelBtn.style.display="none";
//   itemInputInput.value="";
//   editState={
//     id:-1,
//   enabled:false
//   }
// }

// function editItem(item){

//   const editBtn=document.getElementById("edit-itemInput");
//   editBtn.style.display="initial";
//   const cancelBtn=document.getElementById("cancel-edit");
//   cancelBtn.style.display="initial";
//   const addBtn=document.getElementById("add-itemInput");
//   addBtn.style.display="none";
//   const  itemId=getItemId(item);
//   const transectionItem=ToDoArray.find(item=>item.id===itemId);
  
  
//   let itemInputInput =document.getElementById("itemInput");
 
//   if(transectionItem.type==="expense")
//   {
//     itemInputInput.value=-1*transectionItem.value;
//   }
//   else 
//   itemInputInput.value=transectionItem.value;

//   editState={
//     ...editState,
//     id:itemId,
//     enabled:true
//   }

// }
// function populateFromLocal(){
//   const itemString=localStorage.getItem("ToDoArray");
//   if(itemString){
//     const items=JSON.parse(itemString);
//     ToDoArray=[...items];
//     renderList(ToDoArray);
//     updateCalculation();
//   }
// }
// populateFromLocal();
// register_events();