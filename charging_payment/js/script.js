const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade-menu');
const body = document.querySelector('body');
document.querySelector('#btnHamburger').addEventListener('click', function(){
    console.log('open hamburger');

    if (header.classList.contains('open')) { // close hamburger menu
        body.classList.remove('noscroll');

        header.classList.remove('open');
        fadeElems.forEach(function(element){
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        })
   
    }
    else { // open hamburger menu
        body.classList.add('noscroll');

        header.classList.add('open');
        fadeElems.forEach(function(element){
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        })
        

    }

});

function onload() {
    var x = document.getElementById("time");
    x.checked=true;
    openTimeOptions();

}
function openBatteryOptions() {
    var x = document.getElementById("battery");

    if (document.getElementById("timeCheck").checked) {
        document.getElementById("timeCheck").checked = false;
        var y = document.getElementById("time");
        y.classList.remove('open');
        y.classList.remove('fade-in');
        y.classList.add('fade-out');

    }
    if (x.classList.contains ('open')) {
      x.classList.remove('open');
      x.classList.remove('fade-in');
      x.classList.add('fade-out');
    } 
    else {
        x.classList.add('open');
        x.classList.remove('fade-out');
        x.classList.add('fade-in');
    }
}
function openTimeOptions() {
    var x = document.getElementById("time");
    if (document.getElementById("batCheck").checked) {
        document.getElementById("batCheck").checked = false;
        var y = document.getElementById("battery");
        y.classList.remove('open');
        y.classList.remove('fade-in');
        y.classList.add('fade-out');
    }

    if (x.classList.contains ('open')) {
      x.classList.remove('open');
      x.classList.remove('fade-in');
      x.classList.add('fade-out');
    } 
    else {
        x.classList.add('open');
        x.classList.remove('fade-out');
        x.classList.add('fade-in');
       
    }
}

function checkValidTime() {
    var h = document.getElementById('h');
    var m = document.getElementById('m');
    var s = document.getElementById('s');

    var proceed_button = document.getElementById('cont');
    var but = document.getElementById('but');
    if (h.value == null || m.value == null || s.value == null || !h.checkValidity() || !m.checkValidity() || !s.checkValidity()) {
      
        
        proceed_button.style.pointerEvents="none";  
        but.style.backgroundColor="gray"; 
    }
    if (h.checkValidity() && m.checkValidity() && s.checkValidity()) {
      
        
        proceed_button.style.pointerEvents="auto";  
        but.style.backgroundColor="#fab90a"; 
    }
    
}


function checkValidBat() {
    var s = document.getElementById('st')
    var e = document.getElementById('e');

    

    var proceed_button = document.getElementById('cont2');
    var but = document.getElementById('but2');
    
    if (st.value == null || e.value == null || parseInt(e.value) <= parseInt(st.value) ||  !st.checkValidity() || !e.checkValidity() ) {
      
        
        proceed_button.style.pointerEvents="none";  
        but.style.backgroundColor="gray"; 
    }
    if (e.checkValidity() && st.checkValidity() && parseInt(e.value) > parseInt(st.value)) {
      
        
        proceed_button.style.pointerEvents="auto";  
        but.style.backgroundColor="#fab90a"; 
    }
    
}
