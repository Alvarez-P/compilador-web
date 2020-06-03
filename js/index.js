import { getTokens } from './tokens.js'
import download from './download.js'
const regexp = /^((int|float|boolean|double|char|void)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}\s\(((int|float|boolean|double|char)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9\-_]{0,}(\,\s(int|float|boolean|double|char)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}){0,}|)\)\s\{\n([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}\s\=\s([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}|[0-9]{1,}(\.[0-9]{1,}){0,1})(\s[+|\-|*|/|%]\s([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}|[0-9]{1,}(\.[0-9]{1,}){0,1})){1,}\n){1,}\}\n{0,}){1,}/g
 
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            previous: '',
            tokens: [{}],
            errores: [{}],
            lexemas: ''
        },
        methods: {
            validate() {
                this.text = document.getElementById("form19").value
                if (this.text === this.previous) {
                    return
                } else {
                    // Reinicio tablas y valores
                    this.previous = this.text
                    this.tokens.splice(0, this.tokens.length)
                    this.errores.splice(0, this.errores.length)
                    // Valida y obtiene tokens
                    const { tokens, lex, errors } = getTokens(this.text)
                    this.tokens.push(...tokens)
                    this.lexemas = lex
                    this.errores.push(...errors)
                    // Mostrar archivo de tokens
                    const ta = document.getElementById("archivo-token")
                    ta.value = this.lexemas
                    const lineas = this.lexemas.split('\n')
                    ta.rows = lineas.length 
                    // Habilitar boton de descarga
                    const btn = document.getElementById("download")
                    btn.classList.remove("disabled")
                }
            },
            previewFiles(event) {
                const arch = new FileReader()
                arch.addEventListener('load',this.read,false);
                arch.readAsText(event.target.files[0])
            },
            read(ev) {
                document.getElementById('form19').value = ev.target.result
                const lineas = ev.target.result.split('\n')
                document.getElementById("form19").rows = lineas.length - 1
            },
            download(){
                download(this.lexemas)
            }
        }
    })
})
