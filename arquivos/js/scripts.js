// seleção de elementos
const generatePasswordButton = document.querySelector('#generate-password');
const generatePassworElement = document.querySelector('#generated-password');



// funções

// letra, números e simbolos

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
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (getletterLowercase, getletterUppercase, getNumber, getSymbol) => {

    let password = '';
    const passwordLength = 12; // 
    const generators = [getletterLowercase, 
        getletterUppercase, 
        getNumber, 
        getSymbol];

    for (let i = 0; i < passwordLength; i = i + 4) 
    {
        generators.forEach(() => {   

            const radomValue = generators[Math.floor(Math.random() * generators.length)]();
            console.log(radomValue);
            password += radomValue;

        });

    }
        
    
password = password.slice(0, passwordLength);
generatePassworElement.style.display = 'block';
// Exibir a senha gerada no elemento HTML
generatePassworElement.querySelector("h4").innerText = password;
console.log(password);


};



// eventos

generatePasswordButton.addEventListener('click', () => {
    generatePassword(getletterLowercase, 
        getletterUppercase, 
        getNumber, 
        getSymbol);
});