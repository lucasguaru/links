var app = angular.module('searchApp', []);
app.controller('HomeController', ['$scope', 'dados', function HomeController($scope, dados) {
    let vm = this;
    vm.listaLinks = dados.pegar();
    vm.emEdicao = false;

    let x = 1;

    vm.adicionarItem = () => {
        vm.linkEdicao = {
            inclusao: true
        };
        vm.emEdicao = true;
        // vm.listaLinks = dados.adicionar({
        //     titulo: 'Título ' + x,
        //     descricao: 'Reunimos as melhores práticas para criar o seu conteúdo com qualidade e rapidez, e tudo isso em um só lugar. Você ganha melhor visibilidade de seu site ou blog, geração automática de conteúdo rápido e de qualidade',
        //     url: 'https://www.google.com/search?q=input+arredondado+css' + x
        // });
        // x++;
    }

    vm.salvar = () => {
        if (vm.linkEdicao.edicao) {
            delete this.linkEdicao.edicao;
            vm.listaLinks = dados.atualizar(vm.linkEdicao);
        } else {
            delete vm.linkEdicao.inclusao;
            vm.listaLinks = dados.adicionar(vm.linkEdicao);
        }
        vm.emEdicao = false;
    }

    vm.editar = (link) => {
        vm.linkEdicao = angular.copy(link);
        vm.linkEdicao.edicao = true;
        vm.emEdicao = true;
    }

    vm.excluir = (link) => {
        vm.listaLinks = dados.excluir(link);
    }

    vm.copiar = (link) => {
        var copyText = document.getElementById("clipboard");
        var linkCopiado = angular.copy(link);
        delete linkCopiado.uuid;
        copyText.value = JSON.stringify(linkCopiado);
        
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
        // alert("Copied the text: " + copyText.value);
    }

    // this.listaLinks = [{
    //     titulo: 'Título 1',
    //     descricao: 'Reunimos as melhores práticas para criar o seu conteúdo com qualidade e rapidez, e tudo isso em um só lugar. Você ganha melhor visibilidade de seu site ou blog, geração automática de conteúdo rápido e de qualidade',
    //     url: 'https://www.google.com/search?q=input+arredondado+css'
    // }, {
    //     titulo: 'Título 2',
    //     descricao: 'Target an element that has all of multiple classes. Shown below with two classes, but not limited to two',
    //     url: 'https://www.google.com/search?q=input+arredondado+css'
    // }];

}]);