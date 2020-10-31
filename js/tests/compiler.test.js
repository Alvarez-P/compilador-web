import { compile } from '../compiler/compiler.js'

const codes = [
`void prueba1(int y)
{
	int a = a + y * 5
	while (y < 8)
	{
		a = a * 5
	}
}
int suma@ (int a, int b, int c)
{
	c = a + b
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