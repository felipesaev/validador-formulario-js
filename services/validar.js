import { validarDataNascimento } from "./validarDataNascimento.js";


export const validarInput = (input, adicionaErro = true) => {
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
      elementoErro.textContent = "Há um erro aqui";
      
       if(adicionaErro) {
        input.after(elementoErro);
        input.classList.add(classeInputErro);

       }

   } else {
    elementoErro.remove()  
    input.classList.remove(classeInputErro);
}
};