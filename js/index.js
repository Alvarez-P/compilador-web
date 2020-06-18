import compiler from './compiler/compiler.js'
import download from './download.js'
 
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
                this.text = document.getElementById("txtarea-code").value;
                // Reinicio tablas y valores
                this.previous = this.text;
                this.tokens.length = 0
                this.errores.length = 0
                // Valida y obtiene tokens
                const { tokens, tokenFile, errors } = compiler(this.text);
                //for (const token in tokens) this.tokens.push(...tokens[token])
                this.tokens = tokens
                this.lexemas = tokenFile;
                this.errores.push(...errors)
                console.log('ok');
                // Mostrar archivo de tokens
                const ta = document.getElementById("archivo-token");
                ta.value = this.lexemas
                const lineas = this.lexemas.split("\n");
                ta.rows = lineas.length
                // Habilitar boton de descarga
                const btn = document.getElementById("download")
                btn.classList.remove("disabled")
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
