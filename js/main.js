        // sig-in/sign-out auth
var mainWeb = {};

(function() {

    var firebase = app_firebase
    var userId = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          userId = user.userId;
        }else {
            userId = null;
            window.location.replace("./index.html")
        }
      });

      function logOut() {
          firebase.auth().signOut();
      }
      
      mainWeb.logOut = logOut;


      // nav-bar section
    const menuBar = document.querySelector('.nav-hamburger img');
    const navList = document.querySelector('.nav-item-div');

        function showNav() {

            console.log('clicked');
            let imgBar = menuBar.src;
            if(imgBar.indexOf('icon-hamburger.svg') != -1){
            menuBar.setAttribute('src', './images/icon-close.svg')
            navList.style.display ='block'
            }
            else {
                menuBar.setAttribute('src', './images/icon-hamburger.svg');
                navList.style.display = 'none';
            }
           
        }

        menuBar.addEventListener('click', showNav);


        // file upload control section
 const firstFile = document.querySelector('#firstFile');
 const secondFile = document.querySelector('#secondFile');
 const name = document.querySelector('#name');
 const myForm = document.querySelector('#myForm');


const firstStudents = JSON.parse(localStorage.getItem("firstStudents")) || [];
// mock server endpoint
const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = `${proxy}0cb4bf24-5019-44a2-816c-ff620438f709.mock.pstmn.io`;

const url = `${endpoint}/create/`;
        console.log(url);

function sendToServer(e) {
     e.preventDefault();

     const formData = new FormData(this);

let firstStudent = {
    studentName: name.value,
    file: firstFile.value
}

    // create history in the local storage
    firstStudents.push(firstStudent)
    localStorage.setItem("firstStudents", JSON.stringify(firstStudents));
    console.log(firstStudent);
 }
 myForm.addEventListener('submit', sendToServer);


    //   compare Button section


    const compareBtn = document.querySelector(".compare-btn");
    const loadDiv = document.querySelector(".load-div");
    const percentValue = document.querySelector(".percentage-value");
    const similarContent = document.querySelector("#similar-content");
    
    
    function compareFile() {
        if(firstFile.value !==  "" && secondFile.value !==  "") {
            loadDiv.innerHTML = `<div id="loader"></div>`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const {Percents, CopiedContent} = data.Result;  //instead of data.main.temp
                
                loadDiv.innerHTML = `<h4>Result</h4>`;
                percentValue.textContent = `${Percents}%`;
                similarContent.textContent = `${CopiedContent}`;
    
            })
            /*//.catch(function(e){
               // console.log(`Error: ${e}`);
                loadDiv.innerHTML = `
                            <h1 class="location-timezone">${error}</h1>
                            `
            })*/
        }
        else {
    
            loadDiv.innerHTML = `
                            <h1>Please fill all fields!!!</h1>
                            `
        }
    }
    compareBtn.addEventListener('click', compareFile);

    // text preview functionality

    function previewFirstFile(e) {
        const preview = document.querySelector("#preview")
        let files = e.target.files[0];

        let reader = new FileReader();

        reader.onload = event => {
            let fileContents = event.target.result;
            preview.textContent = `${fileContents}`
        }
        reader.readAsText(files);
    };

    function previewSecondFile(e) {
        const preview = document.querySelector("#previewSecond")
        let files = e.target.files[0];

        let reader = new FileReader();

        reader.onload = event => {
            let fileContents = event.target.result;
            preview.textContent = `${fileContents}`
        }
        reader.readAsText(files);
    }

    firstFile.addEventListener("change", previewFirstFile);
    secondFile.addEventListener("change", previewSecondFile);
      
})();
