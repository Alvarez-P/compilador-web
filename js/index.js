import { compile } from './compiler/compiler.js'
  
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            tokens: [{}],
            triple: [[]],
            errors: [{}],
            lexemes: '',
            filename: 'token-file.txt',
            optimizedCode: ''
        },
        mounted: function() {
            this._editor = new CodeMirror(document.getElementById('codemirror'), {
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 1,
                value: this.text,
                mode:  "javascript",
                theme: 'material-ocean',
                autofocus: true,
                styleSelectedText: true,
                styleActiveLine: { nonEmpty: true },
                scrollbarStyle: 'overlay',
                autoCloseBrackets: true
            });
        
            this._editor.on('changes', () => {
              this.text = this._editor.getValue()
            });
        },
        methods: {
            autoFormat() {
                const totalLines = this._editor.lineCount();
                const totalChars = this._editor.getTextArea().value.length;
                this._editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
            },
            resetTables (){
                this.tokens.length = 0
                this.errors.length = 0
                this.triple.length = 0
            },
            setValuesToTables ({ tokens, tokenFile, errors, triple, tokensLines }) {
                this.tokens = tokens
                this.lexemes = tokenFile
                this.errors.push(...errors)
                this.triple = triple
                this.buildOptimizedCodeTxt(tokensLines)
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
                this.resetTables()
                this.setValuesToTables(compile(this.text))
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
            tripleTotext(){
                let tripleText = '\n\n\nTRIPLO\n\nLinea\tOperador\tDato objeto\tDato Fuente\n'
                this.triple.forEach((line, index) => {
                    tripleText += `${index+1}\t${line.join('\t\t')}\n`
                })
                return tripleText
            },
            buildOptimizedCodeTxt(tokensLines) {
                this.optimizedCode = '\n\nCódigo Optimizado\n\n'
                if (tokensLines.length === 0) {
                    this.optimizedCode += 'No se genera salida\nLas variables no se utilizan'
                } else {
                    tokensLines.forEach(line => {
                        if (line.lineType === 'operation') {
                            line.tokens.forEach(token => {
                                this.optimizedCode += `${token.lexeme} `
                            })
                        }
                        else if(line.lineType === 'while') {
                            this.optimizedCode += 'while ('
                            line.tokens.forEach(token => {
                                this.optimizedCode += ` ${token.lexeme}`
                            })
                            this.optimizedCode += ' )\n{'
                        }
                        else if(line.lineType === 'whileEnd') {
                            this.optimizedCode += '}'
                        }
                        this.optimizedCode += '\n'
                    })
                }
            },
            download (){
                let element = document.createElement('a');
                const fileContent = this.lexemes + this.tripleTotext() + this.optimizedCode
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
                element.setAttribute('download', this.filename);
            
                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();
                document.body.removeChild(element);
            }
        }
    })
})
