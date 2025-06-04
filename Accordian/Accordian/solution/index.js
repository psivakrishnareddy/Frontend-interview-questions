import './styles.css';

// Write your JavaScript here.
// All elements

const accordians = document.querySelectorAll(".accordian");
// const accordians = document.querySelector(".accordian-container").children;


// accordians.forEach((element) =>{

// })

let i = 0;
accordians.forEach((element) => {
    element.addEventListener("click", function() {
        const content = element.querySelector('.content');
        const header = element.querySelector('.accordian-header')
        // console.log(content)
       if(header.firstElementChild.classList.contains('accordion-icon--rotated')){
        header.firstElementChild.classList.remove('accordion-icon--rotated');
        content.style.display ='none';
       } else{
        content.style.display ='block';
        header.firstElementChild.classList.add('accordion-icon--rotated');
       }
    })
})