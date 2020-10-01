import { compile } from '../compiler/compiler.js'

const codes = [
`void prueba1 ()
{
    a = a + b * 5
    while (a < b)
    {
        a = a * 5
    }
}`
]

const results = []
for (const key in codes){
    const res = compile(codes[key])
    results.push(res)
}

for (const key in results){
    console.log('RESULTADO #', key+1)
    console.log(results[key])
    console.log(codes[key])
    console.log(results[key].tokenFile)
}