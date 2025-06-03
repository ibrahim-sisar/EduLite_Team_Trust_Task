---
name: backend edulite tame trust task
about: 'For new edulite members '
title: ''
labels: ''
assignees: ''

---

# 🧠 Backend Trust Task – CRUD API Challenge
Hi <name>
Welcome to the backend track of EduLite’s Trust Tasks!

This task is designed to evaluate your seriousness and consistency in a collaborative open-source environment. It is not meant to be difficult — we’re more interested in how well you follow instructions and deliver your work.

---

## 📌 Task Description

You are required to:

- Build a **CRUD API** using **Django**.
- The API must store data in a real **database** (e.g. SQLite or PostgreSQL).
- No authentication is needed — the API should be **public** and open.
- You can use Django’s built-in views, or you may choose a library such as **Django REST Framework (DRF)** for simplicity.

> 💡 DRF is highly recommended if you want to quickly build and document your APIs.

---

## ❓ What is CRUD?

**CRUD** stands for:
- **Create** – Add a new item
- **Read** – Retrieve items or a single item
- **Update** – Modify existing data
- **Delete** – Remove data

Example: A simple Book model with these fields:
```py
title = models.CharField(max_length=200)
author = models.CharField(max_length=100)
published_date = models.DateField()
```
### Your API should be able to:

- **Create a book**
- **View all books**
- **View one book by ID**
- **Update a book by ID**
- **Delete a book by ID**

---
## 🛠️ How to Start
### 1. Fork and Clone the Repository

- #### Go to the main Trust Tasks repository.
- #### Click Fork to make your own copy.
- #### Clone it to your machine:

```bash
git clone https://github.com/<your-username>/EduLite_Team_Trust_Task.git
cd EduLite_Team_Trust_Task
```
### 2. Create Your Submission Folder
#### Inside the `backend/submissions/` folder:
```bash
mkdir <your-github-username>
```

> 💡 Place all your code and work inside your own folder.


### 3. Build the Project

- **Use Django (and optionally Django REST Framework).**
- **You can use SQLite for the database.**
- **Make sure the API has endpoints for all CRUD operations.**
- **Add comments to your code where needed.**


### 4. Create API Documentation

#### Inside your submission folder, create a file called:
```bash
README.md
```
#### In this file, describe:
What your API does.
- **A list of endpoints with sample requests and responses.**

- **How someone else can run and test your API locally**

#### Example:
```md
## 📚 Book API

### GET /api/books/
Returns all books.

### POST /api/books/
Creates a new book. JSON body:
{
  "title": "Example Book",
  "author": "John Doe",
  "published_date": "2023-01-01"
}
...
```
### 5. Submit Your Work (Pull Request)
#### After completing your task:
- **Push your changes to your forked repository.**
- **Open a Pull Request to the main repository.**
- **In the PR description, include:**
```pgsql
🔹 Name: [Your Full Name]
🔹 GitHub Username: [your-username]
🔹 Submission Date: [YYYY-MM-DD]
🔹 Short Description: A Django-based Book CRUD API using DRF.
```

---
## ✅ What We'll Look For

- **Clear API logic and correct functionality.**
- **Proper use of Django or DRF.**
- **Good file organization.**
- **Proper documentation and adherence to structure.**
- **Timely submission and well-written PR.**

---
## 📌 Reminder

> This task is your first step into the EduLite team. It’s not about perfection — it’s about commitment.

### Let’s build something meaningful together. 🚀
