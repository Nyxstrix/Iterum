import type { Course } from './types';

/** Compact localisation helper — keeps content readable at this volume. */
const L = (en: string, pt: string) => ({ en, pt });

export const fundamentals: Course = {
  id: 'fundamentals',
  numeral: 'I',
  modules: [
    // ---------------------------------------------------------------- M1
    {
      id: 'f-start',
      title: L('Getting started', 'Primeiros passos'),
      summary: L(
        'What a program actually is, and how Python reads yours.',
        'O que é realmente um programa, e como o Python lê o teu.',
      ),
      lessons: [
        {
          id: 'intro-concepts',
          title: L('Introductory concepts', 'Conceitos introdutórios'),
          summary: L(
            'Algorithms, source code, interpreters and why any of it matters.',
            'Algoritmos, código-fonte, interpretadores e porque é que isso importa.',
          ),
          minutes: 8,
          concept: L(
            "A **program** is an ordered list of instructions that transforms input into output. Before it is code, it is an **algorithm**: a finite, unambiguous sequence of steps that always terminates.\n\nWhat you type is **source code**. Python is an **interpreted** language, so an interpreter reads your source line by line and executes it immediately — there is no separate compile step to wait for.\n\n### The loop you will live in\n\nWrite a little, run it, read the result, adjust. That cycle is the whole job.\n\n```python\n# source code\nprint('step 1')\nprint('step 2')\n```\n\nPython executes top to bottom, one statement at a time, and stops at the first error it cannot recover from.",
            "Um **programa** é uma lista ordenada de instruções que transforma entrada em saída. Antes de ser código, é um **algoritmo**: uma sequência finita e não ambígua de passos que termina sempre.\n\nAquilo que escreves é **código-fonte**. O Python é uma linguagem **interpretada**, ou seja, um interpretador lê o código linha a linha e executa-o de imediato — não há um passo de compilação à parte.\n\n### O ciclo em que vais viver\n\nEscreve um pouco, executa, lê o resultado, ajusta. Esse ciclo é o trabalho todo.\n\n```python\n# código-fonte\nprint('passo 1')\nprint('passo 2')\n```\n\nO Python executa de cima para baixo, uma instrução de cada vez, e para no primeiro erro de que não consegue recuperar.",
          ),
          keyPoints: [
            L(
              'An algorithm is the idea; source code is the idea written for a machine.',
              'O algoritmo é a ideia; o código-fonte é a ideia escrita para uma máquina.',
            ),
            L(
              'Python interprets your file top to bottom, statement by statement.',
              'O Python interpreta o teu ficheiro de cima para baixo, instrução a instrução.',
            ),
            L(
              'Execution stops at the first unrecoverable error.',
              'A execução para no primeiro erro irrecuperável.',
            ),
          ],
          exercises: [
            {
              id: 'intro-concepts-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Print two lines: first `Step 1`, then `Step 2`. Order matters.',
                'Imprime duas linhas: primeiro `Step 1`, depois `Step 2`. A ordem importa.',
              ),
              hint: L(
                'Two separate print() calls, one per line.',
                'Duas chamadas print() separadas, uma por linha.',
              ),
              starter: '# Two instructions, in order\n',
              expectedOutput: 'Step 1\nStep 2',
              solution: "print('Step 1')\nprint('Step 2')",
            },
            {
              id: 'intro-concepts-2',
              kind: 'quiz',
              xp: 10,
              prompt: L(
                'Which statement best describes an interpreted language?',
                'Qual afirmação descreve melhor uma linguagem interpretada?',
              ),
              choices: [
                {
                  id: 'a',
                  label: L(
                    'Source is translated to machine code once, ahead of running.',
                    'O código é traduzido para código-máquina uma vez, antes de correr.',
                  ),
                },
                {
                  id: 'b',
                  label: L(
                    'Source is read and executed directly, without a separate build step.',
                    'O código é lido e executado diretamente, sem um passo de compilação.',
                  ),
                },
                {
                  id: 'c',
                  label: L(
                    'The code only runs inside a web browser.',
                    'O código só corre dentro de um navegador.',
                  ),
                },
              ],
              correct: 'b',
              explanation: L(
                'An interpreter executes source directly. Compiled languages such as C translate to machine code first, then run the result.',
                'Um interpretador executa o código diretamente. Linguagens compiladas como o C traduzem primeiro para código-máquina e só depois executam o resultado.',
              ),
            },
          ],
        },
        {
          id: 'python-basics',
          title: L('Python language basics', 'Bases da linguagem Python'),
          summary: L(
            'Statements, comments, indentation and the print function.',
            'Instruções, comentários, indentação e a função print.',
          ),
          minutes: 10,
          concept: L(
            "Each line is normally one **statement**. Python has no semicolons or braces: **indentation** is the syntax that groups statements into blocks, and it must be consistent — four spaces is the convention.\n\nAnything after `#` on a line is a **comment**. Python ignores it; it is there for the human reading your code.\n\n### print\n\n`print()` writes to the console and adds a newline. Pass several values and it joins them with a space.\n\n```python\nprint('Hello')            # one value\nprint('a', 'b', 'c')      # a b c\nprint('no newline', end='')\n```\n\nText inside quotes is a **string**. Single and double quotes are interchangeable — pick one and be consistent.",
            "Cada linha é normalmente uma **instrução**. O Python não usa ponto e vírgula nem chavetas: a **indentação** é a sintaxe que agrupa instruções em blocos, e tem de ser consistente — a convenção são quatro espaços.\n\nTudo o que vem depois de `#` numa linha é um **comentário**. O Python ignora-o; existe para quem lê o código.\n\n### print\n\n`print()` escreve na consola e acrescenta uma mudança de linha. Se passares vários valores, junta-os com um espaço.\n\n```python\nprint('Olá')              # um valor\nprint('a', 'b', 'c')      # a b c\nprint('sem nova linha', end='')\n```\n\nTexto entre aspas é uma **string**. Aspas simples e duplas são equivalentes — escolhe umas e sê consistente.",
          ),
          keyPoints: [
            L(
              'Indentation defines blocks — it is syntax, not decoration.',
              'A indentação define blocos — é sintaxe, não decoração.',
            ),
            L('`#` starts a comment that Python ignores.', '`#` inicia um comentário que o Python ignora.'),
            L(
              'print() separates multiple values with a space and ends with a newline.',
              'print() separa vários valores com um espaço e termina com uma nova linha.',
            ),
          ],
          exercises: [
            {
              id: 'python-basics-1',
              kind: 'predict',
              xp: 10,
              prompt: L('Trace this code and type its exact output.', 'Segue este código e escreve a saída exata.'),
              snippet: `print('a', 'b')
# print('hidden')
print('c')`,
              expectedOutput: 'a b\nc',
              explanation: L(
                'The middle line is a comment, so it never runs. Multiple arguments to print are joined by a single space.',
                'A linha do meio é um comentário, por isso nunca corre. Vários argumentos do print são unidos por um único espaço.',
              ),
            },
            {
              id: 'python-basics-2',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Print exactly `Python 3` using a single print call with two arguments.',
                'Imprime exatamente `Python 3` com uma única chamada print e dois argumentos.',
              ),
              hint: L(
                "print() puts a space between arguments: print('Python', 3)",
                "print() coloca um espaço entre argumentos: print('Python', 3)",
              ),
              starter: '# One call, two arguments\n',
              expectedOutput: 'Python 3',
              solution: "print('Python', 3)",
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M2
    {
      id: 'f-data',
      title: L('Data and variables', 'Dados e variáveis'),
      summary: L(
        'Elementary types, names for values, arithmetic and talking to the console.',
        'Tipos elementares, nomes para valores, aritmética e diálogo com a consola.',
      ),
      lessons: [
        {
          id: 'data-types',
          title: L('Elementary data types', 'Tipos de dados elementares'),
          summary: L(
            'int, float, str and bool — and how to ask what you are holding.',
            'int, float, str e bool — e como perguntar o que tens em mãos.',
          ),
          minutes: 9,
          concept: L(
            "Python has four elementary types you will use constantly:\n\n- `int` — whole numbers: `42`, `-7`\n- `float` — numbers with a decimal point: `3.14`, `2.0`\n- `str` — text in quotes: `'hello'`\n- `bool` — `True` or `False`\n\nEvery value carries its type with it. `type(value)` tells you which one.\n\n```python\nprint(type(42))       # <class 'int'>\nprint(type(2.0))      # <class 'float'>\nprint(type('42'))     # <class 'str'>\nprint(type(True))     # <class 'bool'>\n```\n\nNote that `2.0` is a float even though it is a whole number, and `'42'` is a string even though it looks numeric. The quotes decide.",
            "O Python tem quatro tipos elementares que vais usar constantemente:\n\n- `int` — números inteiros: `42`, `-7`\n- `float` — números com ponto decimal: `3.14`, `2.0`\n- `str` — texto entre aspas: `'olá'`\n- `bool` — `True` ou `False`\n\nCada valor traz o seu tipo consigo. `type(valor)` diz-te qual é.\n\n```python\nprint(type(42))       # <class 'int'>\nprint(type(2.0))      # <class 'float'>\nprint(type('42'))     # <class 'str'>\nprint(type(True))     # <class 'bool'>\n```\n\nRepara que `2.0` é um float mesmo sendo um número inteiro, e `'42'` é uma string mesmo parecendo numérico. As aspas decidem.",
          ),
          keyPoints: [
            L('A decimal point makes a float, even `2.0`.', 'Um ponto decimal faz um float, mesmo `2.0`.'),
            L('Quotes make a string, even `\'42\'`.', 'As aspas fazem uma string, mesmo `\'42\'`.'),
            L('`type(x)` reports the type of any value.', '`type(x)` indica o tipo de qualquer valor.'),
          ],
          exercises: [
            {
              id: 'data-types-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Print the type of `7`, then the type of `7.0`, one per line.',
                'Imprime o tipo de `7` e depois o tipo de `7.0`, um por linha.',
              ),
              hint: L('print(type(7)) prints the class.', 'print(type(7)) imprime a classe.'),
              starter: '# Inspect two types\n',
              expectedOutput: "<class 'int'>\n<class 'float'>",
              solution: 'print(type(7))\nprint(type(7.0))',
            },
            {
              id: 'data-types-2',
              kind: 'quiz',
              xp: 10,
              prompt: L('What is the type of the value `"3.5"`?', 'Qual é o tipo do valor `"3.5"`?'),
              choices: [
                { id: 'a', label: L('float', 'float') },
                { id: 'b', label: L('str', 'str') },
                { id: 'c', label: L('int', 'int') },
              ],
              correct: 'b',
              explanation: L(
                'It is written in quotes, so it is text. To do arithmetic with it you would need float("3.5") first.',
                'Está escrito entre aspas, logo é texto. Para fazer aritmética com ele terias de usar float("3.5") primeiro.',
              ),
            },
          ],
        },
        {
          id: 'variables',
          title: L('Variables and constants', 'Variáveis e constantes'),
          summary: L(
            'Binding names to values, and the convention that marks something as fixed.',
            'Ligar nomes a valores, e a convenção que marca algo como fixo.',
          ),
          minutes: 9,
          concept: L(
            "A **variable** is a name bound to a value. Assignment uses a single `=`, always name on the left:\n\n```python\nage = 25\nname = 'Ana'\nage = age + 1     # rebinding is allowed\nprint(age)        # 26\n```\n\nNames may contain letters, digits and underscores, must not start with a digit, and are case sensitive: `total` and `Total` are different names.\n\n### Constants\n\nPython has no true constants. The convention is an ALL_CAPS name, which tells other programmers *do not reassign this*:\n\n```python\nMAX_ATTEMPTS = 3\nPI = 3.14159\n```\n\nThe language will not stop you from changing it — your teammates will.",
            "Uma **variável** é um nome ligado a um valor. A atribuição usa um único `=`, sempre com o nome à esquerda:\n\n```python\nidade = 25\nnome = 'Ana'\nidade = idade + 1   # é permitido religar\nprint(idade)        # 26\n```\n\nOs nomes podem conter letras, dígitos e underscores, não podem começar por dígito, e são sensíveis a maiúsculas: `total` e `Total` são nomes diferentes.\n\n### Constantes\n\nO Python não tem constantes verdadeiras. A convenção é um nome em MAIÚSCULAS, que diz aos outros programadores *não reatribuir isto*:\n\n```python\nMAX_TENTATIVAS = 3\nPI = 3.14159\n```\n\nA linguagem não te impede de alterar — os teus colegas é que impedem.",
          ),
          keyPoints: [
            L('`=` assigns; the name goes on the left.', '`=` atribui; o nome fica à esquerda.'),
            L('Names are case sensitive and cannot start with a digit.', 'Os nomes são sensíveis a maiúsculas e não podem começar por dígito.'),
            L('ALL_CAPS signals a constant by convention only.', 'MAIÚSCULAS sinalizam uma constante apenas por convenção.'),
          ],
          exercises: [
            {
              id: 'variables-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Create `width = 8` and `height = 5`, then print their product.',
                'Cria `largura = 8` e `altura = 5` e imprime o produto.',
              ),
              hint: L('Multiply with `*`.', 'Multiplica com `*`.'),
              starter: '# Two variables, one product\n',
              expectedOutput: '40',
              solution: 'width = 8\nheight = 5\nprint(width * height)',
            },
            {
              id: 'variables-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `x = 10
y = x
x = 3
print(x, y)`,
              expectedOutput: '3 10',
              explanation: L(
                '`y = x` copies the value 10 at that moment. Rebinding `x` afterwards does not reach back and change `y`.',
                '`y = x` copia o valor 10 naquele momento. Religar `x` depois não altera o `y` retroativamente.',
              ),
            },
          ],
        },
        {
          id: 'arithmetic',
          title: L('Arithmetic and type conversion', 'Aritmética e conversão de tipos'),
          summary: L(
            'Operators, precedence, integer division, and moving between types.',
            'Operadores, precedência, divisão inteira e passagem entre tipos.',
          ),
          minutes: 11,
          concept: L(
            "The operators, in precedence order: `**` then `*` `/` `//` `%` then `+` `-`. Parentheses override everything.\n\n```python\nprint(7 / 2)    # 3.5   true division, always float\nprint(7 // 2)   # 3     floor division\nprint(7 % 2)    # 1     remainder\nprint(2 ** 10)  # 1024  power\n```\n\n### Converting\n\n`int()`, `float()` and `str()` build a new value of that type:\n\n```python\nprint(int('42') + 8)     # 50\nprint(str(42) + '8')     # 428\nprint(int(3.9))          # 3, truncated toward zero\n```\n\nMixing types without converting is an error: `'42' + 8` raises `TypeError`. Python refuses to guess what you meant.",
            "Os operadores, por ordem de precedência: `**`, depois `*` `/` `//` `%`, depois `+` `-`. Os parênteses sobrepõem-se a tudo.\n\n```python\nprint(7 / 2)    # 3.5   divisão real, sempre float\nprint(7 // 2)   # 3     divisão inteira\nprint(7 % 2)    # 1     resto\nprint(2 ** 10)  # 1024  potência\n```\n\n### Converter\n\n`int()`, `float()` e `str()` constroem um novo valor desse tipo:\n\n```python\nprint(int('42') + 8)     # 50\nprint(str(42) + '8')     # 428\nprint(int(3.9))          # 3, truncado para zero\n```\n\nMisturar tipos sem converter é erro: `'42' + 8` lança `TypeError`. O Python recusa-se a adivinhar.",
          ),
          keyPoints: [
            L('`/` always gives a float; `//` floors to an int.', '`/` dá sempre float; `//` trunca para inteiro.'),
            L('`%` is the remainder — the workhorse of even/odd tests.', '`%` é o resto — a ferramenta para testar par/ímpar.'),
            L('`int()` truncates toward zero, it does not round.', '`int()` trunca para zero, não arredonda.'),
          ],
          exercises: [
            {
              id: 'arithmetic-1',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `print(9 // 4)
print(9 % 4)
print(9 / 4)`,
              expectedOutput: '2\n1\n2.25',
              explanation: L(
                'Floor division discards the fraction, `%` keeps the remainder, and `/` always produces a float.',
                'A divisão inteira descarta a fração, `%` guarda o resto, e `/` produz sempre um float.',
              ),
            },
            {
              id: 'arithmetic-2',
              kind: 'code',
              xp: 10,
              prompt: L(
                'The string `"120"` holds a number of minutes. Convert it and print how many whole hours that is.',
                'A string `"120"` contém um número de minutos. Converte-a e imprime quantas horas inteiras são.',
              ),
              hint: L('int() first, then // 60.', 'Primeiro int(), depois // 60.'),
              starter: "minutes = '120'\n# Convert, then divide\n",
              expectedOutput: '2',
              solution: "minutes = '120'\nprint(int(minutes) // 60)",
            },
          ],
        },
        {
          id: 'console-io',
          title: L('Console input and output', 'Entrada e saída na consola'),
          summary: L(
            'Reading from the user with input(), formatting results with f-strings.',
            'Ler do utilizador com input(), formatar resultados com f-strings.',
          ),
          minutes: 10,
          concept: L(
            "`input()` pauses the program, waits for a line, and returns it **as a string** — always, even if the user typed digits.\n\n```python\nname = input('Your name: ')\nage = int(input('Your age: '))   # convert to do maths\n```\n\n### f-strings\n\nPrefix a string with `f` and any `{expression}` inside it is evaluated and inserted:\n\n```python\nname = 'Ana'\nitems = 3\nprint(f'{name} has {items} items')\nprint(f'Next year: {items + 1}')\n```\n\nf-strings are the modern way to build output. Concatenating with `+` forces you to convert every non-string by hand.",
            "`input()` pausa o programa, espera por uma linha e devolve-a **como string** — sempre, mesmo que o utilizador escreva dígitos.\n\n```python\nnome = input('O teu nome: ')\nidade = int(input('A tua idade: '))   # converter para fazer contas\n```\n\n### f-strings\n\nPrefixa uma string com `f` e qualquer `{expressão}` lá dentro é avaliada e inserida:\n\n```python\nnome = 'Ana'\nitens = 3\nprint(f'{nome} tem {itens} itens')\nprint(f'Para o ano: {itens + 1}')\n```\n\nAs f-strings são a forma moderna de construir saída. Concatenar com `+` obriga-te a converter à mão tudo o que não seja string.",
          ),
          keyPoints: [
            L('input() always returns a string.', 'input() devolve sempre uma string.'),
            L('Convert with int() or float() before doing arithmetic.', 'Converte com int() ou float() antes de fazer aritmética.'),
            L('f-strings evaluate any expression inside `{}`.', 'As f-strings avaliam qualquer expressão dentro de `{}`.'),
          ],
          exercises: [
            {
              id: 'console-io-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Read a colour with input() and print `Your favourite colour is blue`. The test supplies `blue`.',
                'Lê uma cor com input() e imprime `Your favourite colour is blue`. O teste fornece `blue`.',
              ),
              hint: L('Use an f-string for the output line.', 'Usa uma f-string na linha de saída.'),
              starter: '# Read, then respond\n',
              stdin: 'blue',
              expectedOutput: 'Your favourite colour is blue',
              solution: "colour = input('Favourite colour? ')\nprint(f'Your favourite colour is {colour}')",
            },
            {
              id: 'console-io-2',
              kind: 'quiz',
              xp: 10,
              prompt: L(
                'A user types `5`. What does `input()` return?',
                'Um utilizador escreve `5`. O que devolve `input()`?',
              ),
              choices: [
                { id: 'a', label: L('The integer 5', 'O inteiro 5') },
                { id: 'b', label: L("The string '5'", "A string '5'") },
                { id: 'c', label: L('It depends on what was typed', 'Depende do que foi escrito') },
              ],
              correct: 'b',
              explanation: L(
                'input() never converts. `5 + input()` fails; `5 + int(input())` works.',
                'input() nunca converte. `5 + input()` falha; `5 + int(input())` funciona.',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M3
    {
      id: 'f-decisions',
      title: L('Making decisions', 'Tomar decisões'),
      summary: L(
        'Conditions, boolean logic, and branching your program.',
        'Condições, lógica booleana e ramificação do programa.',
      ),
      lessons: [
        {
          id: 'conditions',
          title: L('Testing and conditions', 'Testes e condições'),
          summary: L(
            'Boolean values, comparisons, and what Python considers true.',
            'Valores booleanos, comparações e o que o Python considera verdadeiro.',
          ),
          minutes: 8,
          concept: L(
            "A **condition** is any expression that evaluates to `True` or `False`. Comparison operators produce booleans directly:\n\n```python\nprint(5 > 3)      # True\nprint(5 == 3)     # False\nprint(5 != 3)     # True\n```\n\nNote `==` compares, `=` assigns. Confusing them is the single most common beginner bug.\n\n### Truthiness\n\nNon-boolean values also work in a condition. Python treats these as false: `0`, `0.0`, `''`, `[]`, `{}`, `None`. Everything else is true.\n\n```python\nprint(bool(0))      # False\nprint(bool(''))     # False\nprint(bool('no'))   # True  — a non-empty string\n```",
            "Uma **condição** é qualquer expressão que resulta em `True` ou `False`. Os operadores de comparação produzem booleanos diretamente:\n\n```python\nprint(5 > 3)      # True\nprint(5 == 3)     # False\nprint(5 != 3)     # True\n```\n\nAtenção: `==` compara, `=` atribui. Confundi-los é o erro mais comum de quem começa.\n\n### Valores verdadeiros\n\nValores não booleanos também funcionam numa condição. O Python trata estes como falsos: `0`, `0.0`, `''`, `[]`, `{}`, `None`. Todos os outros são verdadeiros.\n\n```python\nprint(bool(0))      # False\nprint(bool(''))     # False\nprint(bool('não'))  # True  — string não vazia\n```",
          ),
          keyPoints: [
            L('`==` compares, `=` assigns.', '`==` compara, `=` atribui.'),
            L('Empty things (0, "", [], {}) are falsy.', 'Coisas vazias (0, "", [], {}) são falsas.'),
            L('Any non-empty container or non-zero number is truthy.', 'Qualquer contentor não vazio ou número diferente de zero é verdadeiro.'),
          ],
          exercises: [
            {
              id: 'conditions-1',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `print(bool(''))
print(bool('0'))
print(10 == 10.0)`,
              expectedOutput: 'False\nTrue\nTrue',
              explanation: L(
                'An empty string is falsy, but the string "0" is not empty so it is truthy. And 10 equals 10.0 numerically even across int and float.',
                'Uma string vazia é falsa, mas a string "0" não está vazia, logo é verdadeira. E 10 é numericamente igual a 10.0, mesmo entre int e float.',
              ),
            },
            {
              id: 'conditions-2',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Print whether 17 is odd, as a boolean — the result of testing that its remainder by 2 is 1.',
                'Imprime se 17 é ímpar, como booleano — o resultado de testar se o resto por 2 é 1.',
              ),
              hint: L('`17 % 2 == 1` is already a boolean.', '`17 % 2 == 1` já é um booleano.'),
              starter: '# Print a boolean\n',
              expectedOutput: 'True',
              solution: 'print(17 % 2 == 1)',
            },
          ],
        },
        {
          id: 'operators',
          title: L('Logical and relational operators', 'Operadores lógicos e relacionais'),
          summary: L(
            'Combining tests with and, or, not — and chaining comparisons.',
            'Combinar testes com and, or, not — e encadear comparações.',
          ),
          minutes: 9,
          concept: L(
            "Relational operators compare: `==` `!=` `<` `>` `<=` `>=`.\n\nLogical operators combine conditions:\n\n- `and` — true only if both sides are true\n- `or` — true if at least one side is true\n- `not` — flips the result\n\n```python\nage = 20\nprint(age >= 18 and age < 65)   # True\nprint(not (age == 20))          # False\n```\n\n### Chaining\n\nPython lets you chain comparisons the way mathematics does, and it reads better than the `and` version:\n\n```python\nprint(0 <= age <= 120)   # True\n```\n\nPrecedence: `not` binds tightest, then `and`, then `or`. When in doubt, parenthesise.",
            "Os operadores relacionais comparam: `==` `!=` `<` `>` `<=` `>=`.\n\nOs operadores lógicos combinam condições:\n\n- `and` — verdadeiro só se ambos os lados forem verdadeiros\n- `or` — verdadeiro se pelo menos um lado for verdadeiro\n- `not` — inverte o resultado\n\n```python\nidade = 20\nprint(idade >= 18 and idade < 65)   # True\nprint(not (idade == 20))            # False\n```\n\n### Encadear\n\nO Python deixa-te encadear comparações como na matemática, e lê-se melhor do que a versão com `and`:\n\n```python\nprint(0 <= idade <= 120)   # True\n```\n\nPrecedência: `not` liga mais forte, depois `and`, depois `or`. Na dúvida, usa parênteses.",
          ),
          keyPoints: [
            L('`and` needs both sides; `or` needs one.', '`and` precisa dos dois lados; `or` precisa de um.'),
            L('Comparisons chain: `0 <= x <= 10`.', 'As comparações encadeiam: `0 <= x <= 10`.'),
            L('Precedence is `not` > `and` > `or`.', 'A precedência é `not` > `and` > `or`.'),
          ],
          exercises: [
            {
              id: 'operators-1',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `print(True or False and False)
print((True or False) and False)`,
              expectedOutput: 'True\nFalse',
              explanation: L(
                '`and` binds tighter than `or`, so the first line is `True or (False and False)` which is True. Parentheses in the second line force the other grouping.',
                '`and` liga mais forte que `or`, por isso a primeira linha é `True or (False and False)`, que dá True. Os parênteses da segunda linha forçam o outro agrupamento.',
              ),
            },
            {
              id: 'operators-2',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Given `score = 74`, print True if it is between 70 and 79 inclusive. Use a chained comparison.',
                'Dado `nota = 74`, imprime True se estiver entre 70 e 79 inclusive. Usa uma comparação encadeada.',
              ),
              hint: L('`70 <= score <= 79`', '`70 <= nota <= 79`'),
              starter: 'score = 74\n# One chained comparison\n',
              expectedOutput: 'True',
              solution: 'score = 74\nprint(70 <= score <= 79)',
            },
          ],
        },
        {
          id: 'if-else',
          title: L('Conditional statements', 'Instruções condicionais'),
          summary: L('if, if-else and elif chains.', 'Cadeias if, if-else e elif.'),
          minutes: 11,
          concept: L(
            "`if` runs a block only when its condition is true. The block is everything indented under it.\n\n```python\ntemperature = 31\n\nif temperature > 30:\n    print('Hot')\nelif temperature > 15:\n    print('Mild')\nelse:\n    print('Cold')\n```\n\nPython checks the branches **in order** and takes the first one that matches, then skips the rest entirely. That is why ordering matters: if you test `> 15` before `> 30`, nothing will ever be reported as hot.\n\n`elif` and `else` are both optional. A bare `if` is perfectly normal.",
            "`if` executa um bloco apenas quando a condição é verdadeira. O bloco é tudo o que está indentado por baixo.\n\n```python\ntemperatura = 31\n\nif temperatura > 30:\n    print('Quente')\nelif temperatura > 15:\n    print('Ameno')\nelse:\n    print('Frio')\n```\n\nO Python verifica os ramos **por ordem** e escolhe o primeiro que corresponde, ignorando totalmente os restantes. É por isso que a ordem importa: se testares `> 15` antes de `> 30`, nada será alguma vez classificado como quente.\n\n`elif` e `else` são ambos opcionais. Um `if` sozinho é perfeitamente normal.",
          ),
          keyPoints: [
            L('Branches are tested in order; the first match wins.', 'Os ramos são testados por ordem; o primeiro que corresponder ganha.'),
            L('The indented block under `if` is what runs conditionally.', 'O bloco indentado sob o `if` é o que corre condicionalmente.'),
            L('Put the most specific condition first.', 'Coloca a condição mais específica primeiro.'),
          ],
          exercises: [
            {
              id: 'if-else-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Given `mark = 13`, print `Pass` if it is 10 or more, otherwise `Fail`.',
                'Dado `mark = 13`, imprime `Pass` se for 10 ou mais, caso contrário `Fail`.',
              ),
              hint: L('if mark >= 10: ... else: ...', 'if mark >= 10: ... else: ...'),
              starter: 'mark = 13\n# Branch on the mark\n',
              expectedOutput: 'Pass',
              solution: "mark = 13\nif mark >= 10:\n    print('Pass')\nelse:\n    print('Fail')",
            },
            {
              id: 'if-else-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `n = 100
if n > 10:
    print('big')
elif n > 50:
    print('huge')
else:
    print('small')`,
              expectedOutput: 'big',
              explanation: L(
                'The first condition already matches, so the elif is never evaluated — even though 100 is also greater than 50. Order your conditions from most specific to least.',
                'A primeira condição já corresponde, por isso o elif nunca é avaliado — mesmo que 100 também seja maior que 50. Ordena as condições da mais específica para a menos específica.',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M4
    {
      id: 'f-loops',
      title: L('Repetition', 'Repetição'),
      summary: L('Doing something many times without writing it many times.', 'Fazer algo muitas vezes sem o escrever muitas vezes.'),
      lessons: [
        {
          id: 'while-loops',
          title: L('while loops', 'Ciclos while'),
          summary: L('Repeat while a condition holds, and how not to loop forever.', 'Repetir enquanto uma condição se mantém, e como não ficar em ciclo infinito.'),
          minutes: 10,
          concept: L(
            "A `while` loop repeats its block for as long as the condition stays true. It is the right choice when you do not know in advance how many iterations you need.\n\n```python\ncount = 1\nwhile count <= 3:\n    print(count)\n    count += 1     # without this, it never ends\n```\n\nThree things every while loop needs: initialise something before, test it in the condition, and **change it inside the body**. Forget the third and you have an infinite loop.\n\n### break and continue\n\n`break` leaves the loop immediately. `continue` skips to the next iteration.\n\n```python\nn = 0\nwhile True:\n    n += 1\n    if n == 3:\n        break\nprint(n)   # 3\n```",
            "Um ciclo `while` repete o seu bloco enquanto a condição se mantiver verdadeira. É a escolha certa quando não sabes de antemão quantas iterações precisas.\n\n```python\ncontador = 1\nwhile contador <= 3:\n    print(contador)\n    contador += 1     # sem isto, nunca termina\n```\n\nTrês coisas que todo o ciclo while precisa: inicializar algo antes, testá-lo na condição, e **alterá-lo dentro do corpo**. Esquece a terceira e tens um ciclo infinito.\n\n### break e continue\n\n`break` sai do ciclo imediatamente. `continue` salta para a iteração seguinte.\n\n```python\nn = 0\nwhile True:\n    n += 1\n    if n == 3:\n        break\nprint(n)   # 3\n```",
          ),
          keyPoints: [
            L('Something in the condition must change inside the body.', 'Algo na condição tem de mudar dentro do corpo.'),
            L('`+=` is shorthand for `x = x + 1`.', '`+=` é abreviatura de `x = x + 1`.'),
            L('`break` exits the loop; `continue` skips one iteration.', '`break` sai do ciclo; `continue` salta uma iteração.'),
          ],
          exercises: [
            {
              id: 'while-loops-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Use a while loop to print 1, 2 and 3 — one per line.',
                'Usa um ciclo while para imprimir 1, 2 e 3 — um por linha.',
              ),
              hint: L('Start at 1, loop while <= 3, increment each pass.', 'Começa em 1, repete enquanto <= 3, incrementa em cada passagem.'),
              starter: 'count = 1\n# Loop until 3\n',
              expectedOutput: '1\n2\n3',
              solution: 'count = 1\nwhile count <= 3:\n    print(count)\n    count += 1',
            },
            {
              id: 'while-loops-2',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Sum the numbers 1 to 10 with a while loop and print the total.',
                'Soma os números de 1 a 10 com um ciclo while e imprime o total.',
              ),
              hint: L('Keep a running total starting at 0.', 'Mantém um acumulador a começar em 0.'),
              starter: 'total = 0\nn = 1\n# Accumulate, then print\n',
              expectedOutput: '55',
              solution: 'total = 0\nn = 1\nwhile n <= 10:\n    total += n\n    n += 1\nprint(total)',
            },
          ],
        },
        {
          id: 'for-loops',
          title: L('for loops and range', 'Ciclos for e range'),
          summary: L('Iterating over a known sequence of values.', 'Iterar sobre uma sequência conhecida de valores.'),
          minutes: 10,
          concept: L(
            "A `for` loop walks through the items of a sequence, binding each to a variable in turn:\n\n```python\nfor fruit in ['apple', 'pear']:\n    print(fruit)\n```\n\n### range\n\n`range(stop)` counts from 0. `range(start, stop)` counts from start, and **stop is never included**:\n\n```python\nfor i in range(3):        # 0 1 2\n    print(i)\n\nfor i in range(1, 4):     # 1 2 3\n    print(i)\n\nfor i in range(0, 10, 2): # 0 2 4 6 8\n    print(i)\n```\n\nReach for `for` when the number of iterations is known, and `while` when it depends on something that happens during the loop.",
            "Um ciclo `for` percorre os itens de uma sequência, ligando cada um a uma variável de cada vez:\n\n```python\nfor fruta in ['maçã', 'pera']:\n    print(fruta)\n```\n\n### range\n\n`range(fim)` conta a partir de 0. `range(início, fim)` conta a partir do início, e **o fim nunca é incluído**:\n\n```python\nfor i in range(3):        # 0 1 2\n    print(i)\n\nfor i in range(1, 4):     # 1 2 3\n    print(i)\n\nfor i in range(0, 10, 2): # 0 2 4 6 8\n    print(i)\n```\n\nUsa `for` quando o número de iterações é conhecido, e `while` quando depende de algo que acontece durante o ciclo.",
          ),
          keyPoints: [
            L('`range` excludes its stop value.', '`range` exclui o valor final.'),
            L('`for` is for known counts, `while` for unknown ones.', '`for` é para contagens conhecidas, `while` para desconhecidas.'),
            L('A for loop can walk any sequence, not just numbers.', 'Um ciclo for percorre qualquer sequência, não só números.'),
          ],
          exercises: [
            {
              id: 'for-loops-1',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `for i in range(2, 9, 3):
    print(i)`,
              expectedOutput: '2\n5\n8',
              explanation: L(
                'Start at 2, step by 3, stop before 9: 2, 5, 8. The next value would be 11, which is past the stop.',
                'Começa em 2, salta de 3 em 3, para antes de 9: 2, 5, 8. O valor seguinte seria 11, já além do fim.',
              ),
            },
            {
              id: 'for-loops-2',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Print each number from the list `[1, 2, 3, 4, 5]` multiplied by 2, one per line.',
                'Imprime cada número da lista `[1, 2, 3, 4, 5]` multiplicado por 2, um por linha.',
              ),
              hint: L('for n in numbers: print(n * 2)', 'for n in numeros: print(n * 2)'),
              starter: 'numbers = [1, 2, 3, 4, 5]\n# Double each one\n',
              expectedOutput: '2\n4\n6\n8\n10',
              solution: 'numbers = [1, 2, 3, 4, 5]\nfor n in numbers:\n    print(n * 2)',
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M5
    {
      id: 'f-functions',
      title: L('Functions', 'Funções'),
      summary: L('Naming a piece of behaviour so you can reuse it.', 'Dar nome a um comportamento para o poderes reutilizar.'),
      lessons: [
        {
          id: 'functions',
          title: L('Defining functions', 'Definir funções'),
          summary: L('def, parameters, arguments, return values and defaults.', 'def, parâmetros, argumentos, valores de retorno e predefinições.'),
          minutes: 12,
          concept: L(
            "A function packages a block of code under a name so you can run it whenever you like.\n\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('World'))\n```\n\n**Parameters** are the names in the definition (`name`). **Arguments** are the values you pass at the call (`'World'`).\n\n### return vs print\n\n`return` hands a value back to the caller. `print` only shows text. A function with no `return` gives back `None`.\n\n```python\ndef add(a, b):\n    return a + b\n\ndef show(a, b):\n    print(a + b)\n\ntotal = add(2, 3)      # total is 5\nnothing = show(2, 3)   # prints 5, nothing is None\n```\n\n### Defaults\n\n```python\ndef greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n```",
            "Uma função empacota um bloco de código sob um nome para o poderes executar quando quiseres.\n\n```python\ndef saudar(nome):\n    return f'Olá, {nome}!'\n\nprint(saudar('Mundo'))\n```\n\nOs **parâmetros** são os nomes na definição (`nome`). Os **argumentos** são os valores que passas na chamada (`'Mundo'`).\n\n### return vs print\n\n`return` devolve um valor a quem chamou. `print` apenas mostra texto. Uma função sem `return` devolve `None`.\n\n```python\ndef somar(a, b):\n    return a + b\n\ndef mostrar(a, b):\n    print(a + b)\n\ntotal = somar(2, 3)      # total é 5\nnada = mostrar(2, 3)     # imprime 5, nada é None\n```\n\n### Predefinições\n\n```python\ndef saudar(nome, saudacao='Olá'):\n    return f'{saudacao}, {nome}!'\n```",
          ),
          keyPoints: [
            L('`return` gives a value back; `print` only displays.', '`return` devolve um valor; `print` apenas mostra.'),
            L('A function without return evaluates to None.', 'Uma função sem return resulta em None.'),
            L('Default parameters make arguments optional.', 'Parâmetros com predefinição tornam argumentos opcionais.'),
          ],
          exercises: [
            {
              id: 'functions-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                "Write a function `say_hello(name)` that returns `Hello, <name>!`, then print the result of calling it with `World`.",
                "Escreve uma função `say_hello(name)` que devolve `Hello, <name>!` e imprime o resultado de a chamar com `World`.",
              ),
              hint: L('Return an f-string, then print the call.', 'Devolve uma f-string e depois imprime a chamada.'),
              starter: '# Define, then call\n',
              expectedOutput: 'Hello, World!',
              solution: "def say_hello(name):\n    return f'Hello, {name}!'\n\nprint(say_hello('World'))",
            },
            {
              id: 'functions-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `def double(n):
    print(n * 2)

result = double(4)
print(result)`,
              expectedOutput: '8\nNone',
              explanation: L(
                'The function prints 8 but has no return, so it hands back None — which the second print then displays.',
                'A função imprime 8 mas não tem return, por isso devolve None — que o segundo print depois mostra.',
              ),
            },
          ],
        },
        {
          id: 'scope',
          title: L('Local and global variables', 'Variáveis locais e globais'),
          summary: L('Where a name lives, and how long it lives there.', 'Onde vive um nome, e durante quanto tempo.'),
          minutes: 10,
          concept: L(
            "A variable assigned **inside** a function is **local**: it is created when the call starts and destroyed when it returns. Code outside cannot see it.\n\n```python\ndef f():\n    x = 10      # local\n    print(x)\n\nf()\n# print(x)    # NameError — x does not exist out here\n```\n\nA variable assigned at module level is **global**. Functions can read it freely:\n\n```python\nLIMIT = 5\n\ndef check(n):\n    return n < LIMIT    # reading a global is fine\n```\n\n### Assigning to a global\n\nAssigning inside a function creates a *new local* that shadows the global, unless you declare `global`:\n\n```python\ncount = 0\n\ndef bump():\n    global count\n    count += 1\n\nbump()\nprint(count)   # 1\n```\n\nPrefer parameters and return values over `global`. Shared mutable state is where bugs breed.",
            "Uma variável atribuída **dentro** de uma função é **local**: é criada quando a chamada começa e destruída quando termina. Código de fora não a consegue ver.\n\n```python\ndef f():\n    x = 10      # local\n    print(x)\n\nf()\n# print(x)    # NameError — x não existe aqui fora\n```\n\nUma variável atribuída ao nível do módulo é **global**. As funções podem lê-la livremente:\n\n```python\nLIMITE = 5\n\ndef verificar(n):\n    return n < LIMITE    # ler uma global não tem problema\n```\n\n### Atribuir a uma global\n\nAtribuir dentro de uma função cria uma *nova local* que oculta a global, a menos que declares `global`:\n\n```python\ncontador = 0\n\ndef incrementar():\n    global contador\n    contador += 1\n\nincrementar()\nprint(contador)   # 1\n```\n\nPrefere parâmetros e valores de retorno em vez de `global`. Estado partilhado mutável é onde nascem os bugs.",
          ),
          keyPoints: [
            L('Assignment inside a function creates a local by default.', 'Atribuir dentro de uma função cria uma local por omissão.'),
            L('Globals can be read without declaring anything.', 'As globais podem ser lidas sem declarar nada.'),
            L('`global` is needed only to reassign a module-level name.', '`global` só é preciso para reatribuir um nome ao nível do módulo.'),
          ],
          exercises: [
            {
              id: 'scope-1',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `x = 'global'

def f():
    x = 'local'
    print(x)

f()
print(x)`,
              expectedOutput: 'local\nglobal',
              explanation: L(
                'The assignment inside f() creates a separate local name. The module-level x is untouched.',
                'A atribuição dentro de f() cria um nome local separado. O x ao nível do módulo fica intacto.',
              ),
            },
            {
              id: 'scope-2',
              kind: 'quiz',
              xp: 10,
              prompt: L(
                'A function needs to permanently increase a module-level counter. What does it need?',
                'Uma função precisa de aumentar permanentemente um contador ao nível do módulo. O que precisa?',
              ),
              choices: [
                { id: 'a', label: L('Nothing special — assignment just works', 'Nada de especial — a atribuição funciona') },
                { id: 'b', label: L('A `global` declaration for that name', 'Uma declaração `global` para esse nome') },
                { id: 'c', label: L('To be defined outside any module', 'Ser definida fora de qualquer módulo') },
              ],
              correct: 'b',
              explanation: L(
                'Without `global`, the assignment silently creates a local and the module-level counter never changes.',
                'Sem `global`, a atribuição cria silenciosamente uma local e o contador do módulo nunca muda.',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M6
    {
      id: 'f-structures',
      title: L('Data structures', 'Estruturas de dados'),
      summary: L('Lists, dictionaries, tuples and sets — and when each one fits.', 'Listas, dicionários, tuplos e conjuntos — e quando usar cada um.'),
      lessons: [
        {
          id: 'lists',
          title: L('Lists', 'Listas'),
          summary: L('Ordered, mutable sequences: indexing, slicing and the core methods.', 'Sequências ordenadas e mutáveis: indexação, fatias e os métodos essenciais.'),
          minutes: 12,
          concept: L(
            "A list holds an ordered collection you can change in place. Indexing starts at **0**, and negative indices count from the end.\n\n```python\nfruits = ['apple', 'banana', 'orange']\nprint(fruits[0])    # apple\nprint(fruits[1])    # banana\nprint(fruits[-1])   # orange\nprint(len(fruits))  # 3\n```\n\n### Slicing\n\n`list[start:stop]` returns a new list; `stop` is excluded.\n\n```python\nnums = [0, 1, 2, 3, 4]\nprint(nums[1:4])    # [1, 2, 3]\nprint(nums[:2])     # [0, 1]\n```\n\n### Mutating\n\n```python\nnums.append(5)      # add at the end\nnums.insert(0, -1)  # add at a position\nnums.remove(3)      # delete by value\nnums.sort()         # sort in place\n```\n\nNote that `sort()` changes the list and returns `None`, while `sorted(nums)` leaves the original alone and returns a new list.",
            "Uma lista guarda uma coleção ordenada que podes alterar no lugar. A indexação começa em **0**, e índices negativos contam a partir do fim.\n\n```python\nfrutas = ['maçã', 'banana', 'laranja']\nprint(frutas[0])    # maçã\nprint(frutas[1])    # banana\nprint(frutas[-1])   # laranja\nprint(len(frutas))  # 3\n```\n\n### Fatias\n\n`lista[início:fim]` devolve uma nova lista; o `fim` é excluído.\n\n```python\nnums = [0, 1, 2, 3, 4]\nprint(nums[1:4])    # [1, 2, 3]\nprint(nums[:2])     # [0, 1]\n```\n\n### Alterar\n\n```python\nnums.append(5)      # acrescentar no fim\nnums.insert(0, -1)  # inserir numa posição\nnums.remove(3)      # apagar por valor\nnums.sort()         # ordenar no lugar\n```\n\nRepara que `sort()` altera a lista e devolve `None`, enquanto `sorted(nums)` deixa a original intacta e devolve uma lista nova.",
          ),
          keyPoints: [
            L('Indices start at 0; `-1` is the last item.', 'Os índices começam em 0; `-1` é o último item.'),
            L('Slices exclude the stop index.', 'As fatias excluem o índice final.'),
            L('`sort()` mutates and returns None; `sorted()` returns a new list.', '`sort()` altera e devolve None; `sorted()` devolve uma lista nova.'),
          ],
          exercises: [
            {
              id: 'lists-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                "Create the list `['apple', 'banana', 'orange']` and print its second item.",
                "Cria a lista `['apple', 'banana', 'orange']` e imprime o segundo item.",
              ),
              hint: L('The second item is at index 1.', 'O segundo item está no índice 1.'),
              starter: '# Create, then index\n',
              expectedOutput: 'banana',
              solution: "fruits = ['apple', 'banana', 'orange']\nprint(fruits[1])",
            },
            {
              id: 'lists-2',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Start from `[3, 1, 2]`, append 4, sort the list, and print it.',
                'Parte de `[3, 1, 2]`, acrescenta 4, ordena a lista e imprime-a.',
              ),
              hint: L('append() then sort(), then print the list itself.', 'append() depois sort(), e depois imprime a própria lista.'),
              starter: 'numbers = [3, 1, 2]\n# Append, sort, print\n',
              expectedOutput: '[1, 2, 3, 4]',
              solution: 'numbers = [3, 1, 2]\nnumbers.append(4)\nnumbers.sort()\nprint(numbers)',
            },
          ],
        },
        {
          id: 'dictionaries',
          title: L('Dictionaries', 'Dicionários'),
          summary: L('Key to value mappings, and safe ways to read them.', 'Mapeamentos de chave para valor, e formas seguras de os ler.'),
          minutes: 11,
          concept: L(
            "A dictionary maps **keys** to **values**. Lookup is by key, not position, and it is fast no matter how large the dictionary grows.\n\n```python\nperson = {'name': 'Alice', 'age': 30}\nprint(person['name'])     # Alice\nperson['city'] = 'Porto'  # add a new pair\n```\n\nAsking for a missing key raises `KeyError`. `get()` returns `None` — or a fallback you choose — instead:\n\n```python\nprint(person.get('email'))            # None\nprint(person.get('email', 'unknown')) # unknown\n```\n\n### Iterating\n\n```python\nfor key in person:\n    print(key)\n\nfor key, value in person.items():\n    print(key, value)\n```\n\nSince Python 3.7 dictionaries keep insertion order, so iteration is predictable.",
            "Um dicionário mapeia **chaves** para **valores**. A procura é por chave, não por posição, e é rápida por muito grande que o dicionário fique.\n\n```python\npessoa = {'nome': 'Alice', 'idade': 30}\nprint(pessoa['nome'])       # Alice\npessoa['cidade'] = 'Porto'  # acrescentar um par novo\n```\n\nPedir uma chave inexistente lança `KeyError`. O `get()` devolve `None` — ou um valor alternativo à tua escolha:\n\n```python\nprint(pessoa.get('email'))               # None\nprint(pessoa.get('email', 'desconhecido')) # desconhecido\n```\n\n### Iterar\n\n```python\nfor chave in pessoa:\n    print(chave)\n\nfor chave, valor in pessoa.items():\n    print(chave, valor)\n```\n\nDesde o Python 3.7 os dicionários mantêm a ordem de inserção, por isso a iteração é previsível.",
          ),
          keyPoints: [
            L('Access by key, not by position.', 'O acesso é por chave, não por posição.'),
            L('`get()` avoids KeyError and can supply a default.', '`get()` evita KeyError e pode fornecer um valor por omissão.'),
            L('`.items()` yields key and value together.', '`.items()` devolve chave e valor em conjunto.'),
          ],
          exercises: [
            {
              id: 'dictionaries-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                "Build a dictionary with `name` set to `Alice` and `age` set to 30, then print the name.",
                "Constrói um dicionário com `name` igual a `Alice` e `age` igual a 30, e imprime o nome.",
              ),
              hint: L("Curly braces, then person['name'].", "Chavetas, depois pessoa['name']."),
              starter: '# Build, then look up\n',
              expectedOutput: 'Alice',
              solution: "person = {'name': 'Alice', 'age': 30}\nprint(person['name'])",
            },
            {
              id: 'dictionaries-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `stock = {'pens': 4}
print(stock.get('pens'))
print(stock.get('books'))
print(stock.get('books', 0))`,
              expectedOutput: '4\nNone\n0',
              explanation: L(
                'get() returns the value when the key exists, None when it does not, and your fallback when you supply one.',
                'get() devolve o valor quando a chave existe, None quando não existe, e o teu valor alternativo quando o forneces.',
              ),
            },
          ],
        },
        {
          id: 'tuples-sets',
          title: L('Tuples and sets', 'Tuplos e conjuntos'),
          summary: L('Immutable sequences, and collections without duplicates.', 'Sequências imutáveis, e coleções sem duplicados.'),
          minutes: 11,
          concept: L(
            "A **tuple** is an ordered sequence that cannot be modified after creation. Use one for a fixed group of related values.\n\n```python\npoint = (3, 4)\nprint(point[0])     # 3\nx, y = point        # unpacking\n# point[0] = 9      # TypeError — immutable\n```\n\nA **set** is an unordered collection with **no duplicates**. Membership tests are fast, and it supports the mathematical operations directly.\n\n```python\na = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a | b))   # [1, 2, 3, 4]  union\nprint(sorted(a & b))   # [3]           intersection\nprint(sorted(a - b))   # [1, 2]        difference\nprint(2 in a)          # True\n```\n\nBecause sets have no order, print them via `sorted()` when you need reproducible output.\n\n### Choosing\n\nList for ordered data you will change. Tuple for a fixed record. Set for uniqueness and membership. Dict for lookup by name.",
            "Um **tuplo** é uma sequência ordenada que não pode ser alterada depois de criada. Usa um para um grupo fixo de valores relacionados.\n\n```python\nponto = (3, 4)\nprint(ponto[0])     # 3\nx, y = ponto        # desempacotamento\n# ponto[0] = 9      # TypeError — imutável\n```\n\nUm **conjunto** é uma coleção sem ordem e **sem duplicados**. Os testes de pertença são rápidos, e suporta diretamente as operações matemáticas.\n\n```python\na = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a | b))   # [1, 2, 3, 4]  união\nprint(sorted(a & b))   # [3]           interseção\nprint(sorted(a - b))   # [1, 2]        diferença\nprint(2 in a)          # True\n```\n\nComo os conjuntos não têm ordem, imprime-os com `sorted()` quando precisares de saída reproduzível.\n\n### Escolher\n\nLista para dados ordenados que vais alterar. Tuplo para um registo fixo. Conjunto para unicidade e pertença. Dicionário para procura por nome.",
          ),
          keyPoints: [
            L('Tuples are immutable; lists are not.', 'Os tuplos são imutáveis; as listas não.'),
            L('Sets drop duplicates and have no order.', 'Os conjuntos eliminam duplicados e não têm ordem.'),
            L('Use `sorted()` to print a set predictably.', 'Usa `sorted()` para imprimir um conjunto de forma previsível.'),
          ],
          exercises: [
            {
              id: 'tuples-sets-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                'From the list `[1, 2, 2, 3, 3, 3]`, remove the duplicates and print the unique values as a sorted list.',
                'A partir da lista `[1, 2, 2, 3, 3, 3]`, remove os duplicados e imprime os valores únicos como lista ordenada.',
              ),
              hint: L('set() drops duplicates, sorted() gives a list back.', 'set() elimina duplicados, sorted() devolve uma lista.'),
              starter: 'values = [1, 2, 2, 3, 3, 3]\n# Unique, sorted\n',
              expectedOutput: '[1, 2, 3]',
              solution: 'values = [1, 2, 2, 3, 3, 3]\nprint(sorted(set(values)))',
            },
            {
              id: 'tuples-sets-2',
              kind: 'quiz',
              xp: 10,
              prompt: L(
                'You need to store a pair of coordinates that must never change. Which type fits best?',
                'Precisas de guardar um par de coordenadas que nunca deve mudar. Que tipo se adequa melhor?',
              ),
              choices: [
                { id: 'a', label: L('A list', 'Uma lista') },
                { id: 'b', label: L('A tuple', 'Um tuplo') },
                { id: 'c', label: L('A set', 'Um conjunto') },
              ],
              correct: 'b',
              explanation: L(
                'A tuple is ordered and immutable, which is exactly the guarantee coordinates want. A set would also lose the order and reject a repeated value like (2, 2).',
                'Um tuplo é ordenado e imutável, exatamente a garantia que umas coordenadas querem. Um conjunto perderia a ordem e rejeitaria um valor repetido como (2, 2).',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M7
    {
      id: 'f-strings',
      title: L('Text', 'Texto'),
      summary: L('Strings are sequences too — with a toolbox of their own.', 'As strings também são sequências — com um conjunto próprio de ferramentas.'),
      lessons: [
        {
          id: 'strings',
          title: L('Strings', 'Strings'),
          summary: L('Slicing, methods, splitting and joining text.', 'Fatiar, métodos, dividir e juntar texto.'),
          minutes: 12,
          concept: L(
            "Strings behave like immutable sequences of characters, so indexing and slicing work exactly as they do on lists:\n\n```python\ns = 'python'\nprint(s[0])      # p\nprint(s[-1])     # n\nprint(s[1:4])    # yth\nprint(len(s))    # 6\n```\n\n### Common methods\n\nEvery method returns a **new** string — the original is never modified.\n\n```python\nt = 'python programming'\nprint(t.upper())            # PYTHON PROGRAMMING\nprint(t.replace('p', 'P'))  # Python Programming\nprint(t.split())            # ['python', 'programming']\nprint('-'.join(['a','b']))  # a-b\nprint('  hi  '.strip())     # hi\nprint(t.startswith('py'))   # True\n```\n\n`split()` with no argument splits on any run of whitespace, which is usually what you want when parsing a line of input.",
            "As strings comportam-se como sequências imutáveis de caracteres, por isso a indexação e as fatias funcionam exatamente como nas listas:\n\n```python\ns = 'python'\nprint(s[0])      # p\nprint(s[-1])     # n\nprint(s[1:4])    # yth\nprint(len(s))    # 6\n```\n\n### Métodos comuns\n\nCada método devolve uma **nova** string — a original nunca é alterada.\n\n```python\nt = 'python programming'\nprint(t.upper())            # PYTHON PROGRAMMING\nprint(t.replace('p', 'P'))  # Python Programming\nprint(t.split())            # ['python', 'programming']\nprint('-'.join(['a','b']))  # a-b\nprint('  ola  '.strip())    # ola\nprint(t.startswith('py'))   # True\n```\n\n`split()` sem argumento divide em qualquer sequência de espaços, que é normalmente o que queres ao processar uma linha de entrada.",
          ),
          keyPoints: [
            L('Strings are immutable — methods return new strings.', 'As strings são imutáveis — os métodos devolvem strings novas.'),
            L('Indexing and slicing work as they do on lists.', 'A indexação e as fatias funcionam como nas listas.'),
            L('`split()` and `join()` are inverses of each other.', '`split()` e `join()` são inversos um do outro.'),
          ],
          exercises: [
            {
              id: 'strings-1',
              kind: 'code',
              xp: 10,
              prompt: L(
                'Print `python programming` in uppercase.',
                'Imprime `python programming` em maiúsculas.',
              ),
              hint: L('.upper() returns the uppercased copy.', '.upper() devolve a cópia em maiúsculas.'),
              starter: "text = 'python programming'\n# Uppercase it\n",
              expectedOutput: 'PYTHON PROGRAMMING',
              solution: "text = 'python programming'\nprint(text.upper())",
            },
            {
              id: 'strings-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `s = 'abcdef'
print(s[2:5])
print(s[:3])
print(s[-2:])`,
              expectedOutput: 'cde\nabc\nef',
              explanation: L(
                'Slices exclude the stop index. An omitted start means from the beginning, an omitted stop means to the end, and -2 starts two characters from the end.',
                'As fatias excluem o índice final. Omitir o início significa desde o princípio, omitir o fim significa até ao fim, e -2 começa dois caracteres antes do fim.',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M8
    {
      id: 'f-gui',
      title: L('Interfaces', 'Interfaces'),
      summary: L('Putting a graphical face on a Python function with Gradio.', 'Dar uma face gráfica a uma função Python com Gradio.'),
      lessons: [
        {
          id: 'gradio',
          title: L('GUI with Gradio', 'Interfaces com Gradio'),
          summary: L('Wrapping a function in a web interface — inputs, outputs, launch.', 'Envolver uma função numa interface web — inputs, outputs, launch.'),
          minutes: 12,
          concept: L(
            "Gradio turns an ordinary Python function into a web interface. You do not write any HTML: you describe what goes in and what comes out.\n\n```python\nimport gradio as gr\n\ndef greet(name):\n    return f'Hello, {name}!'\n\ndemo = gr.Interface(\n    fn=greet,\n    inputs='text',\n    outputs='text',\n)\ndemo.launch()\n```\n\nThree arguments carry the whole design:\n\n- `fn` — the function to call\n- `inputs` — one component per parameter, in order\n- `outputs` — one component per returned value\n\nCommon components: `'text'`, `'number'`, `'slider'`, `'checkbox'`, `'dropdown'`, `'image'`.\n\n### The important habit\n\nKeep the logic in a plain function that you can test on its own, and let Gradio be a thin wrapper around it. That is why the exercises here have you write and verify the **function** first — the interface is the easy part.\n\n```python\ndef bmi(weight, height):\n    return round(weight / height ** 2, 1)\n\n# gr.Interface(fn=bmi, inputs=['number','number'], outputs='number')\n```",
            "O Gradio transforma uma função Python vulgar numa interface web. Não escreves HTML nenhum: descreves o que entra e o que sai.\n\n```python\nimport gradio as gr\n\ndef saudar(nome):\n    return f'Olá, {nome}!'\n\ndemo = gr.Interface(\n    fn=saudar,\n    inputs='text',\n    outputs='text',\n)\ndemo.launch()\n```\n\nTrês argumentos carregam o desenho todo:\n\n- `fn` — a função a chamar\n- `inputs` — um componente por parâmetro, pela ordem\n- `outputs` — um componente por valor devolvido\n\nComponentes comuns: `'text'`, `'number'`, `'slider'`, `'checkbox'`, `'dropdown'`, `'image'`.\n\n### O hábito importante\n\nMantém a lógica numa função simples que consigas testar isoladamente, e deixa o Gradio ser um invólucro fino à volta dela. É por isso que os exercícios aqui te pedem para escrever e verificar primeiro a **função** — a interface é a parte fácil.\n\n```python\ndef imc(peso, altura):\n    return round(peso / altura ** 2, 1)\n\n# gr.Interface(fn=imc, inputs=['number','number'], outputs='number')\n```",
          ),
          keyPoints: [
            L('`fn`, `inputs` and `outputs` describe the whole interface.', '`fn`, `inputs` e `outputs` descrevem toda a interface.'),
            L('One input component per function parameter, in order.', 'Um componente de entrada por parâmetro da função, pela ordem.'),
            L('Test the plain function first; the GUI is only a wrapper.', 'Testa primeiro a função simples; a GUI é só um invólucro.'),
          ],
          exercises: [
            {
              id: 'gradio-1',
              kind: 'code',
              xp: 15,
              prompt: L(
                'Write the handler `bmi(weight, height)` returning weight divided by height squared, rounded to 1 decimal. Print `bmi(70, 1.75)`.',
                'Escreve o handler `imc(peso, altura)` que devolve o peso a dividir pela altura ao quadrado, arredondado a 1 casa. Imprime `imc(70, 1.75)`.',
              ),
              hint: L('round(weight / height ** 2, 1)', 'round(peso / altura ** 2, 1)'),
              starter: '# The function Gradio would call\n',
              expectedOutput: '22.9',
              solution: 'def bmi(weight, height):\n    return round(weight / height ** 2, 1)\n\nprint(bmi(70, 1.75))',
            },
            {
              id: 'gradio-2',
              kind: 'quiz',
              xp: 10,
              prompt: L(
                'Your handler is `def convert(celsius, unit):`. What should `inputs` be?',
                'O teu handler é `def converter(celsius, unidade):`. O que deve ser `inputs`?',
              ),
              choices: [
                { id: 'a', label: L("'text'", "'text'") },
                { id: 'b', label: L("['number', 'dropdown']", "['number', 'dropdown']") },
                { id: 'c', label: L("outputs=['number']", "outputs=['number']") },
              ],
              correct: 'b',
              explanation: L(
                'The function takes two parameters, so inputs needs a list of two components, matched by position.',
                'A função recebe dois parâmetros, por isso inputs precisa de uma lista com dois componentes, emparelhados por posição.',
              ),
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- M9
    {
      id: 'f-oop',
      title: L('First objects', 'Primeiros objetos'),
      summary: L('Bundling data and the behaviour that belongs with it.', 'Juntar dados e o comportamento que lhes pertence.'),
      lessons: [
        {
          id: 'oop-intro',
          title: L('Introduction to OOP', 'Introdução à POO'),
          summary: L('Classes, instances, __init__ and self.', 'Classes, instâncias, __init__ e self.'),
          minutes: 13,
          concept: L(
            "A **class** is a blueprint. An **object** (or instance) is one thing built from that blueprint.\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name       # attribute\n\n    def speak(self):           # method\n        return f'{self.name} says woof'\n\nrex = Dog('Rex')\nprint(rex.speak())             # Rex says woof\n```\n\n`__init__` runs automatically when you create an instance; it sets the object's starting state. `self` is the instance itself, passed automatically — you write it in the definition but never at the call site.\n\n### Why bother\n\nWithout classes you pass loose variables around and hope they stay consistent. With classes, the data and the operations that belong to it travel together, which is the whole idea you will build on in Programming II.",
            "Uma **classe** é uma planta. Um **objeto** (ou instância) é uma coisa construída a partir dessa planta.\n\n```python\nclass Cao:\n    def __init__(self, nome):\n        self.nome = nome       # atributo\n\n    def falar(self):           # método\n        return f'{self.nome} diz ão'\n\nrex = Cao('Rex')\nprint(rex.falar())             # Rex diz ão\n```\n\n`__init__` corre automaticamente quando crias uma instância; define o estado inicial do objeto. `self` é a própria instância, passada automaticamente — escreve-la na definição mas nunca na chamada.\n\n### Porquê\n\nSem classes andas a passar variáveis soltas e a torcer para que se mantenham consistentes. Com classes, os dados e as operações que lhes pertencem viajam juntos, que é a ideia sobre a qual vais construir tudo em Programação II.",
          ),
          keyPoints: [
            L('A class is the blueprint; an instance is one object.', 'A classe é a planta; a instância é um objeto.'),
            L('`__init__` sets up initial state when the object is created.', '`__init__` define o estado inicial quando o objeto é criado.'),
            L('`self` is the instance, declared but never passed by hand.', '`self` é a instância, declarada mas nunca passada à mão.'),
          ],
          exercises: [
            {
              id: 'oop-intro-1',
              kind: 'code',
              xp: 20,
              prompt: L(
                'Define a class `Dog` whose `__init__` stores a `name`, and a method `speak()` returning `<name> says woof`. Create `Rex` and print the result.',
                'Define uma classe `Dog` cujo `__init__` guarda um `name`, e um método `speak()` que devolve `<name> says woof`. Cria `Rex` e imprime o resultado.',
              ),
              hint: L('Remember self as the first parameter of both methods.', 'Lembra-te do self como primeiro parâmetro de ambos os métodos.'),
              starter: '# Blueprint, then one instance\n',
              expectedOutput: 'Rex says woof',
              solution:
                "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f'{self.name} says woof'\n\nprint(Dog('Rex').speak())",
            },
            {
              id: 'oop-intro-2',
              kind: 'predict',
              xp: 10,
              prompt: L('What does this print?', 'O que é que isto imprime?'),
              snippet: `class Counter:
    def __init__(self):
        self.n = 0
    def bump(self):
        self.n += 1

a = Counter()
b = Counter()
a.bump()
a.bump()
print(a.n, b.n)`,
              expectedOutput: '2 0',
              explanation: L(
                'Each instance gets its own attributes, so bumping a leaves b untouched. That independence is the point of instances.',
                'Cada instância tem os seus próprios atributos, por isso incrementar a não afeta b. Essa independência é o objetivo das instâncias.',
              ),
            },
          ],
        },
      ],
    },
  ],
};
