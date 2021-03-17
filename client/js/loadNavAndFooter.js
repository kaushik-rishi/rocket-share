$(onloadFunc)
console.log('hello')

function onloadFunc() {

    console.log($('#header-loader'))
    console.log($('#footer-loader'))

    $('#header-loader').load('/components/navbar.html')
    $('#footer-loader').load('/components/footer.html')
}