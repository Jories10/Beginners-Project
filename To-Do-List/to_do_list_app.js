const body = document.body;
const inputTask = document.getElementById('task');
const taskContainer = document.querySelector('.task-container-hidden');
const ul = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task');

function taskListEmpty(){
    if(ul.childElementCount === 0){
        taskContainer.classList.remove('task-container-show');
    }else{
        taskContainer.classList.add('task-container-show');
    }
}

addTaskBtn.addEventListener('click', ()=>{
    let validateInputTask = inputTask.value;

    if(!validateInputTask){
        alert("Please enter your task before saving it!");
        return;
    }   
        const li = document.createElement('li');
        li.textContent = inputTask.value.trim();
        
        const removeTask = document.createElement('button');
        removeTask.textContent = '❌';
        removeTask.className = 'remove-task';

      
        const doneTask = document.createElement('button');
        doneTask.textContent = '✔️';
        doneTask.className = 'done-task';

        const undone = document.createElement('button');
        undone.textContent = '↩️';
        undone.className = 'undoneTask';

        li.append(undone,removeTask, doneTask);
        ul.appendChild(li);

        handleButtons(doneTask, removeTask,undone, ul, li);
        taskListEmpty();

        inputTask.value = '';
});

function handleButtons(done, remove,undone, parent, child){
     undone.addEventListener('click', function(e){
            let target = e.target;
            target.parentNode.style.textDecoration = 'none';
     });

     
     remove.addEventListener('click', ()=>{
             parent.removeChild(child);
             taskListEmpty();
     });

     done.addEventListener('click', (e)=>{
            let target = e.target;
            target.parentNode.style.textDecoration = 'line-through';
            target.parentNode.style.textDecorationColor = 'black';
            target.parentNode.style.textDecorationThickness = '5px';
            console.log('clicked');
    });
}



const div = document.createElement('div');
div.className = 'animation-container';
body.appendChild(div);

const storage = [];

// Create 30 hearts
for (let i = 0; i < 30; i++) {
  const heart = document.createElement('div');
  heart.textContent = '🖤';

  // Random starting position
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  // Random speed and direction
  let dx = (Math.random() - 0.5) * 4; // between -2 and 2
  let dy = (Math.random() - 0.5) * 4;

  // Store heart with its movement data
  storage.push({ heart, x, y, dx, dy });
  div.appendChild(heart);
}

function animateHearts() {
  storage.forEach(obj => {
    obj.x += obj.dx;
    obj.y += obj.dy;

    // Bounce off edges
    if (obj.x < 0 || obj.x > window.innerWidth - 50) obj.dx *= 1;
    if (obj.y < 0 || obj.y > window.innerHeight - 50) obj.dy *= -1;

    // Apply new position
    obj.heart.style.left = obj.x + "px";
    obj.heart.style.top = obj.y + "px";
  });

  requestAnimationFrame(animateHearts);
}

// Start animation
animateHearts();

