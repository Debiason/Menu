export default function(data) {
    //pega a tag principal que ira receber o menu
    const tree = document.querySelector('nav#tree')

    //recebe toda a arvore de elementos
    const menu = document.createElement('ul')


    const firstLevel = data.filter(item => !item.parent)
    const getFirstLis = firstLevel.map(buildTree) //retorna novo array com li
    getFirstLis.forEach(li => menu.append(li)) //adiciona li's ao menu

    firstLevel.map(buildTree)

    function buildTree(item) {
        //primeiro elemento
        const li = document.createElement('li')
        li.innerHTML = item.name

        const Children = data.filter(child => child.parent === item.id)

        if (Children.length > 0) {

            //adiciona um click para os parents
            li.addEventListener('click', event => {
                event.stopPropagation()
                event.target.classList.toggle('open')

            })

            var span = document.createElement('span');
            li.append(span);
            span.innerHTML = Children.length


            //   li.innerHTML = item.name + '    ' + Children.length
            console.log('Children - ' + Children.length)

            //adiciona a classe identificando de que tem filhos
            li.classList.add('has-children')


            // constroi os filhos
            const subMenu = document.createElement('ul')

            Children.map(buildTree).forEach(li => subMenu.append(li))

            li.append(subMenu)
        }

        //adicionar os elementos ao menu
        return li

    }
    //adicionar o menu no html
    tree.append(menu)


}