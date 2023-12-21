///////////Global variable
let ToDoArray=[];

///////////function define///////////
  function register_events(){    



  const addBtn=document.getElementById("add-To-Do");
  const editBtn=document.getElementById("edit-To-Do");
  const cancelBtn=document.getElementById("cancel-To-Do");
  const listContainer=document.getElementById('To-Do-List');
   editBtn.style.display="none";
   cancelBtn.style.display="none";

  if(!addBtn) 
  return ;
  addBtn.addEventListener("click",additemInput);
   listContainer.addEventListener("click",updateAction);
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
let status=document.getElementById("status");
let statusValue=status.value;

let item={
  value:itemInput,
  status:statusValue //To-do//Doing //Done
};

let d = new Date();
let time = d.getTime();
  
ToDoArray.push({
    id:time,
    ...item
  }) 

  


  Input.value="";
  status.value="To-do";
  storeInLocal();
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

      <span ><img src="images/checkbox-empty1.svg" height="13px" width="13px" name="status" id="done"  >
      </span> 
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
     <span ><img src="images/checkbox-empty1.svg" height="13px" width="13px" name="status" id="done"  ></span> 
      <span >${i}.</span> 
      <span ><u>${item.value}</u></span> 
     </div> 

    <div id="buttons">
    <span>
      <span id="doing">Doing</span>&nbsp
      <button id="delete">Delete</button>&nbsp 
      <button id="edit">Edit</button>
    </span>
    </div>
    </div>`

    else if( item.status==="Done")
    listHtml+=`
    <div id="item-${item.id}" class="item">
    
     <div class="item-value">
     <span ><img src="images/checkbox-checked1.svg" height="13px" width="13px" name="status" id="un-done"  ></span>
      <span >${i}.</span> 
      <span >${item.value}</span> 
     </div> 

    <div id="buttons">
    <span>
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
 function updateAction(e)
 {
    
    updateStatus(e.target);

 }

 /////////////////////
 function getTaskId(task)
 {
  const parentId=task.parentElement.parentElement.parentElement.id;
  const splitId=parentId.split("-");
  const taskId=parseInt(splitId.pop());
  return taskId;
 }

 //////////////////////
 function updateStatus(task)
 {
    
     let taskId=getTaskId(task);
     

     if(task.id==="start")
     {
      let taskItem=ToDoArray.find(item=>item.id===taskId);
     
      taskItem.status="Doing";
      let taskIndex=ToDoArray.findIndex(item=>item.id===taskItem.id);
      ToDoArray[taskIndex]=taskItem;
      renderList(ToDoArray);
     
     }

     else if(task.id==="done")
     {
      let taskItem=ToDoArray.find(item=>item.id===taskId);
      taskItem.status="Done";
      let taskIndex=ToDoArray.findIndex(item=>item.id===taskItem.id);
      ToDoArray[taskIndex]=taskItem;
      renderList(ToDoArray);
     
    
     }

     else if(task.id=="delete")
     {
        ToDoArray=ToDoArray.filter(item=>item.id!==taskId);
        renderList(ToDoArray);
       
     }

     else if(task.id=="edit")
     {
      const addBtn=document.getElementById("add-To-Do");
      const editBtn=document.getElementById("edit-To-Do");
      const cancelBtn=document.getElementById("cancel-To-Do");
      editBtn.style.display="initial";
      cancelBtn.style.display="initial";
      addBtn.style.display="none";

      let taskItem=ToDoArray.find(item=>item.id===taskId);
      let Input =document.getElementById("item");
      Input.value=taskItem.value;
       let status=document.getElementById("status");
       status.value=taskItem.status;
       
       editBtn.addEventListener("click",()=>{

        let newInput =document.getElementById("item");
        let newStatus=document.getElementById("status");
        
        taskItem.id=taskId;
        console.log("edit:"+taskItem.id);
        taskItem.value=newInput.value;
        taskItem.status=newStatus.value;
 
 
       let taskIndex=ToDoArray.findIndex(item=>item.id===taskItem.id);
       ToDoArray[taskIndex]=taskItem;
       renderList(ToDoArray);
       
       Input.value="";
       status.value="To-do";

       editBtn.style.display="none";
       cancelBtn.style.display="none";
       addBtn.style.display="initial";

       

       });

      cancelBtn.addEventListener("click",()=>{
        Input.value="";
        status.value="To-do";
 
        editBtn.style.display="none";
        cancelBtn.style.display="none";
        addBtn.style.display="initial";
      })

      

     }

     storeInLocal();
     return ;

 }

function storeInLocal()
{
  localStorage.setItem("to-do-array",JSON.stringify(ToDoArray));
}

 function populateFromLocal(){
   const itemString=localStorage.getItem("to-do-array");
  if(itemString){
    const items=JSON.parse(itemString);
    ToDoArray=[...items];
    renderList(ToDoArray);
  }
}
populateFromLocal();

////////////////////// The End :') 