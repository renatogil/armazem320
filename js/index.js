function closeNav () {
  document.querySelector('.navbar-collapse').classList.remove('show');
}

const form = document.getElementsByTagName('form')[0];
const responseMessage = document.getElementById('response-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const formJSON = Object.fromEntries(formData.entries());

  try {
    // Envia os dados para a API do staticforms.xyz
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJSON),
    });

    if (response.ok) {
      responseMessage.textContent = 'mensagem enviada com sucesso!';
      responseMessage.className = 'alert alert-success mt-4';
      form.reset();
    } else {
      const errorData = await response.json();
      responseMessage.textContent = `erro: ${errorData.error || 'não foi possível enviar a mensagem.'}`;
      responseMessage.className = 'alert alert-danger mt-4';
    }
  } catch (error) {
    responseMessage.textContent = `erro: ${error.message}`;
    responseMessage.className = 'alert alert-danger mt-4';
  }

  responseMessage.classList.remove('d-none');
});

