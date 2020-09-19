# Logica del Compilador #

## Estructuras de Datos a Usar ##

### Tabla de Tokens ###

Un array que almacene objetos de tipo Token

### Tabla de Errores ###

Un array que almacena objetos de tipo Error

### Información Contextual ###



### Token ####

### Error ###

## 1 - Separación ##

Una vez se tiene el texto introducido, se separa por Enters o caracteres de nueva línea. Se obtiene un array "Lines" que almacena el texto de cada línea de código. Los Enters en sí no deberían ser parte del array.   
Luego, por cada elemento en "Lines" se separan las cadenas usando espacios, Separadores (,) y Delimitadores ( (, ), {, }). Se tiene un array llamado "Lexems". Los caracteres de Separadores y Delimitadores deben ser elementos de tal array, pero los espacios no.

## 2 - Análisis Sintáctico ##


Aquí se analizan los lexemas de modo que las cosas se escriban de manera correcta.
Por cada elemento de "Lexems" se trata de identificar su tipo de lexema usando RegEx. También se debe pasar la información del objeto Token encontrado aquí cuando se analize el siguiente lexema.

* Tipo de dato (TD) : void, int, String, etc.
* Identificadores (ID): Inicia con _ o una letra minúscula, y los otros símboles pueden ser números o minúsculas. Excepciones son cadenas que estén bajo el criterio de TD o CL.
* Constante numerica (CN): 1, 2, ... 
* Constante lógica (CL): true, false
* Separadores (SEP): ,
* Delimitadores (DEL): (, ), {, }
* Op. de asignación (AS): =
* Operadores (OA): +, -, /, *
* Operadores lógicos (OL): ==, !=, >=, <=
* Instruccion (no tiene un token asignado ni se contabilizan en el archivo de tokens): while

En caso de que no cumpla con ninguno de los criterios anteriores se crea un TokenError con la info. Nota: La descripción del error depende del tipo de lexema que se esperaba.  
¿Cómo se sabe esto? Cada tipo de lexema espera un tipo de lexema en el lexema siguiente. Algunos tipos de lexema se esperan en condiciones especiales.

* Tipo de token anterior
    * Tipo de token que espera [lexema específico que se espera] (condicion bajo la que se espera) {condicion que dispara}

Los tokens esperados son

* TD
    * ID (si es una def. de variable)
* ID
    * SEP (si es una def. de variable)
    * AS (si es una asignacion)
    * OA (si es una operacion aritm.)
    * OL (si es una operacion logica.)
    * DEL [ ) ] (si ya era una condicion de while)
* SEP
    * ID (si es una def. de variables)
    * TD (si es una def. de funcion)
* OA
    * ID (si es una operacion arit.)
    * CN (si es una operacion arit.)
* OL
    * ID (si es una operacion logicq)
    * CN (si es una operacion logica)
* DEL [ ( ]
    * TD (si es una def. de funcion)
    * ID (si es una condicion de while)
* Instrucción [While]
    * DEl [ ( ] (si es una condicion de while)

En caso de que el lexema actual no pertenezca a algún de tipo de lexema, se identifica el tipo de lexema esperado basados en el tipo de lexema anterior y la condición detectada. En el caso de que el tipo anterior es ID y se trata de una operacion lógica, se genera la descripción "Se esperaba una operación lógica"

## 3 - Análisis Semántico ##

En esta etapa se concluye que el código está escrito bien, pero se necesita analizarlo para verificar que tiene sentido. 

## 3 - Registro ##

## 4 - Presentación ##
