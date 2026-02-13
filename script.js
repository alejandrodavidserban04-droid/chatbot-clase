async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const userText = input.value;

    if (!userText) return;

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userText;
    chat.appendChild(userMessage);

    input.value = "";

    try {
        const response = await fetch("https://open-ai21.p.rapidapi.com/conversationllama", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "598afb5f46msh6c0f62a3838fa62p186a05jsn2e2351e2a7c1",
                "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
            },
            body: JSON.stringify({
                messages: [
                    { role: "user", content: userText }
                ],
                web_access: false
            })
        });

        const data = await response.json();

        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";

        botMessage.textContent = data.result || data.response || "No se recibió respuesta.";

        chat.appendChild(botMessage);

    } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.className = "bot-message";
        errorMessage.textContent = "Error al conectar con la API.";
        chat.appendChild(errorMessage);
    }
}
