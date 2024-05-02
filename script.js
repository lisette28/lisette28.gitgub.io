document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const restartBtn = document.getElementById("restart-btn");
    const winnerMessage = document.getElementById("winner-message");
    const cells = [];
    let currentPlayer = "X"; // Jugador actual, comienza con X
    let winner = null;
    // Crear celdas del tablero
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        cells.push(cell);
        board.appendChild(cell);
    }
    // Función para realizar un movimiento
    function makeMove(index) {
        if (!cells[index].textContent && !winner) { // Verificar si la celda está vacía y no hay ganador
            cells[index].textContent = currentPlayer; // Mostrar el símbolo del jugador actual
            // Verificar si hay un ganador después del movimiento
            checkWinner();
            // Cambiar al siguiente jugador
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
    // Función para verificar si hay un ganador
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                winner = cells[a].textContent;
                winnerMessage.textContent = `¡${winner} ha ganado!`;
                return;
            }
        }
        // Verificar si hay un empate
        if (!cells.some(cell => !cell.textContent)) {
            winnerMessage.textContent = "¡Empate!";
        }
    }
    // Función para reiniciar el juego
    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        winner = null;
        winnerMessage.textContent = "";
    }
    // Función para enviar un mensaje en el chat
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== "") {
            const messageElement = document.createElement("div");
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    // Escuchar clic en botón de enviar mensaje
    sendBtn.addEventListener("click", sendMessage);
    // Escuchar tecla Enter para enviar mensaje
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    // Escuchar clic en botón de reiniciar juego
    restartBtn.addEventListener("click", restartGame);
});
document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    // Tu código existente...
    // Agregar funcionalidad para borrar el chat
    const clearChatBtn = document.getElementById("clear-chat-btn");
    clearChatBtn.addEventListener("click", clearChat);
    function clearChat() {
        chatMessages.innerHTML = ""; // Eliminar todos los mensajes del chat
    }
    // Agregar funcionalidad para ajustar el tamaño de la letra
    const increaseFontSizeBtn = document.getElementById("increase-font-size-btn");
    const decreaseFontSizeBtn = document.getElementById("decrease-font-size-btn");
    increaseFontSizeBtn.addEventListener("click", increaseFontSize);
    decreaseFontSizeBtn.addEventListener("click", decreaseFontSize);
    function increaseFontSize() {
        const currentFontSize = parseInt(window.getComputedStyle(chatMessages).fontSize);
        chatMessages.style.fontSize = (currentFontSize + 2) + "px"; // Incrementar el tamaño de la letra en 2px
    }
    function decreaseFontSize() {
        const currentFontSize = parseInt(window.getComputedStyle(chatMessages).fontSize);
        chatMessages.style.fontSize = (currentFontSize - 2) + "px"; // Reducir el tamaño de la letra en 2px
    }
});
