# 📝 Task Management Application  

A modern, feature-rich task management application that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. All changes are saved instantly to the database for a seamless experience.  

## 🚀 Live Demo  
🔗 [Live Application](#) *(Update this with your live link)*  

---

## 📖 Table of Contents  

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgements](#acknowledgements)  

---

## 🎯 Features  

✅ **Task Management:** Add, edit, and delete tasks.  
✅ **Drag-and-Drop:** Easily reorder tasks within sections using a smooth drag-and-drop interface.  
✅ **Real-time Updates:** Changes sync instantly with the database.  
✅ **Responsive Design:** Fully optimized for desktop and mobile users.  
✅ **Modern UI:** Clean and minimalistic design with an intuitive user experience.  

---

## 🛠 Tech Stack  

### **Frontend**  
- **React** – JavaScript library for building UI  
- **Vite** – Fast build tool and development server  
- **Tailwind CSS** – Utility-first CSS framework for responsive design  
- **DaisyUI** – Pre-styled Tailwind components  
- **React Query** – For handling API requests and caching  
- **@dnd-kit** – Drag-and-drop functionality  
- **Socket.io** – Real-time communication  
- **React Router** – Navigation between views  
- **SweetAlert2** – Interactive alerts  

### **Backend**  
- **Node.js** – Server-side runtime  
- **Express.js** – Web framework for building RESTful APIs  
- **MongoDB** – NoSQL database for storing tasks  

---

## 📥 Installation  

### **Prerequisites**  
Ensure that you have the following installed:  
- **Node.js** (version 16 or higher)  
- **MongoDB** (or use a cloud service like MongoDB Atlas)  
- **Vite** (for development)  

### **Steps to Install**  

1️⃣ Clone the repository:  
```bash
git clone https://github.com/your-username/task-manager-client-side.git
cd task-manager-client-side
2️⃣ Install dependencies:

bash
Copy
Edit
npm install
3️⃣ Set up environment variables:

Create a .env file in the root directory.
Add necessary configurations (API URLs, database credentials, etc.).
4️⃣ Run the application:

For development:
bash
Copy
Edit
npm run dev
For production:
bash
Copy
Edit
npm run build  
npm run preview  
5️⃣ Open the app in your browser:
🔗 http://localhost:3000

📂 Folder Structure
bash
Copy
Edit
task-manager-client-side/
├── public/        # Static assets (images, icons, etc.)
├── src/           # Source code
│   ├── components/ # Reusable UI components (task cards, forms, etc.)
│   ├── hooks/      # Custom React hooks
│   ├── pages/      # Application views (To-Do, In Progress, Done)
│   ├── services/   # API calls and WebSocket connections
│   ├── App.js      # Main entry point of the application
│   ├── index.js    # Entry point for rendering the app
├── .env           # Environment variables
├── package.json   # Project metadata and dependencies
└── vite.config.js # Vite configuration
📌 Usage
📝 Add a Task: Enter task details in the "Add Task" section and hit "Enter" to add it to the "To-Do" column.
✏️ Edit a Task: Click on a task to modify its details.
🗑 Delete a Task: Click the delete icon next to a task to remove it.
🔄 Reorder Tasks: Drag and drop tasks between To-Do, In Progress, and Done sections.
🌍 Real-time Updates: Tasks sync across devices instantly.

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch:
bash
Copy
Edit
git checkout -b feature/your-feature
Make your changes and commit:
bash
Copy
Edit
git commit -m "Add new feature"
Push to your branch:
bash
Copy
Edit
git push origin feature/your-feature
Open a pull request. 🎉
📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.

🙌 Acknowledgements
React
Vite
Tailwind CSS
DaisyUI
@dnd-kit
Socket.io
SweetAlert2