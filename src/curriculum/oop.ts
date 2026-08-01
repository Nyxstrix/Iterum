import type { Module } from './types';

const L = (en: string, pt: string) => ({ en, pt });

/** Programming II, modules 1–3: advanced language, code organisation, and OOP. */
export const oopModules: Module[] = [
  // ------------------------------------------------------------------ M1
  {
    id: 'p2-advanced',
    title: L('Advanced Python', 'Python avançado'),
    summary: L(
      'The language features that separate working code from idiomatic code.',
      'As funcionalidades que separam código que funciona de código idiomático.',
    ),
    lessons: [
      {
        id: 'py2-review',
        title: L('Review and idiomatic Python', 'Revisão e Python idiomático'),
        summary: L(
          'Unpacking, enumerate, zip and conditional expressions.',
          'Desempacotamento, enumerate, zip e expressões condicionais.',
        ),
        minutes: 12,
        concept: L(
          "You already know the syntax. This module is about writing it the way a Python programmer would.\n\n### Unpacking\n\n```python\na, b = 1, 2\na, b = b, a          # swap, no temporary\nfirst, *rest = [1, 2, 3]\nprint(first, rest)   # 1 [2, 3]\n```\n\n### enumerate and zip\n\nManually managing an index is a smell. `enumerate` gives you index and value together; `zip` walks two sequences in parallel.\n\n```python\nfor i, name in enumerate(['a', 'b'], start=1):\n    print(i, name)\n\nfor name, age in zip(['Ana', 'Rui'], [20, 22]):\n    print(name, age)\n```\n\n### Conditional expressions\n\n```python\nn = 7\nlabel = 'odd' if n % 2 else 'even'\nprint(label)\n```\n\nThis is an expression, so it can sit anywhere a value can — inside an f-string, a list, or an argument.",
          "Já conheces a sintaxe. Este módulo é sobre escrevê-la como o faria um programador de Python.\n\n### Desempacotamento\n\n```python\na, b = 1, 2\na, b = b, a          # trocar, sem variável temporária\nprimeiro, *resto = [1, 2, 3]\nprint(primeiro, resto)   # 1 [2, 3]\n```\n\n### enumerate e zip\n\nGerir um índice à mão é mau sinal. O `enumerate` dá-te índice e valor em conjunto; o `zip` percorre duas sequências em paralelo.\n\n```python\nfor i, nome in enumerate(['a', 'b'], start=1):\n    print(i, nome)\n\nfor nome, idade in zip(['Ana', 'Rui'], [20, 22]):\n    print(nome, idade)\n```\n\n### Expressões condicionais\n\n```python\nn = 7\netiqueta = 'ímpar' if n % 2 else 'par'\nprint(etiqueta)\n```\n\nIsto é uma expressão, por isso pode estar em qualquer sítio onde caiba um valor — dentro de uma f-string, de uma lista, ou de um argumento.",
        ),
        keyPoints: [
          L('`a, b = b, a` swaps without a temporary.', '`a, b = b, a` troca sem variável temporária.'),
          L('`enumerate` replaces manual index counters.', '`enumerate` substitui contadores de índice manuais.'),
          L('A conditional expression yields a value, unlike an if statement.', 'Uma expressão condicional produz um valor, ao contrário da instrução if.'),
        ],
        exercises: [
          {
            id: 'py2-review-1',
            kind: 'predict',
            xp: 10,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `head, *tail = [10, 20, 30, 40]
print(head)
print(tail)`,
            expectedOutput: '10\n[20, 30, 40]',
            explanation: L(
              'Starred unpacking binds one name to the first item and collects everything remaining into a list.',
              'O desempacotamento com asterisco liga um nome ao primeiro item e recolhe o resto numa lista.',
            ),
          },
          {
            id: 'py2-review-2',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Print each name from `["Ana", "Rui"]` numbered from 1, as `1. Ana` then `2. Rui`.',
              'Imprime cada nome de `["Ana", "Rui"]` numerado a partir de 1, como `1. Ana` e depois `2. Rui`.',
            ),
            hint: L('enumerate(names, start=1) plus an f-string.', 'enumerate(nomes, start=1) mais uma f-string.'),
            starter: "names = ['Ana', 'Rui']\n# Numbered from one\n",
            expectedOutput: '1. Ana\n2. Rui',
            solution: "names = ['Ana', 'Rui']\nfor i, name in enumerate(names, start=1):\n    print(f'{i}. {name}')",
          },
        ],
      },
      {
        id: 'native-structures',
        title: L('Native data structures in depth', 'Estruturas de dados nativas em profundidade'),
        summary: L(
          'Nesting, copying, and picking the right container.',
          'Aninhamento, cópia, e escolher o contentor certo.',
        ),
        minutes: 12,
        concept: L(
          "Real data is nested: lists of dictionaries, dictionaries of lists.\n\n```python\nstudents = [\n    {'name': 'Ana', 'marks': [14, 16]},\n    {'name': 'Rui', 'marks': [11, 13]},\n]\nfor s in students:\n    average = sum(s['marks']) / len(s['marks'])\n    print(s['name'], average)\n```\n\n### Copying is shallow by default\n\nAssignment copies a **reference**, not the data. Two names then point at one object:\n\n```python\na = [1, 2]\nb = a\nb.append(3)\nprint(a)          # [1, 2, 3] — surprise\n\nc = a.copy()      # or list(a) or a[:]\nc.append(4)\nprint(a)          # [1, 2, 3] — safe\n```\n\nFor nested structures even `copy()` is shallow: the inner lists are still shared. `copy.deepcopy()` is the tool when you need a fully independent clone.\n\n### Choosing\n\nCost of a membership test drives most decisions: `in` on a list scans every element, on a set or dict it is effectively instant.",
          "Os dados reais são aninhados: listas de dicionários, dicionários de listas.\n\n```python\nalunos = [\n    {'nome': 'Ana', 'notas': [14, 16]},\n    {'nome': 'Rui', 'notas': [11, 13]},\n]\nfor a in alunos:\n    media = sum(a['notas']) / len(a['notas'])\n    print(a['nome'], media)\n```\n\n### A cópia é superficial por omissão\n\nA atribuição copia uma **referência**, não os dados. Dois nomes passam a apontar para um objeto:\n\n```python\na = [1, 2]\nb = a\nb.append(3)\nprint(a)          # [1, 2, 3] — surpresa\n\nc = a.copy()      # ou list(a) ou a[:]\nc.append(4)\nprint(a)          # [1, 2, 3] — seguro\n```\n\nEm estruturas aninhadas até o `copy()` é superficial: as listas interiores continuam partilhadas. `copy.deepcopy()` é a ferramenta quando precisas de um clone totalmente independente.\n\n### Escolher\n\nO custo do teste de pertença guia a maioria das decisões: `in` numa lista percorre todos os elementos, num conjunto ou dicionário é praticamente instantâneo.",
        ),
        keyPoints: [
          L('Assignment shares a reference; it does not copy.', 'A atribuição partilha uma referência; não copia.'),
          L('`copy()` is shallow — nested objects stay shared.', '`copy()` é superficial — objetos aninhados continuam partilhados.'),
          L('`in` is O(n) on a list but O(1) on a set or dict.', '`in` é O(n) numa lista mas O(1) num conjunto ou dicionário.'),
        ],
        exercises: [
          {
            id: 'native-structures-1',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `a = [1, 2]
b = a
c = a.copy()
b.append(3)
c.append(4)
print(a)`,
            expectedOutput: '[1, 2, 3]',
            explanation: L(
              'b is another name for the same list, so its append is visible through a. c is a real copy, so its append is not.',
              'b é outro nome para a mesma lista, por isso o seu append é visível através de a. c é uma cópia real, por isso o seu append não é.',
            ),
          },
          {
            id: 'native-structures-2',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Given the students list in the starter, print each name and their average, as `Ana 15.0`.',
              'Dada a lista de alunos no código inicial, imprime cada nome e a sua média, como `Ana 15.0`.',
            ),
            hint: L('sum(marks) / len(marks) inside the loop.', 'sum(notas) / len(notas) dentro do ciclo.'),
            starter: `students = [
    {'name': 'Ana', 'marks': [14, 16]},
    {'name': 'Rui', 'marks': [11, 13]},
]
# Name and average, one per line
`,
            expectedOutput: 'Ana 15.0\nRui 12.0',
            solution: `students = [
    {'name': 'Ana', 'marks': [14, 16]},
    {'name': 'Rui', 'marks': [11, 13]},
]
for s in students:
    print(s['name'], sum(s['marks']) / len(s['marks']))`,
          },
        ],
      },
      {
        id: 'advanced-functions',
        title: L('Advanced function concepts', 'Conceitos avançados de funções'),
        summary: L(
          '*args, **kwargs, lambdas and functions as values.',
          '*args, **kwargs, lambdas e funções como valores.',
        ),
        minutes: 13,
        concept: L(
          "### Variable arguments\n\n`*args` collects extra positional arguments into a tuple; `**kwargs` collects keyword arguments into a dictionary.\n\n```python\ndef total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3))      # 6\n\ndef describe(**fields):\n    return fields\n\nprint(describe(name='Ana'))  # {'name': 'Ana'}\n```\n\n### Functions are values\n\nA function can be stored, passed and returned like any other object. That is what makes `sorted(key=...)` work.\n\n```python\npeople = [('Ana', 22), ('Rui', 19)]\nprint(sorted(people, key=lambda p: p[1]))\n```\n\nA `lambda` is a single-expression function with no name. Use it for tiny throwaway logic; anything longer deserves a real `def` with a real name.\n\n### A trap\n\nDefault arguments are evaluated **once**, at definition. A mutable default is shared across every call:\n\n```python\ndef bad(item, bucket=[]):   # do not do this\n    bucket.append(item)\n    return bucket\n```\n\nUse `bucket=None` and create the list inside instead.",
          "### Argumentos variáveis\n\n`*args` recolhe argumentos posicionais extra num tuplo; `**kwargs` recolhe argumentos nomeados num dicionário.\n\n```python\ndef total(*numeros):\n    return sum(numeros)\n\nprint(total(1, 2, 3))      # 6\n\ndef descrever(**campos):\n    return campos\n\nprint(descrever(nome='Ana'))  # {'nome': 'Ana'}\n```\n\n### As funções são valores\n\nUma função pode ser guardada, passada e devolvida como qualquer outro objeto. É isso que faz o `sorted(key=...)` funcionar.\n\n```python\npessoas = [('Ana', 22), ('Rui', 19)]\nprint(sorted(pessoas, key=lambda p: p[1]))\n```\n\nUma `lambda` é uma função de uma só expressão e sem nome. Usa-a para lógica minúscula e descartável; algo maior merece um `def` a sério com um nome a sério.\n\n### Uma armadilha\n\nOs argumentos por omissão são avaliados **uma vez**, na definição. Um valor mutável por omissão é partilhado por todas as chamadas:\n\n```python\ndef mau(item, balde=[]):   # não faças isto\n    balde.append(item)\n    return balde\n```\n\nUsa `balde=None` e cria a lista lá dentro.",
        ),
        keyPoints: [
          L('`*args` is a tuple; `**kwargs` is a dict.', '`*args` é um tuplo; `**kwargs` é um dicionário.'),
          L('Functions can be passed as arguments, e.g. `sorted(key=...)`.', 'As funções podem ser passadas como argumentos, ex. `sorted(key=...)`.'),
          L('Never use a mutable default argument.', 'Nunca uses um argumento por omissão mutável.'),
        ],
        exercises: [
          {
            id: 'advanced-functions-1',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Sort `[("Ana", 22), ("Rui", 19), ("Zoe", 30)]` by age ascending and print the resulting list.',
              'Ordena `[("Ana", 22), ("Rui", 19), ("Zoe", 30)]` por idade crescente e imprime a lista resultante.',
            ),
            hint: L('key=lambda p: p[1]', 'key=lambda p: p[1]'),
            starter: "people = [('Ana', 22), ('Rui', 19), ('Zoe', 30)]\n# Sort by the second element\n",
            expectedOutput: "[('Rui', 19), ('Ana', 22), ('Zoe', 30)]",
            solution: "people = [('Ana', 22), ('Rui', 19), ('Zoe', 30)]\nprint(sorted(people, key=lambda p: p[1]))",
          },
          {
            id: 'advanced-functions-2',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `def collect(item, bucket=[]):
    bucket.append(item)
    return bucket

print(collect(1))
print(collect(2))`,
            expectedOutput: '[1]\n[1, 2]',
            explanation: L(
              'The default list is created once when the function is defined, so every call that omits the argument shares and mutates that same list.',
              'A lista por omissão é criada uma vez, quando a função é definida, por isso todas as chamadas que omitem o argumento partilham e alteram essa mesma lista.',
            ),
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ M2
  {
    id: 'p2-organisation',
    title: L('Organising code', 'Organizar código'),
    summary: L(
      'Modules, documentation and making data outlive the process.',
      'Módulos, documentação e fazer os dados sobreviver ao processo.',
    ),
    lessons: [
      {
        id: 'modules-packages',
        title: L('Modules and packages', 'Módulos e pacotes'),
        summary: L('Splitting a program across files and importing between them.', 'Dividir um programa por ficheiros e importar entre eles.'),
        minutes: 11,
        concept: L(
          "Any `.py` file is a **module**. Importing it runs it once and binds its names.\n\n```python\nimport math\nprint(math.sqrt(16))       # 4.0\n\nfrom math import sqrt, pi\nprint(sqrt(16), round(pi, 2))\n\nimport math as m           # alias\n```\n\nA **package** is a directory of modules. Historically it needed an `__init__.py`; the file also runs on import and is where a package exposes its public API.\n\n```\nshop/\n    __init__.py\n    models.py\n    storage.py\n```\n\n```python\nfrom shop.models import Product\n```\n\n### The main guard\n\nWhen a module is imported, `__name__` is its module name. When it is run directly, `__name__` is `'__main__'`. That is how a file can be both an importable library and a runnable script:\n\n```python\nif __name__ == '__main__':\n    main()\n```",
          "Qualquer ficheiro `.py` é um **módulo**. Importá-lo executa-o uma vez e liga os seus nomes.\n\n```python\nimport math\nprint(math.sqrt(16))       # 4.0\n\nfrom math import sqrt, pi\nprint(sqrt(16), round(pi, 2))\n\nimport math as m           # alias\n```\n\nUm **pacote** é um diretório de módulos. Historicamente precisava de um `__init__.py`; esse ficheiro também corre na importação e é onde um pacote expõe a sua API pública.\n\n```\nloja/\n    __init__.py\n    modelos.py\n    armazenamento.py\n```\n\n```python\nfrom loja.modelos import Produto\n```\n\n### A guarda main\n\nQuando um módulo é importado, `__name__` é o nome do módulo. Quando é executado diretamente, `__name__` é `'__main__'`. É assim que um ficheiro pode ser ao mesmo tempo biblioteca importável e script executável:\n\n```python\nif __name__ == '__main__':\n    main()\n```",
        ),
        keyPoints: [
          L('Every .py file is a module; a directory of them is a package.', 'Cada ficheiro .py é um módulo; um diretório deles é um pacote.'),
          L('`from x import y` binds y directly into your namespace.', '`from x import y` liga y diretamente ao teu espaço de nomes.'),
          L("`__name__ == '__main__'` separates script use from import use.", "`__name__ == '__main__'` separa uso como script de uso como import."),
        ],
        exercises: [
          {
            id: 'modules-packages-1',
            kind: 'code',
            xp: 10,
            prompt: L(
              'Import sqrt from math and print the square root of 144.',
              'Importa sqrt do math e imprime a raiz quadrada de 144.',
            ),
            hint: L('from math import sqrt', 'from math import sqrt'),
            starter: '# Import, then use\n',
            expectedOutput: '12.0',
            solution: 'from math import sqrt\nprint(sqrt(144))',
          },
          {
            id: 'modules-packages-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'A file prints a banner when imported by another module, which you do not want. What fixes it?',
              'Um ficheiro imprime um banner quando é importado por outro módulo, o que não queres. O que resolve?',
            ),
            choices: [
              { id: 'a', label: L('Rename the file', 'Mudar o nome do ficheiro') },
              { id: 'b', label: L("Put the print behind `if __name__ == '__main__':`", "Pôr o print dentro de `if __name__ == '__main__':`") },
              { id: 'c', label: L('Delete the __init__.py', 'Apagar o __init__.py') },
            ],
            correct: 'b',
            explanation: L(
              'Import executes the whole module top to bottom. The main guard restricts code to the case where the file is run directly.',
              'A importação executa o módulo todo de cima para baixo. A guarda main restringe o código ao caso em que o ficheiro é executado diretamente.',
            ),
          },
        ],
      },
      {
        id: 'documentation',
        title: L('Documentation and type hints', 'Documentação e anotações de tipo'),
        summary: L('Docstrings, help(), and annotating your intent.', 'Docstrings, help(), e anotar a tua intenção.'),
        minutes: 10,
        concept: L(
          "A **docstring** is a string literal as the first statement of a module, class or function. Unlike a comment, it survives into the runtime and is what `help()` shows.\n\n```python\ndef area(width: float, height: float) -> float:\n    \"\"\"Return the area of a rectangle.\n\n    Args:\n        width: horizontal size.\n        height: vertical size.\n    \"\"\"\n    return width * height\n\nprint(area.__doc__.splitlines()[0])\n```\n\n### Type hints\n\n`width: float` and `-> float` document what goes in and what comes out. Python does **not** enforce them at runtime — they exist for readers and for tools like mypy and your editor.\n\n```python\ndef names(items: list[str]) -> str:\n    return ', '.join(items)\n```\n\nGood documentation states what a function returns and what it assumes, not how it works. The how is already in the code.",
          "Uma **docstring** é uma string literal como primeira instrução de um módulo, classe ou função. Ao contrário de um comentário, sobrevive até ao tempo de execução e é o que o `help()` mostra.\n\n```python\ndef area(largura: float, altura: float) -> float:\n    \"\"\"Devolve a área de um retângulo.\n\n    Args:\n        largura: dimensão horizontal.\n        altura: dimensão vertical.\n    \"\"\"\n    return largura * altura\n\nprint(area.__doc__.splitlines()[0])\n```\n\n### Anotações de tipo\n\n`largura: float` e `-> float` documentam o que entra e o que sai. O Python **não** as impõe em execução — existem para quem lê e para ferramentas como o mypy e o teu editor.\n\n```python\ndef nomes(itens: list[str]) -> str:\n    return ', '.join(itens)\n```\n\nBoa documentação diz o que a função devolve e o que assume, não como funciona. O como já está no código.",
        ),
        keyPoints: [
          L('A docstring is the first statement, in triple quotes.', 'Uma docstring é a primeira instrução, entre aspas triplas.'),
          L('`__doc__` and `help()` read docstrings at runtime.', '`__doc__` e `help()` leem docstrings em execução.'),
          L('Type hints are documentation, not enforcement.', 'As anotações de tipo são documentação, não imposição.'),
        ],
        exercises: [
          {
            id: 'documentation-1',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Write a function `area(w, h)` with the docstring `Return the area.` and print `area.__doc__`.',
              'Escreve uma função `area(w, h)` com a docstring `Return the area.` e imprime `area.__doc__`.',
            ),
            hint: L('Triple-quoted string as the very first line of the body.', 'String entre aspas triplas como primeiríssima linha do corpo.'),
            starter: '# Document, then introspect\n',
            expectedOutput: 'Return the area.',
            solution: 'def area(w, h):\n    """Return the area."""\n    return w * h\n\nprint(area.__doc__)',
          },
          {
            id: 'documentation-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'What happens if you call `area("2", "3")` on a function annotated `def area(w: int, h: int)`?',
              'O que acontece se chamares `area("2", "3")` numa função anotada `def area(w: int, h: int)`?',
            ),
            choices: [
              { id: 'a', label: L('Python raises a TypeError immediately', 'O Python lança logo um TypeError') },
              { id: 'b', label: L('It runs — hints are not checked at runtime', 'Corre — as anotações não são verificadas em execução') },
              { id: 'c', label: L('The arguments are converted to int automatically', 'Os argumentos são convertidos para int automaticamente') },
            ],
            correct: 'b',
            explanation: L(
              'Annotations are metadata. Only a static checker such as mypy would flag the mismatch; the interpreter ignores it.',
              'As anotações são metadados. Só um verificador estático como o mypy assinalaria a discrepância; o interpretador ignora-a.',
            ),
          },
        ],
      },
      {
        id: 'persistence',
        title: L('Persistence: files and JSON', 'Persistência: ficheiros e JSON'),
        summary: L('Writing data that outlives the program run.', 'Escrever dados que sobrevivem à execução do programa.'),
        minutes: 13,
        concept: L(
          "Everything in memory disappears when the process ends. **Persistence** means writing it somewhere durable.\n\n### Files\n\nAlways use `with`, which closes the file even if an error is raised.\n\n```python\nwith open('notes.txt', 'w') as f:\n    f.write('line one\\n')\n\nwith open('notes.txt') as f:\n    print(f.read().strip())\n```\n\nModes: `'r'` read, `'w'` write (truncates), `'a'` append.\n\n### JSON\n\nText files are fine for text. For structured data, `json` converts between Python objects and a portable string.\n\n```python\nimport json\n\ndata = {'name': 'Ana', 'marks': [14, 16]}\ntext = json.dumps(data)\nprint(text)\n\nback = json.loads(text)\nprint(back['marks'][0])\n```\n\n`json.dump(obj, file)` and `json.load(file)` do the same straight to and from a file. JSON handles dicts, lists, strings, numbers, booleans and null — not sets, tuples-as-tuples, or your own classes without help.",
          "Tudo o que está em memória desaparece quando o processo termina. **Persistência** é escrever isso algures de forma durável.\n\n### Ficheiros\n\nUsa sempre `with`, que fecha o ficheiro mesmo que ocorra um erro.\n\n```python\nwith open('notas.txt', 'w') as f:\n    f.write('linha um\\n')\n\nwith open('notas.txt') as f:\n    print(f.read().strip())\n```\n\nModos: `'r'` leitura, `'w'` escrita (trunca), `'a'` acrescentar.\n\n### JSON\n\nFicheiros de texto servem para texto. Para dados estruturados, o `json` converte entre objetos Python e uma string portável.\n\n```python\nimport json\n\ndados = {'nome': 'Ana', 'notas': [14, 16]}\ntexto = json.dumps(dados)\nprint(texto)\n\nde_volta = json.loads(texto)\nprint(de_volta['notas'][0])\n```\n\n`json.dump(obj, ficheiro)` e `json.load(ficheiro)` fazem o mesmo diretamente de e para um ficheiro. O JSON lida com dicionários, listas, strings, números, booleanos e null — não com conjuntos, tuplos enquanto tuplos, ou as tuas próprias classes sem ajuda.",
        ),
        keyPoints: [
          L('`with open(...)` closes the file automatically.', '`with open(...)` fecha o ficheiro automaticamente.'),
          L("Mode 'w' truncates; 'a' appends.", "O modo 'w' trunca; 'a' acrescenta."),
          L('`json.dumps` serialises to a string, `json.loads` parses one.', '`json.dumps` serializa para string, `json.loads` interpreta uma.'),
        ],
        exercises: [
          {
            id: 'persistence-1',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Write `hello` to `data.txt`, read it back, and print it.',
              'Escreve `hello` em `data.txt`, lê de volta e imprime.',
            ),
            hint: L("Two with blocks: one 'w', one default read.", "Dois blocos with: um 'w', outro de leitura por omissão."),
            starter: '# Write it, then read it\n',
            expectedOutput: 'hello',
            solution:
              "with open('data.txt', 'w') as f:\n    f.write('hello')\n\nwith open('data.txt') as f:\n    print(f.read())",
          },
          {
            id: 'persistence-2',
            kind: 'code',
            xp: 15,
            prompt: L(
              "Serialise `{'name': 'Ana', 'age': 20}` to JSON and print the resulting string.",
              "Serializa `{'name': 'Ana', 'age': 20}` para JSON e imprime a string resultante.",
            ),
            hint: L('import json, then json.dumps(data).', 'import json, depois json.dumps(dados).'),
            starter: "data = {'name': 'Ana', 'age': 20}\n# Serialise it\n",
            expectedOutput: '{"name": "Ana", "age": 20}',
            solution: "import json\n\ndata = {'name': 'Ana', 'age': 20}\nprint(json.dumps(data))",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ M3
  {
    id: 'p2-oop',
    title: L('Object orientation', 'Orientação a objetos'),
    summary: L(
      'Encapsulation, inheritance, polymorphism, and modelling with UML.',
      'Encapsulamento, herança, polimorfismo, e modelação com UML.',
    ),
    lessons: [
      {
        id: 'classes',
        title: L('Classes and static members', 'Classes e membros estáticos'),
        summary: L('Instance attributes versus class attributes, and the three kinds of method.', 'Atributos de instância versus de classe, e os três tipos de método.'),
        minutes: 13,
        concept: L(
          "An **instance attribute** belongs to one object. A **class attribute** is shared by every instance of the class.\n\n```python\nclass Account:\n    bank = 'Iterum Bank'    # class attribute, shared\n    count = 0\n\n    def __init__(self, owner):\n        self.owner = owner  # instance attribute, per object\n        Account.count += 1\n\na = Account('Ana')\nb = Account('Rui')\nprint(a.bank, Account.count)   # Iterum Bank 2\n```\n\n### Three kinds of method\n\n```python\nclass Temp:\n    def instance_method(self):     # needs an object\n        ...\n\n    @classmethod\n    def from_text(cls, text):      # receives the class\n        return cls(float(text))\n\n    @staticmethod\n    def is_valid(value):           # receives nothing special\n        return value > -273.15\n```\n\nUse a `@classmethod` for alternative constructors, and a `@staticmethod` for a helper that logically belongs to the class but needs neither the instance nor the class.",
          "Um **atributo de instância** pertence a um objeto. Um **atributo de classe** é partilhado por todas as instâncias da classe.\n\n```python\nclass Conta:\n    banco = 'Iterum Bank'   # atributo de classe, partilhado\n    total = 0\n\n    def __init__(self, titular):\n        self.titular = titular  # atributo de instância\n        Conta.total += 1\n\na = Conta('Ana')\nb = Conta('Rui')\nprint(a.banco, Conta.total)   # Iterum Bank 2\n```\n\n### Três tipos de método\n\n```python\nclass Temp:\n    def metodo_de_instancia(self):   # precisa de um objeto\n        ...\n\n    @classmethod\n    def de_texto(cls, texto):        # recebe a classe\n        return cls(float(texto))\n\n    @staticmethod\n    def e_valido(valor):             # não recebe nada de especial\n        return valor > -273.15\n```\n\nUsa `@classmethod` para construtores alternativos, e `@staticmethod` para um auxiliar que pertence logicamente à classe mas não precisa nem da instância nem da classe.",
        ),
        keyPoints: [
          L('Class attributes are shared; instance attributes are not.', 'Atributos de classe são partilhados; de instância não.'),
          L('`@classmethod` receives the class as `cls`.', '`@classmethod` recebe a classe como `cls`.'),
          L('`@staticmethod` receives neither self nor cls.', '`@staticmethod` não recebe self nem cls.'),
        ],
        exercises: [
          {
            id: 'classes-1',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `class Account:
    count = 0
    def __init__(self):
        Account.count += 1

Account()
Account()
Account()
print(Account.count)`,
            expectedOutput: '3',
            explanation: L(
              'count lives on the class, so every constructor call increments the same shared value.',
              'count vive na classe, por isso cada chamada ao construtor incrementa o mesmo valor partilhado.',
            ),
          },
          {
            id: 'classes-2',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Give class `Circle` a static method `area(r)` returning `round(3.14159 * r * r, 2)`. Print `Circle.area(2)`.',
              'Dá à classe `Circle` um método estático `area(r)` que devolve `round(3.14159 * r * r, 2)`. Imprime `Circle.area(2)`.',
            ),
            hint: L('@staticmethod above the def, no self parameter.', '@staticmethod por cima do def, sem parâmetro self.'),
            starter: '# A helper that needs no instance\n',
            expectedOutput: '12.57',
            solution:
              'class Circle:\n    @staticmethod\n    def area(r):\n        return round(3.14159 * r * r, 2)\n\nprint(Circle.area(2))',
          },
        ],
      },
      {
        id: 'encapsulation',
        title: L('Encapsulation', 'Encapsulamento'),
        summary: L('Hiding internal state behind a controlled surface.', 'Esconder o estado interno atrás de uma superfície controlada.'),
        minutes: 12,
        concept: L(
          "Encapsulation means an object owns its state and decides how it may change. Expose behaviour, not raw fields.\n\nPython signals intent by naming convention rather than keywords:\n\n- `name` — public\n- `_name` — internal, please do not touch\n- `__name` — name-mangled to `_Class__name`, which makes accidental access hard\n\n```python\nclass Account:\n    def __init__(self, balance):\n        self.__balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError('amount must be positive')\n        self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n```\n\nThe invariant *balance only changes through validated operations* is now enforceable.\n\n### Properties\n\n`@property` gives you a computed attribute with the syntax of a plain one:\n\n```python\nclass Account:\n    def __init__(self, balance):\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\nprint(Account(50).balance)   # 50, no parentheses\n```",
          "Encapsulamento significa que um objeto é dono do seu estado e decide como este pode mudar. Expõe comportamento, não campos em bruto.\n\nO Python sinaliza a intenção por convenção de nomes, em vez de palavras-chave:\n\n- `nome` — público\n- `_nome` — interno, não mexer\n- `__nome` — sofre name mangling para `_Classe__nome`, o que dificulta o acesso acidental\n\n```python\nclass Conta:\n    def __init__(self, saldo):\n        self.__saldo = saldo\n\n    def depositar(self, valor):\n        if valor <= 0:\n            raise ValueError('valor tem de ser positivo')\n        self.__saldo += valor\n\n    def get_saldo(self):\n        return self.__saldo\n```\n\nO invariante *o saldo só muda através de operações validadas* passa a ser garantível.\n\n### Propriedades\n\n`@property` dá-te um atributo calculado com a sintaxe de um atributo normal:\n\n```python\nclass Conta:\n    def __init__(self, saldo):\n        self._saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\nprint(Conta(50).saldo)   # 50, sem parênteses\n```",
        ),
        keyPoints: [
          L('`_x` is a convention; `__x` is name-mangled by the interpreter.', '`_x` é convenção; `__x` sofre name mangling pelo interpretador.'),
          L('Validate in the method that changes state, not at every call site.', 'Valida no método que altera o estado, não em cada sítio que o chama.'),
          L('`@property` exposes computed data with attribute syntax.', '`@property` expõe dados calculados com sintaxe de atributo.'),
        ],
        exercises: [
          {
            id: 'encapsulation-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Write `Account` with a private `__balance` starting at 0, a `deposit(amount)` that ignores non-positive amounts, and `get_balance()`. Deposit 50, then -10, then print the balance.',
              'Escreve `Account` com um `__balance` privado a começar em 0, um `deposit(amount)` que ignora valores não positivos, e `get_balance()`. Deposita 50, depois -10, e imprime o saldo.',
            ),
            hint: L('Guard with `if amount > 0:` before adding.', 'Protege com `if amount > 0:` antes de somar.'),
            starter: '# State that guards itself\n',
            expectedOutput: '50',
            solution:
              'class Account:\n    def __init__(self):\n        self.__balance = 0\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n\na = Account()\na.deposit(50)\na.deposit(-10)\nprint(a.get_balance())',
          },
          {
            id: 'encapsulation-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'Inside `class Box`, an attribute is written `self.__items`. What is its real name on the instance?',
              'Dentro de `class Box`, um atributo é escrito `self.__items`. Qual é o seu nome real na instância?',
            ),
            choices: [
              { id: 'a', label: L('__items', '__items') },
              { id: 'b', label: L('_Box__items', '_Box__items') },
              { id: 'c', label: L('It is deleted after __init__', 'É apagado depois do __init__') },
            ],
            correct: 'b',
            explanation: L(
              'Double leading underscores trigger name mangling: the attribute is stored as _ClassName__attribute, which prevents accidental clashes in subclasses.',
              'Dois underscores iniciais ativam o name mangling: o atributo é guardado como _NomeDaClasse__atributo, o que evita colisões acidentais em subclasses.',
            ),
          },
        ],
      },
      {
        id: 'inheritance',
        title: L('Inheritance', 'Herança'),
        summary: L('Deriving a specialised class from a general one.', 'Derivar uma classe especializada a partir de uma geral.'),
        minutes: 13,
        concept: L(
          "Inheritance expresses an **is-a** relationship: a `Dog` *is an* `Animal`. The subclass gets every attribute and method of the base class for free.\n\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'woof'\n\nd = Dog('Rex')\nprint(d.name, d.speak())   # Rex woof\n```\n\n### Extending rather than replacing\n\nCall `super()` to run the parent's version and then add to it:\n\n```python\nclass Puppy(Dog):\n    def __init__(self, name, weeks):\n        super().__init__(name)   # reuse the parent setup\n        self.weeks = weeks\n```\n\nWithout that `super().__init__(name)`, `self.name` would never be set.\n\n### Composition is often better\n\nOnly inherit when the subclass genuinely *is a* kind of the parent. If the relationship is *has a* — a `Car` has an `Engine` — store it as an attribute instead.",
          "A herança exprime uma relação **é-um**: um `Cao` *é um* `Animal`. A subclasse recebe de graça todos os atributos e métodos da classe base.\n\n```python\nclass Animal:\n    def __init__(self, nome):\n        self.nome = nome\n\n    def falar(self):\n        return '...'\n\nclass Cao(Animal):\n    def falar(self):\n        return 'ão'\n\nd = Cao('Rex')\nprint(d.nome, d.falar())   # Rex ão\n```\n\n### Estender em vez de substituir\n\nChama `super()` para executar a versão do pai e depois acrescentar:\n\n```python\nclass Cachorro(Cao):\n    def __init__(self, nome, semanas):\n        super().__init__(nome)   # reutilizar a preparação do pai\n        self.semanas = semanas\n```\n\nSem esse `super().__init__(nome)`, o `self.nome` nunca seria definido.\n\n### A composição é muitas vezes melhor\n\nSó deves herdar quando a subclasse é genuinamente *um tipo de* pai. Se a relação for *tem um* — um `Carro` tem um `Motor` — guarda-o antes como atributo.",
        ),
        keyPoints: [
          L('Inheritance models is-a; composition models has-a.', 'A herança modela é-um; a composição modela tem-um.'),
          L('`super().__init__(...)` reuses the parent constructor.', '`super().__init__(...)` reutiliza o construtor do pai.'),
          L('A subclass inherits everything it does not override.', 'Uma subclasse herda tudo o que não redefinir.'),
        ],
        exercises: [
          {
            id: 'inheritance-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Write `Animal` with `speak()` returning `...`, and `Dog(Animal)` overriding it to return `woof`. Print both.',
              'Escreve `Animal` com `speak()` a devolver `...`, e `Dog(Animal)` a redefini-lo para devolver `woof`. Imprime os dois.',
            ),
            hint: L('class Dog(Animal): then redefine speak.', 'class Dog(Animal): e depois redefine speak.'),
            starter: '# Base, then specialisation\n',
            expectedOutput: '...\nwoof',
            solution:
              "class Animal:\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'woof'\n\nprint(Animal().speak())\nprint(Dog().speak())",
          },
          {
            id: 'inheritance-2',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `class Base:
    def __init__(self):
        self.tag = 'base'

class Child(Base):
    def __init__(self):
        super().__init__()
        self.tag = self.tag + '+child'

print(Child().tag)`,
            expectedOutput: 'base+child',
            explanation: L(
              'super().__init__() runs first and sets tag to "base"; the subclass then reads that value and extends it.',
              'super().__init__() corre primeiro e define tag como "base"; a subclasse lê depois esse valor e estende-o.',
            ),
          },
        ],
      },
      {
        id: 'polymorphism',
        title: L('Polymorphism and overriding', 'Polimorfismo e redefinição'),
        summary: L('One interface, many behaviours.', 'Uma interface, muitos comportamentos.'),
        minutes: 12,
        concept: L(
          "**Polymorphism** means the same call does the right thing for whatever object it lands on. You write the loop once; each class supplies its own behaviour.\n\n```python\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Rect(Shape):\n    def __init__(self, w, h):\n        self.w, self.h = w, h\n    def area(self):\n        return self.w * self.h\n\nfor s in [Square(2), Rect(2, 3)]:\n    print(s.area())      # 4 then 6\n```\n\nThe loop knows nothing about squares or rectangles. Adding a `Circle` later requires no change to it at all — that is the payoff.\n\n### Duck typing\n\nPython does not require a common base class. If an object has an `area()` method, it works. *If it walks like a duck and quacks like a duck, it is a duck.*",
          "**Polimorfismo** significa que a mesma chamada faz a coisa certa para qualquer objeto em que aterre. Escreves o ciclo uma vez; cada classe fornece o seu comportamento.\n\n```python\nclass Forma:\n    def area(self):\n        raise NotImplementedError\n\nclass Quadrado(Forma):\n    def __init__(self, lado):\n        self.lado = lado\n    def area(self):\n        return self.lado ** 2\n\nclass Retangulo(Forma):\n    def __init__(self, l, a):\n        self.l, self.a = l, a\n    def area(self):\n        return self.l * self.a\n\nfor f in [Quadrado(2), Retangulo(2, 3)]:\n    print(f.area())      # 4 e depois 6\n```\n\nO ciclo não sabe nada sobre quadrados ou retângulos. Acrescentar um `Circulo` mais tarde não exige nenhuma alteração — é esse o ganho.\n\n### Duck typing\n\nO Python não exige uma classe base comum. Se um objeto tiver um método `area()`, funciona. *Se anda como um pato e grasna como um pato, é um pato.*",
        ),
        keyPoints: [
          L('Same call, different behaviour per class.', 'A mesma chamada, comportamento diferente por classe.'),
          L('Overriding replaces the parent method entirely.', 'Redefinir substitui totalmente o método do pai.'),
          L('Duck typing means a shared base class is optional.', 'Duck typing significa que a classe base comum é opcional.'),
        ],
        exercises: [
          {
            id: 'polymorphism-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Define `Square(side)` and `Rect(w, h)`, each with `area()`. Loop over `[Square(2), Rect(2, 3)]` printing each area.',
              'Define `Square(side)` e `Rect(w, h)`, cada um com `area()`. Percorre `[Square(2), Rect(2, 3)]` imprimindo cada área.',
            ),
            hint: L('One loop calling s.area() — no isinstance checks.', 'Um ciclo a chamar s.area() — sem verificações isinstance.'),
            starter: '# Two classes, one loop\n',
            expectedOutput: '4\n6',
            solution:
              'class Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Rect:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nfor s in [Square(2), Rect(2, 3)]:\n    print(s.area())',
          },
          {
            id: 'polymorphism-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'Why is a chain of `if isinstance(shape, Square): ... elif isinstance(shape, Rect): ...` worse than polymorphism?',
              'Porque é que uma cadeia `if isinstance(forma, Quadrado): ... elif isinstance(forma, Retangulo): ...` é pior que polimorfismo?',
            ),
            choices: [
              { id: 'a', label: L('It runs more slowly in every case', 'Corre mais devagar em todos os casos') },
              {
                id: 'b',
                label: L(
                  'Every new shape forces you to edit that chain, in every place it appears',
                  'Cada forma nova obriga-te a editar essa cadeia, em todos os sítios onde aparece',
                ),
              },
              { id: 'c', label: L('isinstance does not work on subclasses', 'isinstance não funciona com subclasses') },
            ],
            correct: 'b',
            explanation: L(
              'Polymorphism puts each behaviour next to its own data, so adding a class is an addition rather than an edit scattered across the codebase.',
              'O polimorfismo coloca cada comportamento junto dos seus dados, por isso acrescentar uma classe é uma adição em vez de uma edição espalhada pelo código.',
            ),
          },
        ],
      },
      {
        id: 'special-methods',
        title: L('Special methods and iteration', 'Métodos especiais e iteração'),
        summary: L('__str__, __eq__, __len__ and making your object iterable.', '__str__, __eq__, __len__ e tornar o teu objeto iterável.'),
        minutes: 14,
        concept: L(
          "Special (dunder) methods let your classes plug into Python's own syntax.\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\n    def __eq__(self, other):\n        return (self.x, self.y) == (other.x, other.y)\n\nprint(Point(1, 2))                  # (1, 2)\nprint(Point(1, 2) == Point(1, 2))   # True\n```\n\nWithout `__str__` you get `<__main__.Point object at 0x...>`. Without `__eq__`, equality falls back to identity and two identical points compare as different.\n\n### Making an object iterable\n\nImplement `__iter__` and your object works in a `for` loop, in `list()`, in unpacking — everywhere.\n\n```python\nclass Bag:\n    def __init__(self, items):\n        self._items = items\n\n    def __len__(self):\n        return len(self._items)\n\n    def __iter__(self):\n        return iter(self._items)\n\nb = Bag([1, 2, 3])\nprint(len(b), sum(b))   # 3 6\n```\n\nThis is polymorphism aimed at the language itself: `len`, `for` and `==` are protocols, and any class may implement them.",
          "Os métodos especiais (dunder) permitem que as tuas classes se liguem à sintaxe do próprio Python.\n\n```python\nclass Ponto:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\n    def __eq__(self, outro):\n        return (self.x, self.y) == (outro.x, outro.y)\n\nprint(Ponto(1, 2))                  # (1, 2)\nprint(Ponto(1, 2) == Ponto(1, 2))   # True\n```\n\nSem `__str__` obténs `<__main__.Ponto object at 0x...>`. Sem `__eq__`, a igualdade recai na identidade e dois pontos idênticos comparam como diferentes.\n\n### Tornar um objeto iterável\n\nImplementa `__iter__` e o teu objeto funciona num ciclo `for`, em `list()`, em desempacotamento — em todo o lado.\n\n```python\nclass Saco:\n    def __init__(self, itens):\n        self._itens = itens\n\n    def __len__(self):\n        return len(self._itens)\n\n    def __iter__(self):\n        return iter(self._itens)\n\nb = Saco([1, 2, 3])\nprint(len(b), sum(b))   # 3 6\n```\n\nIsto é polimorfismo apontado à própria linguagem: `len`, `for` e `==` são protocolos, e qualquer classe os pode implementar.",
        ),
        keyPoints: [
          L('`__str__` controls how print shows your object.', '`__str__` controla como o print mostra o teu objeto.'),
          L('`__eq__` makes `==` compare values instead of identity.', '`__eq__` faz `==` comparar valores em vez de identidade.'),
          L('`__iter__` and `__len__` make your class work with for and len.', '`__iter__` e `__len__` fazem a tua classe funcionar com for e len.'),
        ],
        exercises: [
          {
            id: 'special-methods-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Give `Point(x, y)` a `__str__` returning `(x, y)`. Print `Point(1, 2)`.',
              'Dá a `Point(x, y)` um `__str__` que devolve `(x, y)`. Imprime `Point(1, 2)`.',
            ),
            hint: L('Return an f-string from __str__.', 'Devolve uma f-string do __str__.'),
            starter: '# Teach print how to show it\n',
            expectedOutput: '(1, 2)',
            solution:
              "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\nprint(Point(1, 2))",
          },
          {
            id: 'special-methods-2',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Make `Bag([1, 2, 3])` iterable with `__iter__` and sized with `__len__`, then print `len(b)` and `sum(b)` on one line.',
              'Torna `Bag([1, 2, 3])` iterável com `__iter__` e mensurável com `__len__`, e imprime `len(b)` e `sum(b)` na mesma linha.',
            ),
            hint: L('Return iter(self._items) from __iter__.', 'Devolve iter(self._items) do __iter__.'),
            starter: '# Plug into the language protocols\n',
            expectedOutput: '3 6',
            solution:
              'class Bag:\n    def __init__(self, items):\n        self._items = items\n\n    def __len__(self):\n        return len(self._items)\n\n    def __iter__(self):\n        return iter(self._items)\n\nb = Bag([1, 2, 3])\nprint(len(b), sum(b))',
          },
        ],
      },
      {
        id: 'associations',
        title: L('Associations between classes', 'Associações entre classes'),
        summary: L('Aggregation, composition and multiplicity in code.', 'Agregação, composição e multiplicidade em código.'),
        minutes: 12,
        concept: L(
          "Objects rarely live alone. An **association** is one class holding a reference to another.\n\n```python\nclass Engine:\n    def __init__(self, hp):\n        self.hp = hp\n\nclass Car:\n    def __init__(self, model):\n        self.model = model\n        self.engine = Engine(120)   # composition: created and owned here\n\nprint(Car('Clio').engine.hp)   # 120\n```\n\n### Composition versus aggregation\n\n- **Composition** — the part cannot exist without the whole. A `Car` creates its `Engine`; destroy the car and the engine goes with it.\n- **Aggregation** — the part exists independently and is merely referenced. A `Course` holds `Student` objects that live on after the course ends.\n\n```python\nclass Course:\n    def __init__(self, title):\n        self.title = title\n        self.students = []          # aggregation, 0..*\n\n    def enrol(self, student):\n        self.students.append(student)\n```\n\n**Multiplicity** is how many objects sit on each end: one course to many students is `1` to `0..*`, which in code is simply a list attribute.",
          "Os objetos raramente vivem sozinhos. Uma **associação** é uma classe que guarda uma referência para outra.\n\n```python\nclass Motor:\n    def __init__(self, cv):\n        self.cv = cv\n\nclass Carro:\n    def __init__(self, modelo):\n        self.modelo = modelo\n        self.motor = Motor(120)   # composição: criado e possuído aqui\n\nprint(Carro('Clio').motor.cv)   # 120\n```\n\n### Composição versus agregação\n\n- **Composição** — a parte não pode existir sem o todo. Um `Carro` cria o seu `Motor`; destrói o carro e o motor vai com ele.\n- **Agregação** — a parte existe independentemente e é apenas referenciada. Um `Curso` guarda objetos `Aluno` que continuam a existir depois de o curso acabar.\n\n```python\nclass Curso:\n    def __init__(self, titulo):\n        self.titulo = titulo\n        self.alunos = []          # agregação, 0..*\n\n    def inscrever(self, aluno):\n        self.alunos.append(aluno)\n```\n\n**Multiplicidade** é quantos objetos ficam em cada extremo: um curso para muitos alunos é `1` para `0..*`, o que em código é simplesmente um atributo lista.",
        ),
        keyPoints: [
          L('Composition: the part is owned and dies with the whole.', 'Composição: a parte é possuída e morre com o todo.'),
          L('Aggregation: the part is referenced and outlives the whole.', 'Agregação: a parte é referenciada e sobrevive ao todo.'),
          L('A to-many multiplicity is usually a list attribute.', 'Uma multiplicidade para-muitos é normalmente um atributo lista.'),
        ],
        exercises: [
          {
            id: 'associations-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Write `Course(title)` holding a list of student names, with `enrol(name)`. Enrol `Ana` and `Rui`, then print the count and the list.',
              'Escreve `Course(title)` que guarda uma lista de nomes de alunos, com `enrol(name)`. Inscreve `Ana` e `Rui`, e imprime a contagem e a lista.',
            ),
            hint: L('Initialise self.students = [] in __init__.', 'Inicializa self.students = [] no __init__.'),
            starter: '# A one-to-many association\n',
            expectedOutput: "2 ['Ana', 'Rui']",
            solution:
              "class Course:\n    def __init__(self, title):\n        self.title = title\n        self.students = []\n\n    def enrol(self, name):\n        self.students.append(name)\n\nc = Course('Programming II')\nc.enrol('Ana')\nc.enrol('Rui')\nprint(len(c.students), c.students)",
          },
          {
            id: 'associations-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'A `Library` holds `Book` objects that are catalogued elsewhere and survive the library closing. Which relationship is that?',
              'Uma `Biblioteca` guarda objetos `Livro` que estão catalogados noutro sítio e sobrevivem ao encerramento da biblioteca. Que relação é essa?',
            ),
            choices: [
              { id: 'a', label: L('Composition', 'Composição') },
              { id: 'b', label: L('Aggregation', 'Agregação') },
              { id: 'c', label: L('Inheritance', 'Herança') },
            ],
            correct: 'b',
            explanation: L(
              'The books exist independently of the library, so the library merely aggregates references to them rather than owning their lifetime.',
              'Os livros existem independentemente da biblioteca, por isso a biblioteca apenas agrega referências para eles em vez de possuir o seu ciclo de vida.',
            ),
          },
        ],
      },
      {
        id: 'uml',
        title: L('UML class diagrams', 'Diagramas de classes UML'),
        summary: L('Drawing the design before writing the code.', 'Desenhar o desenho antes de escrever o código.'),
        minutes: 12,
        concept: L(
          "A UML class diagram shows classes, their members, and how they relate — independent of any language.\n\nA class box has three compartments: name, attributes, operations.\n\n```\n┌────────────────────────┐\n│        Account         │\n├────────────────────────┤\n│ - balance : float      │\n│ + bank : str           │\n├────────────────────────┤\n│ + deposit(a: float)    │\n│ + get_balance() : float│\n└────────────────────────┘\n```\n\n### Visibility\n\n`+` public, `-` private, `#` protected. These map onto Python's `name`, `__name` and `_name` conventions.\n\n### Relationships\n\n- **Inheritance** — solid line, hollow triangle pointing at the parent\n- **Composition** — solid line, filled diamond at the owner\n- **Aggregation** — solid line, hollow diamond at the container\n- **Association** — plain solid line, often with multiplicity at each end\n\nMultiplicity labels sit at the ends: `1`, `0..1`, `1..*`, `0..*`.\n\nThe diagram is a communication tool. It should be readable in ten seconds by someone who has never seen your code.",
          "Um diagrama de classes UML mostra classes, os seus membros, e como se relacionam — independentemente da linguagem.\n\nUma caixa de classe tem três compartimentos: nome, atributos, operações.\n\n```\n┌────────────────────────┐\n│         Conta          │\n├────────────────────────┤\n│ - saldo : float        │\n│ + banco : str          │\n├────────────────────────┤\n│ + depositar(v: float)  │\n│ + get_saldo() : float  │\n└────────────────────────┘\n```\n\n### Visibilidade\n\n`+` público, `-` privado, `#` protegido. Correspondem às convenções `nome`, `__nome` e `_nome` do Python.\n\n### Relações\n\n- **Herança** — linha sólida, triângulo vazado a apontar para o pai\n- **Composição** — linha sólida, losango preenchido no dono\n- **Agregação** — linha sólida, losango vazado no contentor\n- **Associação** — linha sólida simples, muitas vezes com multiplicidade em cada extremo\n\nAs etiquetas de multiplicidade ficam nos extremos: `1`, `0..1`, `1..*`, `0..*`.\n\nO diagrama é uma ferramenta de comunicação. Deve ser legível em dez segundos por alguém que nunca viu o teu código.",
        ),
        keyPoints: [
          L('Three compartments: name, attributes, operations.', 'Três compartimentos: nome, atributos, operações.'),
          L('`+` public, `-` private, `#` protected.', '`+` público, `-` privado, `#` protegido.'),
          L('Filled diamond is composition; hollow diamond is aggregation.', 'Losango preenchido é composição; losango vazado é agregação.'),
        ],
        exercises: [
          {
            id: 'uml-1',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'In a UML class diagram, what does a solid line with a hollow triangle pointing at class A mean?',
              'Num diagrama de classes UML, o que significa uma linha sólida com um triângulo vazado a apontar para a classe A?',
            ),
            choices: [
              { id: 'a', label: L('The other class inherits from A', 'A outra classe herda de A') },
              { id: 'b', label: L('A is composed of the other class', 'A é composta pela outra classe') },
              { id: 'c', label: L('A calls a method of the other class', 'A chama um método da outra classe') },
            ],
            correct: 'a',
            explanation: L(
              'The hollow triangle always points at the more general class — the parent in the inheritance relationship.',
              'O triângulo vazado aponta sempre para a classe mais geral — o pai na relação de herança.',
            ),
          },
          {
            id: 'uml-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'A diagram shows `- balance : float` inside `Account`. How is that written in Python?',
              'Um diagrama mostra `- saldo : float` dentro de `Conta`. Como é que isso se escreve em Python?',
            ),
            choices: [
              { id: 'a', label: L('self.balance = 0.0', 'self.saldo = 0.0') },
              { id: 'b', label: L('self.__balance = 0.0', 'self.__saldo = 0.0') },
              { id: 'c', label: L('balance = 0.0 at class level', 'saldo = 0.0 ao nível da classe') },
            ],
            correct: 'b',
            explanation: L(
              'The minus sign marks private visibility, which Python expresses with a double leading underscore.',
              'O sinal menos marca visibilidade privada, que o Python exprime com dois underscores iniciais.',
            ),
          },
        ],
      },
    ],
  },
];
