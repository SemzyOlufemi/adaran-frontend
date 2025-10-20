fetch("https://adaran-backend.onrender.com/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
})
