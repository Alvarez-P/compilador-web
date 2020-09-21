import compiler from './compiler/compiler.js'
 
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            tokens: [{}],
            errors: [{}],
            lexemes: '',
            filename: 'token-file.txt'
        },
        methods: {
            resetTables (){
                this.tokens.length = 0
                this.errors.length = 0
            },
            setValuesToTables ({ tokens, tokenFile, errors }) {
                this.tokens = tokens
                this.lexemes = tokenFile
                this.errors.push(...errors)
            },
            showLexemsInTokenFileTextArea (){
                const textArea = document.getElementById("archivo-token");
                textArea.value = this.lexemes
                const lines = this.lexemes.split("\n")
                textArea.rows = lines.length
            },
            enableDownloadButton (){
                const btn = document.getElementById("download")
                btn.classList.remove("disabled")
            },
            compile (){
                this.text = document.getElementById("txtarea-code").value
                this.resetTables()
                this.setValuesToTables(compiler(this.text))
                this.showLexemsInTokenFileTextArea()
                this.enableDownloadButton()
            },
            previewFiles (event){
                const file = event.target.files[0]
                this.readTxt(file)
            },
            showTxt (event){
                const textArea = document.getElementById('txtarea-code')
                textArea.value = event.target.result
                const lines = event.target.result.split('\n')
                textArea.rows = lines.length - 1
            },
            readTxt (file){
                const arch = new FileReader()
                arch.addEventListener('load', this.showTxt, false)
                arch.readAsText(file)
            },
            download (text){
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', this.filename);
            
                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();
                document.body.removeChild(element);
            }
        }
    })
})
