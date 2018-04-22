// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function nightFunction(color) {
   document.getElementById("bady").style.backgroundColor = "#13263a";
   document.getElementById("bady2").style.backgroundColor = "#254d74";
   document.getElementById("bady3").style.color = "white";
   document.getElementById("chartTitle").style.color = "#fff"; 
   document.getElementById("someone").style.color = "#fff"; 
   document.getElementById("tweet").style.backgroundColor = "#13263a";
   document.getElementById("tweet2").style.backgroundColor = "#13263a";
   document.getElementById("chartContainer").style.backgroundColor="#254d74";
}

  //snack bar
    function mySuccess() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}




