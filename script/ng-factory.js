app.factory('dados', ['memorizador', function dadosFactory(memorizador)  {
    var vm = this;

    return {
        adicionar: adicionar,
        atualizar: atualizar,
        excluir, excluir,
        pegar: pegar
    }

    function adicionar(jsonItem) {
        if (!vm.dados) {
            vm.dados = [];
        }
        if (!pegarItemPorUrl(jsonItem.url)) {
            jsonItem.uuid = createUUID();
            vm.dados.push(jsonItem);
            memorizador.definir('Dados', vm.dados);
        }
        return vm.dados;
    }
    
    function atualizar(jsonItem) {
        if (!vm.dados) {
            vm.dados = [];
        }
        for (let i = 0; i < vm.dados.length; i++) {
            const el = vm.dados[i];
            if (jsonItem.uuid = el.uuid) {
                vm.dados[i] = jsonItem;
                memorizador.definir('Dados', vm.dados);
                break;
            }
        }
        return vm.dados;
    }
    
    function excluir(jsonItem) {
        if (!vm.dados) {
            return;
        }
        for (let i = 0; i < vm.dados.length; i++) {
            const el = vm.dados[i];
            if (jsonItem.uuid = el.uuid) {
                vm.dados.splice(i, 1);
                memorizador.definir('Dados', vm.dados);
                break;
            }
        }
        return vm.dados;
    }

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
           return v.toString(16);
        });
     }

    function pegarItemPorUrl(url) {
        for (let i = 0; i < vm.dados.length; i++) {
            const item = vm.dados[i];
            if (item.url == url) {
                return item;
            }
        }
    }

    function pegar() {
        if (!vm.dados) {
            vm.dados = memorizador.obter('Dados');
            if (!vm.dados) {
                vm.dados = [];
                memorizador.definir('Dados', vm.dados);
            }
        }
        return vm.dados;
    }
}]);

app.factory('memorizador', function memorizadorFactory() {
    return {
        definir: definir,
        obter: obter
    }

    function definir(nome, valor) {
        return localStorage.setItem(nome, JSON.stringify(valor));
    }

    function obter(nome) {
        let result = localStorage.getItem(nome);
        if (result) {
            return JSON.parse(result);
        }
    }

});