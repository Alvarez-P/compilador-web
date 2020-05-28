import { getTokens } from './tokens.js'

const regexp = /^((int|float|boolean|double|char|void)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}\s\(((int|float|boolean|double|char)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9\-_]{0,}(\,\s(int|float|boolean|double|char)\s[a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}){0,}|)\)\s\{\n([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}\s\=\s([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}|[0-9]{1,}(\.[0-9]{1,}){0,1})(\s[+|\-|*|/|%]\s([a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}|[0-9]{1,}(\.[0-9]{1,}){0,1})){1,}\n){1,}\}\n{0,}){1,}/g
 
document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            text: '',
            result: '',
            previous: '',
            res_previous: ''
        },
        methods: {
            validate: () => {
                this.text = document.getElementById("form19").value
                if (this.text === this.previous) {
                    console.log(this.res_previous)
                } else {
                    this.result = regexp.exec(this.text)
                    const res = getTokens(this.text)
                    this.previous = this.text
                    this.res_previous = res
                    console.log(res)
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
            }
        }
    })
})
