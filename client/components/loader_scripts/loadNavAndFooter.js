$(onloadFunc)

function onloadFunc() {
    $('#header-loader').load('/components/navbar.html')
    $('#footer-loader').load('/components/footer.html', () => {
        const collapsibles = document.querySelectorAll(".collapsible")
        collapsibles.forEach((item) =>
            item.addEventListener("click", function () {
                this.classList.toggle("collapsible--expanded")
            })
        )
    })
}