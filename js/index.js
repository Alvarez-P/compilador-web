import compiler from './compiler/compiler.js'
import download from './download.js'
 
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            tokens: [{}],
            errores: [{}],
            lexemas: ''
        },
        methods: {
            resetTables(){
                // Reset Tables and Values
                this.tokens.length = 0
                this.errores.length = 0
            },
            setValuesToTables ({ tokens, tokenFile, errors }) {
                this.tokens = tokens
                this.lexemas = tokenFile;
                this.errores.push(...errors)
            },
            showTokenFile (){
                const textArea = document.getElementById("archivo-token");
                textArea.value = this.lexemas
                const lines = this.lexemas.split("\n")
                textArea.rows = lines.length
            },
            enableDownloadButton (){
                // Habilitar boton de descarga
                const btn = document.getElementById("download")
                btn.classList.remove("disabled")
            },
            compile () {
                this.text = document.getElementById("txtarea-code").value
                this.resetTables()
                this.setValuesToTables(compiler(this.text))
                this.showLexemasInTokenFileTextArea()
                this.enableDownloadButton()
            },
            previewFiles(event) {
                const arch = new FileReader()
                arch.addEventListener('load',this.read,false);
                arch.readAsText(event.target.files[0])
            },
            read(ev) {
                document.getElementById('txtarea-code').value = ev.target.result
                const lineas = ev.target.result.split('\n')
                document.getElementById("txtarea-code").rows = lineas.length - 1
            },
            download(){
                download(this.lexemas)
            }
        }
    })
})
