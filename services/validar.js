import { validarDataNascimento } from "./validarDataNascimento.js";


const retornaMensagemDeErro = (tipo, validity) => {
    let mensagemDeErro = "";
    const tiposDeErro = ["valueMissing" , "typeMismatch", "tooShort"];

    const mensagensDeErro = {
        email: {
            valueMissing: "O e-mail é necessário",
            typeMismatch: " Este não é um email válido"
        },

        senha: {
            valueMissing: "A senha é necessaria",
            tooShort: "A senha deve ter no minimo 4 caractere"
        },

        datadenascimento: {
            valueMissing: "A data de nascimento é necessario",
            rangeUnderflow: "a data minima é 01/01/1901",
            customError:"A idade minima é 18 anos",
        },
        cpf: {
            valueMissing: "O cpf é necessário",
        },
        rg: {
            valueMissing: "O rg é necessário",
        },
        cep: {
            valueMissing: "O cep é necessario",
        },
        logradouro: {
            valueMissing: "O logradouro é necessario",
        },
        cidade: {
            valueMissing: "A cidade é necessario",
        },
        estado: {
            valueMissing: "O estado é necessario",
        },

    };

    tiposDeErro.forEach( erro => {
        if(validity[erro]) {
            mensagemDeErro =  mensagensDeErro[tipo][erro];
        }
    });

    return mensagemDeErro;
} ;

export const validarInput = (input, adicionaErro = true) => {
    console.log(input.validity);
    
    const classeElementoErro = "erro-validacao";
    const  classeInputErro = "possui-erro-validacao";
    const elementoPai = input.parentNode;
    const elementoErroExist = elementoPai.querySelector(`.${classeElementoErro}`);
    const elementoErro = elementoErroExist || document.createElement("div");
    const elementoEhValido = input.validity.valid;
    const tipo  = input.dataset.tipo;
    const validadorEspedificos = {
       datadenascimento: (input)=> validarDataNascimento(input)

   };
   if(validadorEspedificos[tipo]){
       validadorEspedificos[tipo](input);
   }

   if(!elementoEhValido) {
      elementoErro.className = classeElementoErro;
      elementoErro.textContent = retornaMensagemDeErro(
          tipo , input.validity
      );
      
       if(adicionaErro) {
        input.after(elementoErro);
        input.classList.add(classeInputErro);

       }

   } else {
    elementoErro.remove()  
    input.classList.remove(classeInputErro);
}
};