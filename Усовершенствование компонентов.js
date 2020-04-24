// Существует два основных вида цикла: жизненный цикл установки и жизненный цикл обновления.

// Жизненный цикл установки отличается в зависимости от того, как создаются компоненты: с помощью синтаксиса ES6 или метода React.createClass. При использовании последнего для получения свойств компонента сначала вызывается метод getDefaultProps. Затем для инициализации состояния вызывается метод
// getInitialState.

// Состояние инициализируется в конструкторе. Доступ к свойствам имеется как у конструкторов класса ES6, так и у метода getInitialState, и, если нужно, их можно задействовать, чтобы помочь определить исходное состояние.

// Жизненный цикл установки компонента:
// Класс ES6:              React.createClass():
//                         getDefaultProps() 
// constructor(props)      getInitialState()
// componentWillMount()    componentWillMount()
// render()                render()
// componentDidMount()     componentDidMount()
// componentWillUnmount()  componentWillUnmount()

// После получения свойств и инициализации состояния вызывается метод componentWillMount. Он вызывается до отображения DOM и может быть использован для инициализации библиотек, созданных сторонними разработчиками, запуска анимаций, запроса данных или выполнения любых дополнительных настроек, которые потребуются перед отображением компонента на экране. Из этого метода можно вызвать метод setState, чтобы изменить состояние компонента непосредственно перед тем, как он будет первоначально отображен на экране.

//https://codepen.io/Kvadeck/pen/RwPaveK?editors=1010

// Использование setState в componentWillMount
// Вызов метода setState перед отображением компонента на экране не запустит жизненный цикл обновления, в отличие от вызова после отображения. Если этот метод вызывается внутри асинхронной функции обратного вызова, определенной в методе componentWillMount, то он будет вызван после отображения компонента на экране и запустит жизненный цикл обновления.

// Метод componentDidMount является еще одним местом, откуда удобно отправлять запросы к API. Он вызывается после отображения компонента на экране, поэтому любые вызовы setState из данного метода приведут к запуску жизненного цикла обновления и к повторному отображению компонента на экране.

// Метод componentDidMount также хорошо подходит для инициализации любого кода JavaScript, созданного сторонними разработчиками, которому требуется DOM. Например, может потребоваться внедрить библиотеку перетаскивания объектов или библиотеку, обрабатывающую события прикосновения к экрану. Обычно таким библиотекам перед их инициализацией требуется DOM.

// Любые процессы, запущенные в componentDidMount или componentWillMount, могут быть прекращены в componentWillUnmount. От неиспользуемых фоновых процессов нужно своевременно избавляться.

// Рассмотрим пример с таймером. Он запускается при установке компонента Clock. Когда пользователь нажимает кнопку закрытия, таймер удаляется, для чего используется метод unmountComponentAtNode, и отсчет времени прекращается.

// https://codepen.io/Kvadeck/pen/mdJPgqZ?editors=1010

// Жизненный цикл обновления представляет собой последовательность методов, вызываемых при изменении состояния компонента или при получении от родительского компонента новых свойств.

// Жизненный цикл обновления запускается при каждом вызове setState.

// Вызов setState внутри жизненного цикла обновления станет причиной бесконечного рекурсивного цикла, который приведет к ошибке переполнения стека. Поэтому метод setState может вызываться только в методе componentWillReceiveProps, позволяющем компоненту обновлять состояние при обновлении его свойств.

// В число методов жизненного цикла обновления входят:
// componentWillReceiveProps(nextProps) — вызывается только в случае передачи компоненту новых свойств; единственный метод, в котором может быть вызван метод setState;
// shouldComponentUpdate(nextProps, nextState) — привратник жизненного цикла обновления: предикат, способный отменить обновление; может использоваться для повышения производительности, разрешая только необходимые обновления;
// componentWillUpdate(nextProps, nextState) — вызывается непосредственно перед обновлением компонента; похож на метод componentWillMount, но вызывается только перед выполнением каждого обновления;
// componentDidUpdate(prevProps, prevState) — вызывается сразу же после выполнения обновления, после вызова метода отображения render; похож на метод componentDidMount, но вызывается только после каждого обновления.

