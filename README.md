# React + Vite

Military Asset Management System
A full-stack MERN application that helps military personnel manage assets like weapons, vehicles, and ammunition. This system includes role-based access (Admin, Base Commander, Logistics Officer), asset tracking, purchase/transfer logging, and assignment features.

Tech Stack
Frontend	-React, Material-UI, Axios,hot-toast,react-router-dom.
Backend	-Node.js, Express.js, MongoDB, Mongoose.
Auth-	JWT-based Authentication

Features
-User Login & Registration
-Create Assets
 -Log Purchases & Transfers
 -Assign Assets to Personnel
 -View Filtered Assets by Base, Type, and Date
 -View History: Purchases, Transfers, Assignments
 -Role-based UI Controls.

Backend Setup
start command :-npm start
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=SECRET
PORT=8080

Frontend setup
Install dependencies: npm install
start command:-npm run dev

API Endpoints
 Method         Endpoint           Description             

 POST    `/api/auth/register`    Register user           
 POST    `/api/aith/login`       Login user & return JWT 
 POST    `/api/asset`       Create a new asset      
 POST    `/api/purchase`    Record a purchase       
 POST    `/api/transfer`    Record a transfer       
 POST    `/api/assignment`  Assign an asset         
 GET     `/api/dashboard`   Get filtered assets     
 GET     `/api/purchase`    Get purchase history    
 GET     `/api/transfer`   Get transfer history    
 GET     `/api/assignment`  Get assignment history  

