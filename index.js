const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);
const HTML5ToPDF = require("./node_modules/html5-to-pdf/lib")
const path = require("path")



init();

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const showData = () => {
      fetchGit(answers).then((res) => {
      }
      )

    };

    

    const fetchGit = async (answers) => {
      const username = answers.github;
      const queryUrl = `https://api.github.com/users/${username}`;
      const api_call =  axios.get(queryUrl).then(function(response) {

       const data =  response.data; 
      
       const html = generateHTML(answers,data);
    
     writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
     } );
  
   
    };

    showData();
    generatePDF2();
    

  } catch(err) {
    console.log(err);
  }
}



function promptUser() {

 
    return inquirer.prompt([

      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
      },

  {
    type: "list",
    message: "What is your favorite color?",
    name: "color",
    choices: [
      "green",
      "blue",
      "pink",
      "red",
    ]
  }
])
}



function generatePDF2() {


const run = async () => {
  const html5ToPDF = new HTML5ToPDF({
    inputPath: path.join(__dirname,  "index.html"),
    outputPath: path.join(__dirname,  "output.pdf"),
    template: 'htmlbootstrap',  
    format: 'Letter',
  })

  await html5ToPDF.start().catch(err => console.error(err))
  await html5ToPDF.build().catch(err => console.error(err))
  await html5ToPDF.close().catch(err => console.error(err))
  console.log("DONE")
  process.exit(0)
}

try {
  run()
} catch (error) {
  console.error(error)
}

};

function generatePDF() {

var html = fs.readFileSync('./index.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('./index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res);
});
}

function generateHTML(answers,data) {
  return `

  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Document</title>
    <script src="index.js"></script>
    <style>
          *,
          *::after,
          *::before {
          box-sizing: border-box;
          }
          img {
            border-radius: 50%;
            border: 5px solid #BFBEBE;
            text-align: center;
          }
          #cards {
            background-color: ${answers.color};
            text-align: center;
          }
          #container2 {
            background-color: #e9ecef;
          }
          h1 {
            font-size: 40px;
            font-weight: bold;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          .main__profile-name {
            font-size: 40px;
            font-weight: bold;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          .main__profile-currentplace {
            font-size: 25px;
            font-weight: normal;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          #location {
            font-size: 20px;
            font-weight: normal;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          #url {
            font-size: 20px;
            font-weight: normal;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          #blog {
            font-size: 20px;
            font-weight: normal;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }
          h3 {
            color: #000000;
            text-align: center;
            padding-left: 150px;
            padding-right: 150px;
            font-family: 'BioRhyme', serif;
          }
          #container3 {
            font-size: 25px;
            color: #FFFFFF;
            background-color: #e9ecef;
            font-family: 'BioRhyme', serif;
          }
          h5 {
            font-size: 25px;
            font-weight: bold;
            color: #FFFFFF;
            font-family: 'BioRhyme', serif;
          }

      </style>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container" id="container1">
        <div class="card mb-3">
          <div id="cards">       
          <img src= ${data.avatar_url} alt="picture" style="width:250px">        
          <div class="card-body">
              <h1 class="card-title">Hi!</h1>
              <p class="main__profile-name main__profile-key">
              My name is ${data.name}!
              </p>
              <p class="main__profile-currentplace main__profile-key">
               Currently @ UCI Bootcamp <br>
              </p>
              <p class="main__profile-location main__profile-key">
                <div class="row">  
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-4" id="location">
                        <i class="fa fa-location-arrow" style="font-size:18px;color:white;"></i>
                        <a href="http://maps.google.com/maps?q=${data.location}"> ${data.location}</a>
                    </div>
                    <div class="col-sm-2" id="url">
                        <i class="fa fa-github" style="font-size:18px;color:white;"></i>
                        <a href="${data.html_url}">GitHub</a>  
                    </div>
                    <div class="col-sm-2" id="blog">
                        <i class="fa fa-rss" style="font-size:18px;color:white;"></i>
                        <a href="${data.blog}">Blog</a>
                    </div>
                    <div class="col-sm-2">
                    </div> 
              </p>
            </div>  
          </div>  
        </div>
  <div class="container" id="container2">
  <br><br>
      <h3> ${data.bio}. </h3>
  <br><br>
  </div>
  <div class="container" id="container3">
        <div class="row">
        <div class="col-sm-1">
        </div> 
        <div class="col-sm-5">
          <div class="card" style="width: 350px; height: 75px">
            <div class="card-body" id="cards">
              <h5 class="card-title">Public Repositories</h5>
              <p class="main__profile-repos main__profile-key">
              ${data.public_repos}
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="card" style="width: 350px; height: 75px">
            <div class="card-body" id="cards">
              <h5 class="card-title">Followers</h5>
              <p class="main__profile-followers main__profile-key">
              ${data.followers}
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-1">
        </div> 
      </div>
      <br><br><br>
      <div class="row">
        <div class="col-sm-1">
        </div> 
        <div class="col-sm-5">
          <div class="card" style="width: 350px; height: 75px">
            <div class="card-body" id="cards">
              <h5 class="card-title">GitHub Stars</h5>
              <p class="main__profile-stars main__profile-key">
              ${data.public_gists} 
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="card" style="width: 350px; height: 75px">
            <div class="card-body" id="cards">
              <h5 class="card-title">Following</h5>
              <p class="main__profile-following main__profile-key">
              ${data.following}
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-1">
        </div> 
      </div>
    <br><br><br><br><br><br>
  </div>        
  </div>
  </body>
  </html>`;
  }