// componentWillMount pen
// https://codepen.io/Kvadeck/pen/NWqragg?editors=1010

// Метод componentWillUpdate будет вызван, только если компонент будет обновляться. В жизненном цикле он следует за методом shouldComponentUpdate. Фон останется серым, пока компоненты Color не будут обновлены путем изменения их рейтингов

// Если метод shouldComponentUpdate возвращает true, то далее следуют остальные действия жизненного цикла обновления. Остальные методы жизненного цикла обновления также получают в виде аргументов новые свойства и новое состояние. (Метод componentDidUpdate получает предыдущие свойства и предыдущее состояние, поскольку, если дело дошло до его применения, значит, обновление уже состоялось и свойства были изменены.)

// Иногда наши компоненты сохраняют состояние, которое изначально устанавливается на основе свойств. Исходное состояние наших классов компонентов можно установить в конструкторе или в методе жизненного цикла componentWillMount. Когда эти свойства изменяются, приходится обновлять состояние с помощью метода componentWillReceiveProps

// HiddenMessages
// https://codepen.io/Kvadeck/pen/yLNJpOO

// API React.Children предоставляет способ работы с дочерними компонентами отдельно взятого компонента. Он позволяет вести их подсчет, выполнять их отображение, циклический обход или превращать props.children в массив. Он также позволяет с помощью React.Children.only убеждаться, что на экран выводится единственный дочерний компонент

// В этом примере компонент Display будет показывать только один дочерний компонент, элемент h1. Если компонент Display содержит несколько дочерних компонентов, то React выдаст сообщение об ошибке: onlyChild must be passed a children with exactly one child (onlyChild должны передаваться дочерние компоненты, имеющие только один дочерний компонент).

// https://codepen.io/Kvadeck/pen/vYOXzJr?editors=1010

// Компонент Display выведет на экран один дочерний элемент, когда условие вычисляется в true, или другой, когда вычисляется в false. Для этого создаются компоненты WhenTruthy и WhenFalsy, которые применяются в компоненте Display в качестве дочерних. Функция findChild использует React.Children для преобразования children в массив. Последний можно отфильтровать, чтобы найти и возвратить отдельно взятый дочерний компонент по типу компонента.

// Подключение библиотек JavaScript
// Такие фреймворки, как Angular и jQuery, поставляются со своими собственными средствами доступа к данным, отображения пользовательского интерфейса, моделирования состояния и т. д. В отличие от них React является простой библиотекой для создания представлений, поэтому может понадобиться взаимодействие с другими библиотеками JavaScript. Если хорошо разбираться в работе функций жизненного цикла, то можно заставить React поладить практически с любой библиотекой JavaScript.

// React с jQuery
// Вообще-то использование jQuery с React не находит одобрения со стороны сообщества. И все же объединить jQuery и React вполне возможно, и это может быть неплохим вариантом для изучения React или перевода устаревшего кода на React. Но приложения работают намного лучше, если к React подключаются библиотеки, имеющие меньший объем, чем большие рабочие среды. Кроме того, при использовании jQuery для непосредственного воздействия на DOM игнорируется применение виртуальной DOM, что может привести к возникновению непонятных ошибок.

// https://codepen.io/Kvadeck/pen/abOmaRV?editors=1010

// В следующем примере компонентом CountryList создается упорядоченный список названия стран. После установки компонент выполняет вызов API и изменяет состояние, чтобы отобразить загрузку данных. Состояние loading имеет значение true до тех пор, пока не поступит ответ на этот вызов

// Подключение D3 Timeline
// Updated with last book changes
// https://codepen.io/Kvadeck/pen/XWmpydr?editors=1011

// Компонент высшего порядка (higher-order component, HOC) представляет собой простую функцию, получающую ввиде аргумента один компонент React ивоз-вращающую другой

// HOC позволяют заключать один компонент вдругой. Родительский компонент мо-жет сохранять состояние или содержать функциональность, пригодную для пере-дачи вниз составному компоненту ввиде свойств. Этому составному компоненту ничего не нужно знать ореализации HOC имен свойств иметодов, ккоторым он открывает доступ.
