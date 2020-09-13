import compiler from './compiler/compiler.js'
 
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            previous: '',
            tokens: [{}],
            errores: [{}],
            lexemas: '',
            filename: 'archivo-tokens.txt'
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
                for (const token in tokens) {
                  this.tokens.push(...tokens[token])
                }
                this.lexemas = tokenFile;
                this.errores.push(...errors)
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
            read(event) {
                document.getElementById('txtarea-code').value = event.target.result
                const lines = event.target.result.split('\n')
                document.getElementById("txtarea-code").rows = lines.length - 1
            },
            download(text) {
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
