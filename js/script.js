// recebe os valores que vao ser calculados
const form = document.querySelector('#nutrition-form');

const resultados = document.querySelector('#resultados');

const resultadoIMC = document.querySelector('#resultado-imc');
const classificacaoIMC = document.querySelector('#classificacao-imc');

const resultadoTMB = document.querySelector('#resultado-tmb');
const resultadoKcal = document.querySelector('#resultado-kcal');

const macroCalories = document.querySelector('#macro-calories');

const proteina = document.querySelector('#proteina');
const carboidratos = document.querySelector('#carboidratos');
const gorduras = document.querySelector('#gorduras');

const proteinaKcal = document.querySelector('#proteina-kcal');
const carboidratosKcal = document.querySelector('#carboidratos-kcal');
const gordurasKcal = document.querySelector('#gorduras-kcal');


form.addEventListener('submit', (event) => {

    event.preventDefault();

    const sexo = document.querySelector('#sexo').value;
    const idade = Number(document.querySelector('#idade').value);
    const peso = Number(document.querySelector('#peso').value);
    const altura = Number(document.querySelector('#altura').value);
    const atividade = Number(document.querySelector('#atividade').value);
    const objetivo = document.querySelector('#objetivo').value;


  // imc calculo

    const alturaMetros = altura / 100;

    const imc = peso / (alturaMetros * alturaMetros);

    let classificacao = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    }
    else if (imc < 25) {
        classificacao = 'Peso normal';
    }
    else if (imc < 30) {
        classificacao = 'Sobrepeso';
    }
    else if (imc < 35) {
        classificacao = 'Obesidade grau I';
    }
    else if (imc < 40) {
        classificacao = 'Obesidade grau II';
    }
    else {
        classificacao = 'Obesidade grau III';
    }


    // taxa metabolica basal (TMB) 2o Mifflin-St Jeor

    let tmb;

    if (sexo === 'masculino') {

        tmb = (10 * peso) +
              (6.25 * altura) -
              (5 * idade) +
              5;

    } else {

        tmb = (10 * peso) +
              (6.25 * altura) -
              (5 * idade) -
              161;
    }


    // gasto energetico diario total, pega o valor da taxa metabolica basal e multiplica pelo valor q o user seleciona no site

    const tdee = tmb * atividade;

    let calorias;

    if (objetivo === 'emagrecer') {

        calorias = tdee * 0.85; // 15% de deficit kcal

    }
    else if (objetivo === 'ganhar') {

        calorias = tdee * 1.10; // 10% de superavit kcal

    }
    else {

        calorias = tdee;
    }


    calorias = Math.round(calorias); // arredonda o valor das kcal para o valor inteiro mais proximo



    // macronutrientes calculo
    // prot:
    // 1.6 g por kg de peso

    const proteinaGramas = peso * 1.6;

    const proteinaCalorias = proteinaGramas * 4;


    // fat:
    // 30% das kcal

    const gorduraCalorias = calorias * 0.30;

    const gorduraGramas = gorduraCalorias / 9;


    // carb:
    // calorias restantes para a meta diaria

    const carboidratoCalorias =
        calorias -
        proteinaCalorias -
        gorduraCalorias;

    const carboidratoGramas =
        carboidratoCalorias / 4;

    //exibir os valores calculados

    resultadoIMC.textContent = imc.toFixed(1);

    classificacaoIMC.textContent = classificacao;

    resultadoTMB.textContent = Math.round(tmb);

    resultadoKcal.textContent = calorias;

    macroCalories.textContent = `${calorias} kcal`;

    proteina.textContent =
        Math.round(proteinaGramas);

    carboidratos.textContent =
        Math.round(carboidratoGramas);

    gorduras.textContent =
        Math.round(gorduraGramas);


    proteinaKcal.textContent =
        `${Math.round(proteinaCalorias)} kcal`;

    carboidratosKcal.textContent =
        `${Math.round(carboidratoCalorias)} kcal`;

    gordurasKcal.textContent =
        `${Math.round(gorduraCalorias)} kcal`;


    // scroll pra sessão de resultados

    resultados.classList.remove('hidden');

    resultados.scrollIntoView({
        behavior: 'smooth'
    });

});
