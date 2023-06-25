// // const labelX = document.querySelector(`label[for="select-x"]`);
// const input = document.querySelectorAll(`input[type="radio"]`)




// function switchIcon(){
//     console.log(this.name)
//     console.log(this.checked)

//     if(this.name===`X`)
//     {
//         const imgX= document.querySelector(`.imgX`)
//         if(this.checked)
//         {
//             imgX.src = "./assets/icon-x-transparent.svg" 
//         }
//         else{
//             imgX.src = "./assets/icon-x-grey.svg"
//         }
//     }
// }
// input.forEach(radio => radio.addEventListener('change',switchIcon))



// // function changeIcon()
// // {
// //     console.log(this)
// //     const input = document.querySelector(`input[id=${this.dataset.id}]`)
// //     console.log(input.checked)
// // }


// // labelX.addEventListener('click',changeIcon)

const xTurnhover = `url(./assets/icon-x-outline.svg)`;
const oTurnhover = `url(./assets/icon-o-outline.svg)`;


let turn = true;
const root = document.querySelector(`:root`);
const boardField = document.querySelectorAll(`.board_field`);





function hoverImg(){
        if(turn)
        root.style.setProperty('--hoverImg', xTurnhover); 
        else
        root.style.setProperty('--hoverImg', oTurnhover); 
        turn = !turn;
}

boardField.forEach(element => element.addEventListener(`click`, hoverImg));




