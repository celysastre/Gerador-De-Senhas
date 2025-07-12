// seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatePassworElement = document.querySelector("#generated-password");

// novas funcionalidades
const openCloseGenerateButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPassword = document.querySelector("#copy-password");

// funções | letra, números e simbolos
const getletterLowercase = () => {
  // console.log(String.fromCharCode(50));
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const getletterUppercase = () => {
  // console.log(String.fromCharCode(50));
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const getNumber = () => {
  // console.log(String.fromCharCode(50));
  return Math.floor(Math.random() * 10).toString();
};
const getSymbol = () => {
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Validação do tamanho da senha
// A senha deve ter entre 8 e 20 caracteres
// Se o valor for inválido, exibir uma mensagem de erro

const isPasswordLengthValid = () => {
  const passwordLength = +lengthInput.value;
  return passwordLength >= 8 && passwordLength <= 20;
};

const generatePassword = (
  getletterLowercase,
  getletterUppercase,
  getNumber,
  getSymbol
) => {
  if (!isPasswordLengthValid()) {
    generatePassworElement.style.display = "block";
    generatePassworElement.querySelector("h4").innerText =
      "A senha deve ter entre 8 e 20 caracteres.";
    generatePassworElement
      .querySelector("#copy-password")
      .classList.add("hide");

    console.log("A senha deve ter entre 8 e 20 caracteres.");
    return;
  }

  const generators = [];
  let password = "";
  const passwordLength = +lengthInput.value;

  if (lettersInput.checked) {
    generators.push(getletterLowercase);
    generators.push(getletterUppercase);
  }
  if (numbersInput.checked) {
    generators.push(getNumber);
  }
  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const radomValue =
        generators[Math.floor(Math.random() * generators.length)]();
      //   console.log(radomValue);
      password += radomValue;
    });
  }
  password = password.slice(0, passwordLength);
  generatePassworElement.style.display = "block";
  // Exibir a senha gerada no elemento HTML
  generatePassworElement.querySelector("h4").innerText = password;
  generatePassworElement
    .querySelector("#copy-password")
    .classList.remove("hide");
  console.log(password);
};

// eventos
// FUNÇÃO PARA GERAR A SENHA
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getletterLowercase,
    getletterUppercase,
    getNumber,
    getSymbol
  );
});

openCloseGenerateButton.addEventListener("click", () => {
  // Verifica se o container está visível
  if (generatePasswordContainer.classList.contains("hide")) {
    // Se estiver escondido, mostra
    generatePasswordContainer.classList.remove("hide");
  } else {
    // Se estiver visível, esconde
    generatePasswordContainer.classList.add("hide");
  }
  // Alterna a visibilidade do container
  generatePassworElement.style.display = "none"; // Esconde a senha gerada
});

copyPassword.addEventListener("click", () => {
  const passwordText = generatePassworElement.querySelector("h4").innerText;
  if (passwordText) {
    navigator.clipboard
      .writeText(passwordText)
      .then(() => {
        copyPassword.innerText = "Senha copiada!";
        setTimeout(() => {
          copyPassword.innerText = "Copiar Senha";
        }, 1000); // Reseta o texto após 2 segundos
      })
      .catch((err) => {
        console.error("Erro ao copiar a senha: ", err);
      });
  } else {
    alert("Nenhuma senha gerada para copiar.");
  }
});
