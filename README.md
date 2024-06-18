# Mano svetainė zigmaswebdev.lt
# Backend
- Pasileidžiu terminalą.
- Sukuriu backend "mkdir backend", "cd backend", "npm init -y", įdiegiu projekui reikalingas bibliotekas "npm install ...".
- Susikuriu index.js ir .env.
- Susikuriu hash_password.js ir susikonfiguruoju.
- Sukuriu uploads ir public katalogus.
- Uploads bus saugomos nuotraukos.
- Sukurti index.html ir styles.css public kataloge.

# Frontend
- Pasileidžiu naują terminalą.
- Sukuriu frontend - npm create vite, project name - frontend, renkuosi React ir JavaScript,cd frontend, idiegiu reikalingas bibliotekas - npm install.

 admin prisijungimo sukurimas
 - db works susikuriam lentelę users: username, password, isAdmin.
 - backende susikuriam hash_password.js ir susikonfiguruojame.
 - terminale paleidžiame node hash_password.js (sugeneruojamas koduotas slaptažodis iš esamo slaptažodio) ir duomenų bazėje matomas jau užšifruotas slaptaždis. 
  - isidiegit bcrypt ir jsonwebtoken 