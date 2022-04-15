((doc, win)=>{
    'use strict';
    var $form = doc.querySelector('[data-js="form"]');
    var $input = doc.querySelector('[data-js="inputText"]');
    var $areaStatus = doc.querySelector('[data-js="statusRequisicao"]');
    var $nome = doc.querySelector('[data-js="Nome"]');
    var $nacionality = doc.querySelector('[data-js="nacionalidade"]');
    var $bairro = doc.querySelector('[data-js="bairro"]');
    var $email = doc.querySelector('[data-js="email"]');
    var $Cep = doc.querySelector('[data-js="cep"]');
    var ajax = new XMLHttpRequest();

    $form.addEventListener('submit', Clickbtn, false);

    function Clickbtn(e){
        e.preventDefault();
        if(isBIvalide($input.value)){
            ajax.open('GET', 'json/data.JSON');
            ajax.send();
            ajax.addEventListener('readystatechange', evtAjax,false);
        }else{
            alert('digite Nº de Bilhete Valido!')
            $input.value='';
        }
    }

    function isBIvalide(nBI){
        return /^\d{1,9}\w{2}\d{3}$/gi.test(nBI)
    }

    function evtAjax(){ 
        $areaStatus.innerHTML='carregando...';
        if(ajax.status===200 && ajax.readyState===4){
            $areaStatus.innerHTML='sucesso!';
            try{
                var aux = Array.prototype.slice.call(JSON.parse(ajax.responseText));
                var x = $input.value;
                leitura(aux,indexof(aux, x));
            }catch(e){
                alert('erro, nº de BI inexistente!')
                $areaStatus.innerHTML='erro... este nº de bilhete '
                +$input.value+
                ' ñ foi encontrado';
            }
            $input.value='';
        }
    }

    function indexof(arr, valorEncontrar){
        var aux;
        Array.prototype.forEach.call(arr,(element,index) => {
           if(element.BI===valorEncontrar){
               aux = index;
           } 
        });
        return aux;
    }

    function leitura(arr, pos){
        $nome.innerHTML = `${arr[pos].Nome}`;
        $nacionality.innerHTML=`${arr[pos].Nacionalidade}`;
        $bairro.innerHTML=`${arr[pos].Bairro}`;
        $email.innerHTML=`${arr[pos].Email}`;
        $Cep .innerHTML=`${arr[pos].BI}`;
    }
    
})(document, window);