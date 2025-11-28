const inputText = document.getElementById('calculation');
const btns = document.querySelectorAll('#btn-wrapper .btn');

let inputTextStorage = [];

function showDialog(message){
 let boxDialogMessage = document.createElement('div');
 let btnClose = document.createElement('button');

      btnClose.textContent = '❌';
      btnClose.setAttribute('type', "button")
      btnClose.id = 'btnClose';

      btnClose.addEventListener('click', ()=>{
          boxDialogMessage.style.display = 'none'
       });

      boxDialogMessage.textContent =  message;
      boxDialogMessage.className = "boxDialog";
      boxDialogMessage.appendChild(btnClose);
      document.body.appendChild(boxDialogMessage);

      setTimeout(function(){
            boxDialogMessage.style.display = "none";
      },5000);

}

function errorMessage(error, inputValue){
      let boxAlert = document.createElement('div');
          boxAlert.innerHTML = `Something went wrong: ${error} `;
          boxAlert.setAttribute('class', 'errorMessage');
          document.body.appendChild(boxAlert);

           setTimeout(function(){
                 boxAlert.style.display = 'none';
           },5000)
}

function safeCalculation(expression){
      const operator = ['+', '-', '*', '/'];
      if(operator.includes(expression[expression.length - 1])){
            const warningMessage = "Expression cannot end with an operator";
            const warningMessageContainer = document.createElement('div');
            warningMessageContainer.textContent = warningMessage; 
            warningMessageContainer.className = 'warningMessage';
            document.body.appendChild(warningMessageContainer);

            setTimeout(()=>{
                  warningMessageContainer.style.display = "none";
            },3000);
      }
                                    
      let result = math.evaluate(expression);
      inputText.value = result;
      inputTextStorage = String(result).split('');
}

btns.forEach(btn =>{
      btn.addEventListener('click', function(e){
            let target = e.target;
            let value = target.getAttribute('data-value');
            let action = target.getAttribute('data-action');
  
            if(value){
                  inputTextStorage.push(value);
                  inputText.value = inputTextStorage.join('');
            }else if(action){

                  switch(action){
                        case 'calculation':
                              try{  
                                    if(inputText.value === ''){
                                         showDialog("Input field is Empty, Please filled out the field before calculation!");
                                         return;
                                    }
                                    
                                    safeCalculation(inputText.value);

                              }catch(error){
                                    errorMessage(error, inputText.value);
                                    inputTextStorage = [];
                              }
                              break;
                        case 'delete':
                              inputTextStorage.pop();
                              inputText.value = inputTextStorage.join('');
                              break;      
                        case 'clear':
                              inputTextStorage = [];
                              inputText.value = ''
                              break;
                  }
            }
      });
});