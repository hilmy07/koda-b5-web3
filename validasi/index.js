// koda-b5-git

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

function kesatu(){
    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }
    
    let count = 0;
    
    let b = getRandomInt(1, 100);

    console.log(b)
    
    async function tanya() {
      try {
          rl.question('Masukkan angka tebakan? ', (answer) => {
          count++;
            
          let k = answer==b;
          if(k){
              console.log(`tebakanmu bener, jumlah tebakan: ${count}`);
              rl.close();
          } else {
               if (answer > b) {
                   console.log("Terlalu besar!");
               }
              else {
                  console.log("Terlalu kecil!");
              }
              tanya();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    tanya();
}

function kedua(){
    const validCreds = [
        {
            username: "andi", password: "root",
        },
        {
            username: "cindy", password: "r00t"
        },
    ]

    async function login() {
        let attempts = 0;
    
        while (attempts < 3) {
            let username = await ask("Masukkan username : ");
            let password = await ask("Masukkan password : ");
    
            const found = validCreds.find(
                u => u.username === username && u.password === password
            );
    
            if (found) {
                console.log("valid");
                rl.close();
                return;
            } else {
                const userExists = validCreds.some(u => u.username === username);
                if (!userExists) {
                    console.log("username salah");
                }
                const passExists = validCreds.some(u => u.password === password);
                if (!passExists) {
                    console.log("password salah");
                }
                attempts++;
            }
        }
    
        console.log("Percobaan habis, akses ditolak.");
        rl.close();
    }

    login();
}

async function menu(){
    console.log("=== Menu ===");
    console.log("1. Tebakan angka")
    console.log("2. Login")

    const answer = await ask("Pilih menu (1/2): ");
    if(answer === "1"){
        kesatu();
    } else if(answer === "2"){
        kedua();
    }   else {
        console.log("Pilihan tidak valid.");
        rl.close();
    }
}

menu();

// async function login() {
//     // rl.close();
    
//     for(let temp = 0; temp< 3; temp++){
//         let username = await ask("Masukkan username : ");
//         let password = await ask("Masukkan password : ");

//         if(validCreds[0].username == username && validCreds[0].password == password) {
//             console.log("valid")
//             rl.close();
//             break;
//         } else if(validCreds[1].username == username && validCreds[1].password == password) {
//             console.log("valid")
//             rl.close();
//             break;
//         } else {
//             console.log("not valid")
//             // break;
//             // rl.close();
//             temp++;
//         }
//     }
// }


// login();