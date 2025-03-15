function initChat() {
    const input = document.querySelector("#input");
    const sendButton = document.querySelector("#sendButton");
    const chatContainer = document.querySelector(".main-container .chat-container");
    const mainContainer = document.querySelector(".main-container");
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    })
    sendButton.addEventListener("click", sendMessage)
    
    function sendMessage() {
        const messageText = input.value.trim();
        if (messageText === "") return;
    
        createMessageBubble(messageText, "mensagens-usuario");
        postResquestOpenAi(messageText);
    
        input.value = "";
        mainContainer.classList.add("validat-mensagem")
    }
    
    function createMessageBubble(text, className) {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-baloes", className);
        messageBubble.textContent = text;
        chatContainer.appendChild(messageBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    const instance = axios.create({
        baseURL: "http://marevandro-backend-chat.dokku.maratonahacker.net.br",
        headers: { "Content-Type": "application/json" }
      });

      async function postResquestOpenAi(message) {
        try {
            const {data} = await instance.post("/add", { user_message: message });
            createMessageBubble(data.response, "mensagens-bot");
            console.log(data, "cahamada api")
            return 
        } catch (error) {
            console.error("Erro ao retornar resposta da API:", error);
        }
      }

}

window.onload = () => {
    initChat();
};