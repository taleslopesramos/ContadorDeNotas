(function(){
    console.log("It just works!")
    var inputValor = document.querySelector("#valor")

    var resultadoInput = document.querySelector("#resultado")

    var resultado = {}

    function resetResultado(){
        resultado = {
            "200":0,
            "100":0,
            "50":0,
            "20":0,
            "10":0,
            "5":0,
            "2":0,
            "resto":0
        }   
    }

    function listenEvents(){
        inputValor.onkeydown = function(event) {
            
            // Restringe a apenas numeros
            if(isNaN(event.key) &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight" &&
                event.key !=="Backspace") {

                return false;
            }
        }
        inputValor.onkeyup = function(){
            update()
        }
    }

    function update(){
        calculaResultado(parseInt(inputValor.value))
        showResult()
    }

    function imprimeNota(quantidade, valor){
        if(!quantidade || valor =='resto') return false;
        var notasString = ""

        if(quantidade == 1){
            notasString = 'Nota'
        }else{
            notasString = 'Notas'
        }

        resultadoInput.innerHTML += resultado[valor]+ ' ' + notasString + ' de ' + valor + ', ';
    }

    function showResult(){
        resultadoInput.innerHTML = 'Você receberá:  ';

        Object.keys(resultado).reverse().map(function(key){
            imprimeNota(resultado[key], key)
        })

        if(resultado["resto"])
            resultadoInput.innerHTML += 'sobrando de resto 1 real. ';


        resultadoInput.innerHTML = resultadoInput.innerHTML.substr(0,resultadoInput.innerHTML.length-2)
        resultadoInput.innerHTML += '.'
    }

    function calculaResultado(valor){
        var valorAuxiliar = valor;
        console.log(resultado)
        Object.keys(resultado).reverse().map(function(key){
            if(key == 'resto') return false;

            resultado[key] = Math.floor(valorAuxiliar / parseInt(key))
            valorAuxiliar -= resultado[key] * parseInt(key);
        })

        resultado["resto"] = valorAuxiliar;        
    }

    resetResultado()
    listenEvents()
})()