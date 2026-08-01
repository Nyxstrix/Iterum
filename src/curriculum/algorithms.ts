import type { Module } from './types';

const L = (en: string, pt: string) => ({ en, pt });

/** Programming II, modules 4–6: complexity, comprehensions, and abstract data structures. */
export const algorithmModules: Module[] = [
  // ------------------------------------------------------------------ M4
  {
    id: 'p2-efficiency',
    title: L('Efficiency', 'Eficiência'),
    summary: L(
      'How to reason about cost before your input gets large.',
      'Como raciocinar sobre custo antes de a entrada ficar grande.',
    ),
    lessons: [
      {
        id: 'complexity',
        title: L('Algorithmic complexity', 'Complexidade algorítmica'),
        summary: L(
          'Counting work as a function of input size, not seconds.',
          'Contar trabalho em função do tamanho da entrada, não em segundos.',
        ),
        minutes: 12,
        concept: L(
          "Timing a program tells you about your laptop. **Complexity** tells you about the algorithm: how the work grows as the input grows.\n\nCount the operation that dominates. In a search, that is the comparison.\n\n```python\ndef linear_search(items, target):\n    for item in items:        # n iterations in the worst case\n        if item == target:\n            return True\n    return False\n```\n\nDouble the list and this does roughly double the work. The relationship is linear.\n\n```python\ndef has_duplicate(items):\n    for a in items:           # n\n        for b in items:       # × n\n            ...\n```\n\nNested loops multiply: double the input, quadruple the work.\n\n### Best, average, worst\n\nLinear search finds the target immediately if it is first (best), halfway through on average, and only at the end — or never — in the worst case. **Worst case is what we normally quote**, because it is the guarantee you can actually rely on.",
          "Cronometrar um programa diz-te algo sobre o teu portátil. A **complexidade** diz-te algo sobre o algoritmo: como o trabalho cresce à medida que a entrada cresce.\n\nConta a operação dominante. Numa pesquisa, é a comparação.\n\n```python\ndef pesquisa_linear(itens, alvo):\n    for item in itens:        # n iterações no pior caso\n        if item == alvo:\n            return True\n    return False\n```\n\nDuplica a lista e isto faz aproximadamente o dobro do trabalho. A relação é linear.\n\n```python\ndef tem_duplicado(itens):\n    for a in itens:           # n\n        for b in itens:       # × n\n            ...\n```\n\nCiclos aninhados multiplicam-se: duplica a entrada, quadruplica o trabalho.\n\n### Melhor, médio, pior\n\nA pesquisa linear encontra o alvo imediatamente se ele for o primeiro (melhor), a meio em média, e só no fim — ou nunca — no pior caso. **O pior caso é o que normalmente indicamos**, porque é a garantia em que podes realmente confiar.",
        ),
        keyPoints: [
          L('Complexity measures growth, not wall-clock time.', 'A complexidade mede crescimento, não tempo de relógio.'),
          L('Sequential steps add; nested loops multiply.', 'Passos sequenciais somam-se; ciclos aninhados multiplicam-se.'),
          L('We quote the worst case because it is a guarantee.', 'Indicamos o pior caso porque é uma garantia.'),
        ],
        exercises: [
          {
            id: 'complexity-1',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'A function loops over a list of n items, and for each one loops over the same list again. How does the work grow?',
              'Uma função percorre uma lista de n itens e, para cada um, percorre a mesma lista outra vez. Como cresce o trabalho?',
            ),
            choices: [
              { id: 'a', label: L('Proportional to n', 'Proporcional a n') },
              { id: 'b', label: L('Proportional to n squared', 'Proporcional a n ao quadrado') },
              { id: 'c', label: L('Proportional to log n', 'Proporcional a log n') },
            ],
            correct: 'b',
            explanation: L(
              'Each of the n outer iterations performs n inner iterations, giving n × n operations in total.',
              'Cada uma das n iterações exteriores executa n iterações interiores, dando n × n operações no total.',
            ),
          },
          {
            id: 'complexity-2',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Count how many comparisons a linear search over `[4, 8, 15, 16]` needs to find 15. Print the count.',
              'Conta quantas comparações uma pesquisa linear em `[4, 8, 15, 16]` precisa para encontrar 15. Imprime a contagem.',
            ),
            hint: L('Increment a counter before each comparison, and break when found.', 'Incrementa um contador antes de cada comparação, e faz break quando encontrares.'),
            starter: 'items = [4, 8, 15, 16]\ncomparisons = 0\n# Search for 15, counting comparisons\n',
            expectedOutput: '3',
            solution:
              'items = [4, 8, 15, 16]\ncomparisons = 0\nfor item in items:\n    comparisons += 1\n    if item == 15:\n        break\nprint(comparisons)',
          },
        ],
      },
      {
        id: 'big-o',
        title: L('Big-O notation', 'Notação Big-O'),
        summary: L('The vocabulary for describing growth rates.', 'O vocabulário para descrever taxas de crescimento.'),
        minutes: 12,
        concept: L(
          "Big-O describes the **upper bound** on growth, ignoring constants and lower-order terms. `3n + 50` is `O(n)`, because for large n the 3 and the 50 stop mattering.\n\nThe classes you will meet, best to worst:\n\n- `O(1)` constant — dict lookup, list indexing, append\n- `O(log n)` logarithmic — binary search, balanced tree operations\n- `O(n)` linear — one pass over the data\n- `O(n log n)` — the good sorts, including Python's `sorted()`\n- `O(n²)` quadratic — nested loops over the same data\n- `O(2ⁿ)` exponential — naive recursion over subsets\n\n### Why it matters\n\nAt n = 1000, an `O(n)` algorithm does 1000 units of work and an `O(n²)` one does a million. At n = 1,000,000 the difference is a fraction of a second versus a fortnight.\n\n### Reading Python's costs\n\n```python\nx in a_list     # O(n)  — scans\nx in a_set      # O(1)  — hashes\nd[key]          # O(1)\nlst.append(v)   # O(1)\nlst.insert(0,v) # O(n)  — shifts everything\nsorted(lst)     # O(n log n)\n```\n\nSwapping a list for a set in a membership test is the single most common real-world speed-up.",
          "O Big-O descreve o **limite superior** do crescimento, ignorando constantes e termos de ordem inferior. `3n + 50` é `O(n)`, porque para n grande o 3 e o 50 deixam de importar.\n\nAs classes que vais encontrar, da melhor para a pior:\n\n- `O(1)` constante — procura em dicionário, indexação de lista, append\n- `O(log n)` logarítmica — pesquisa binária, operações em árvores equilibradas\n- `O(n)` linear — uma passagem pelos dados\n- `O(n log n)` — as boas ordenações, incluindo o `sorted()` do Python\n- `O(n²)` quadrática — ciclos aninhados sobre os mesmos dados\n- `O(2ⁿ)` exponencial — recursão ingénua sobre subconjuntos\n\n### Porque importa\n\nCom n = 1000, um algoritmo `O(n)` faz 1000 unidades de trabalho e um `O(n²)` faz um milhão. Com n = 1 000 000 a diferença é uma fração de segundo contra duas semanas.\n\n### Ler os custos do Python\n\n```python\nx in uma_lista     # O(n)  — percorre\nx in um_conjunto   # O(1)  — hash\nd[chave]           # O(1)\nlst.append(v)      # O(1)\nlst.insert(0,v)    # O(n)  — desloca tudo\nsorted(lst)        # O(n log n)\n```\n\nTrocar uma lista por um conjunto num teste de pertença é a otimização real mais comum de todas.",
        ),
        keyPoints: [
          L('Constants and lower-order terms are dropped.', 'Constantes e termos de ordem inferior são descartados.'),
          L('`in` is O(n) on a list, O(1) on a set or dict.', '`in` é O(n) numa lista, O(1) num conjunto ou dicionário.'),
          L('`sorted()` is O(n log n); nested loops are O(n²).', '`sorted()` é O(n log n); ciclos aninhados são O(n²).'),
        ],
        exercises: [
          {
            id: 'big-o-1',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'What is the worst-case complexity of binary search on a sorted list of n items?',
              'Qual é a complexidade no pior caso da pesquisa binária numa lista ordenada de n itens?',
            ),
            choices: [
              { id: 'a', label: L('O(1)', 'O(1)') },
              { id: 'b', label: L('O(log n)', 'O(log n)') },
              { id: 'c', label: L('O(n)', 'O(n)') },
            ],
            correct: 'b',
            explanation: L(
              'Each comparison discards half of the remaining range, so the number of steps is how many times n can be halved — log₂ n.',
              'Cada comparação descarta metade do intervalo restante, por isso o número de passos é quantas vezes n pode ser dividido ao meio — log₂ n.',
            ),
          },
          {
            id: 'big-o-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'A loop over n items performs `if item in big_list:` each pass, where big_list also has n items. What is the total complexity?',
              'Um ciclo sobre n itens executa `if item in lista_grande:` em cada passagem, onde lista_grande também tem n itens. Qual é a complexidade total?',
            ),
            choices: [
              { id: 'a', label: L('O(n) — one loop', 'O(n) — um ciclo') },
              { id: 'b', label: L('O(n²) — the membership test scans', 'O(n²) — o teste de pertença percorre') },
              { id: 'c', label: L('O(n log n)', 'O(n log n)') },
            ],
            correct: 'b',
            explanation: L(
              '`in` on a list is a hidden linear scan, so it multiplies with the outer loop. Converting big_list to a set first brings the whole thing down to O(n).',
              '`in` numa lista é uma varredura linear escondida, por isso multiplica com o ciclo exterior. Converter lista_grande para conjunto primeiro reduz tudo para O(n).',
            ),
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ M5
  {
    id: 'p2-comprehensions',
    title: L('Comprehensions and generators', 'Compreensões e geradores'),
    summary: L(
      'Building sequences declaratively, and producing them lazily.',
      'Construir sequências declarativamente, e produzi-las preguiçosamente.',
    ),
    lessons: [
      {
        id: 'comprehensions',
        title: L('List comprehensions', 'Compreensões de listas'),
        summary: L('Transform and filter in a single readable expression.', 'Transformar e filtrar numa única expressão legível.'),
        minutes: 11,
        concept: L(
          "A comprehension builds a list from an existing iterable in one expression.\n\n```python\nsquares = [x * x for x in range(5)]\nprint(squares)          # [0, 1, 4, 9, 16]\n```\n\nRead it as: *the expression, for each item, in the source*.\n\n### Filtering\n\nAdd `if` at the end to keep only some items:\n\n```python\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)            # [0, 2, 4, 6, 8]\n```\n\n### Dict and set comprehensions\n\n```python\nnames = ['ana', 'rui']\nlengths = {n: len(n) for n in names}\nprint(lengths)          # {'ana': 3, 'rui': 3}\n\ninitials = {n[0] for n in names}\nprint(sorted(initials)) # ['a', 'r']\n```\n\n### When not to\n\nIf it needs two conditions, a nested loop and a ternary, write the `for` loop. A comprehension is for clarity — the moment it stops being clearer, it has stopped doing its job.",
          "Uma compreensão constrói uma lista a partir de um iterável existente numa só expressão.\n\n```python\nquadrados = [x * x for x in range(5)]\nprint(quadrados)        # [0, 1, 4, 9, 16]\n```\n\nLê-se como: *a expressão, para cada item, na origem*.\n\n### Filtrar\n\nAcrescenta `if` no fim para manter apenas alguns itens:\n\n```python\npares = [x for x in range(10) if x % 2 == 0]\nprint(pares)            # [0, 2, 4, 6, 8]\n```\n\n### Compreensões de dicionário e conjunto\n\n```python\nnomes = ['ana', 'rui']\ncomprimentos = {n: len(n) for n in nomes}\nprint(comprimentos)     # {'ana': 3, 'rui': 3}\n\niniciais = {n[0] for n in nomes}\nprint(sorted(iniciais)) # ['a', 'r']\n```\n\n### Quando não usar\n\nSe precisa de duas condições, um ciclo aninhado e um ternário, escreve o ciclo `for`. Uma compreensão serve para clareza — no momento em que deixa de ser mais clara, deixou de cumprir a sua função.",
        ),
        keyPoints: [
          L('`[expr for item in source if condition]`.', '`[expr for item in origem if condição]`.'),
          L('Dict and set comprehensions use braces.', 'As compreensões de dicionário e conjunto usam chavetas.'),
          L('If it stops being readable, write the loop.', 'Se deixar de ser legível, escreve o ciclo.'),
        ],
        exercises: [
          {
            id: 'comprehensions-1',
            kind: 'code',
            xp: 15,
            prompt: L(
              'Use a comprehension to print the squares of 0 to 4 as a list.',
              'Usa uma compreensão para imprimir os quadrados de 0 a 4 como lista.',
            ),
            hint: L('[x * x for x in range(5)]', '[x * x for x in range(5)]'),
            starter: '# One expression\n',
            expectedOutput: '[0, 1, 4, 9, 16]',
            solution: 'print([x * x for x in range(5)])',
          },
          {
            id: 'comprehensions-2',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `words = ['ana', 'rui', 'zoe']
print([w.upper() for w in words if w != 'rui'])`,
            expectedOutput: "['ANA', 'ZOE']",
            explanation: L(
              'The filter runs first and drops "rui", then the expression uppercases each surviving word.',
              'O filtro corre primeiro e elimina "rui", e depois a expressão converte cada palavra sobrevivente para maiúsculas.',
            ),
          },
        ],
      },
      {
        id: 'generators',
        title: L('Generators and iterators', 'Geradores e iteradores'),
        summary: L('Producing values on demand instead of all at once.', 'Produzir valores a pedido em vez de todos de uma vez.'),
        minutes: 13,
        concept: L(
          "A comprehension builds the whole list in memory. A **generator** produces values one at a time, only when asked.\n\nSwap the brackets for parentheses:\n\n```python\nsquares = (x * x for x in range(1000000))\nprint(sum(squares))    # never stores a million items\n```\n\n### yield\n\nA function containing `yield` returns a generator. Execution pauses at each `yield` and resumes on the next request, keeping its local state.\n\n```python\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))   # [3, 2, 1]\n```\n\n### One-shot\n\nA generator is exhausted once consumed — iterate it twice and the second pass yields nothing. Materialise with `list()` if you need it more than once.\n\n```python\ng = countdown(2)\nprint(list(g))   # [2, 1]\nprint(list(g))   # []\n```\n\nUse generators when the sequence is large, infinite, or expensive to compute and you may not need all of it.",
          "Uma compreensão constrói a lista toda em memória. Um **gerador** produz valores um de cada vez, só quando lhe são pedidos.\n\nTroca os parênteses retos por parênteses curvos:\n\n```python\nquadrados = (x * x for x in range(1000000))\nprint(sum(quadrados))    # nunca guarda um milhão de itens\n```\n\n### yield\n\nUma função que contém `yield` devolve um gerador. A execução pausa em cada `yield` e retoma no pedido seguinte, mantendo o seu estado local.\n\n```python\ndef contagem(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(contagem(3)))   # [3, 2, 1]\n```\n\n### De uma só passagem\n\nUm gerador esgota-se depois de consumido — itera-o duas vezes e a segunda passagem não devolve nada. Materializa com `list()` se precisares dele mais do que uma vez.\n\n```python\ng = contagem(2)\nprint(list(g))   # [2, 1]\nprint(list(g))   # []\n```\n\nUsa geradores quando a sequência é grande, infinita, ou cara de calcular e podes não precisar dela toda.",
        ),
        keyPoints: [
          L('`yield` pauses a function and resumes it later.', '`yield` pausa uma função e retoma-a mais tarde.'),
          L('Generators use constant memory regardless of length.', 'Os geradores usam memória constante independentemente do comprimento.'),
          L('A generator can only be consumed once.', 'Um gerador só pode ser consumido uma vez.'),
        ],
        exercises: [
          {
            id: 'generators-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Write a generator `countdown(n)` that yields n down to 1, and print `list(countdown(3))`.',
              'Escreve um gerador `countdown(n)` que produz de n até 1, e imprime `list(countdown(3))`.',
            ),
            hint: L('while n > 0: yield n, then decrement.', 'while n > 0: yield n, e depois decrementa.'),
            starter: '# yield, do not return\n',
            expectedOutput: '[3, 2, 1]',
            solution: 'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))',
          },
          {
            id: 'generators-2',
            kind: 'predict',
            xp: 15,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `g = (x * 2 for x in [1, 2, 3])
print(list(g))
print(list(g))`,
            expectedOutput: '[2, 4, 6]\n[]',
            explanation: L(
              'The first list() consumes the generator entirely. It is not rewindable, so the second call finds nothing left to yield.',
              'O primeiro list() consome o gerador por completo. Não é rebobinável, por isso a segunda chamada não encontra nada para produzir.',
            ),
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ M6
  {
    id: 'p2-structures',
    title: L('Abstract data structures', 'Estruturas de dados abstratas'),
    summary: L(
      'Stacks, queues, trees and heaps — the interfaces and their costs.',
      'Pilhas, filas, árvores e amontoados — as interfaces e os seus custos.',
    ),
    lessons: [
      {
        id: 'adt-intro',
        title: L('Abstract data types', 'Tipos de dados abstratos'),
        summary: L('Separating what a structure promises from how it delivers.', 'Separar o que uma estrutura promete de como o cumpre.'),
        minutes: 10,
        concept: L(
          "An **abstract data type** is defined by its operations and their guarantees, not by its implementation. *Stack* means push, pop and peek in last-in-first-out order — whether you build it on a list, a linked list or an array.\n\nThat separation is the point. Code written against the ADT keeps working when you swap the implementation for a faster one.\n\n```python\nclass Stack:\n    \"\"\"LIFO collection.\"\"\"\n    def __init__(self):\n        self._items = []          # implementation detail\n\n    def push(self, item):\n        self._items.append(item)\n\n    def pop(self):\n        return self._items.pop()\n\n    def is_empty(self):\n        return len(self._items) == 0\n```\n\nThe leading underscore says *this is how, not what*. Callers use `push` and `pop`; nothing outside depends on there being a list inside.\n\n### The questions to ask of any structure\n\n- What operations does it promise?\n- What does each one cost?\n- What order does it preserve, if any?",
          "Um **tipo de dados abstrato** é definido pelas suas operações e garantias, não pela implementação. *Pilha* significa push, pop e peek em ordem último-a-entrar-primeiro-a-sair — quer a construas sobre uma lista, uma lista ligada ou um array.\n\nEssa separação é o objetivo. Código escrito contra o TDA continua a funcionar quando trocas a implementação por uma mais rápida.\n\n```python\nclass Pilha:\n    \"\"\"Coleção LIFO.\"\"\"\n    def __init__(self):\n        self._itens = []          # detalhe de implementação\n\n    def push(self, item):\n        self._itens.append(item)\n\n    def pop(self):\n        return self._itens.pop()\n\n    def esta_vazia(self):\n        return len(self._itens) == 0\n```\n\nO underscore inicial diz *isto é o como, não o quê*. Quem chama usa `push` e `pop`; nada no exterior depende de haver uma lista lá dentro.\n\n### As perguntas a fazer a qualquer estrutura\n\n- Que operações promete?\n- Quanto custa cada uma?\n- Que ordem preserva, se alguma?",
        ),
        keyPoints: [
          L('An ADT is an interface plus cost guarantees.', 'Um TDA é uma interface mais garantias de custo.'),
          L('The implementation must stay swappable.', 'A implementação tem de continuar substituível.'),
          L('Hide the container; expose the operations.', 'Esconde o contentor; expõe as operações.'),
        ],
        exercises: [
          {
            id: 'adt-intro-1',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'Why does the Stack class store its list as `self._items` rather than `self.items`?',
              'Porque é que a classe Pilha guarda a sua lista como `self._itens` em vez de `self.itens`?',
            ),
            choices: [
              { id: 'a', label: L('It makes the code run faster', 'Faz o código correr mais depressa') },
              {
                id: 'b',
                label: L(
                  'It signals the list is an implementation detail callers must not rely on',
                  'Sinaliza que a lista é um detalhe de implementação em que quem chama não deve confiar',
                ),
              },
              { id: 'c', label: L('Python requires it inside classes', 'O Python exige isso dentro de classes') },
            ],
            correct: 'b',
            explanation: L(
              'If callers reached in and used the list directly, replacing it with a linked list later would break them. The underscore marks the boundary.',
              'Se quem chama mexesse diretamente na lista, substituí-la mais tarde por uma lista ligada partiria o código. O underscore marca a fronteira.',
            ),
          },
          {
            id: 'adt-intro-2',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Complete the `Stack` class with `push`, `pop` and `is_empty`. Push 1 and 2, pop once, then print the popped value and whether the stack is empty.',
              'Completa a classe `Stack` com `push`, `pop` e `is_empty`. Faz push de 1 e 2, um pop, e imprime o valor retirado e se a pilha está vazia.',
            ),
            hint: L('append() to push, pop() to remove from the end.', 'append() para push, pop() para remover do fim.'),
            starter: `class Stack:
    def __init__(self):
        self._items = []
    # add push, pop and is_empty

s = Stack()
`,
            expectedOutput: '2 False',
            solution: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        return self._items.pop()

    def is_empty(self):
        return len(self._items) == 0

s = Stack()
s.push(1)
s.push(2)
print(s.pop(), s.is_empty())`,
          },
        ],
      },
      {
        id: 'stacks',
        title: L('Stacks', 'Pilhas'),
        summary: L('Last in, first out — and where that shows up.', 'Último a entrar, primeiro a sair — e onde isso aparece.'),
        minutes: 11,
        concept: L(
          "A stack only lets you touch one end. `push` adds to the top, `pop` removes from the top, `peek` looks without removing. Both operations are `O(1)`.\n\nA Python list is already a stack: `append` and `pop` both work at the end.\n\n```python\nstack = []\nstack.append('a')\nstack.append('b')\nprint(stack.pop())    # b\nprint(stack[-1])      # a  — peek\n```\n\n### Where stacks appear\n\n- The **call stack**: each function call pushes a frame, each return pops one. Infinite recursion overflows it.\n- **Undo** in any editor.\n- **Bracket matching** — push every opening bracket, pop on every closing one and check that it matches.\n\n```python\ndef balanced(text):\n    pairs = {')': '(', ']': '['}\n    stack = []\n    for ch in text:\n        if ch in '([':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n\nprint(balanced('([])'))   # True\n```",
          "Uma pilha só te deixa tocar numa extremidade. `push` acrescenta no topo, `pop` remove do topo, `peek` espreita sem remover. Ambas as operações são `O(1)`.\n\nUma lista Python já é uma pilha: `append` e `pop` trabalham ambos no fim.\n\n```python\npilha = []\npilha.append('a')\npilha.append('b')\nprint(pilha.pop())    # b\nprint(pilha[-1])      # a  — peek\n```\n\n### Onde aparecem as pilhas\n\n- A **pilha de chamadas**: cada chamada de função empilha um frame, cada return desempilha um. A recursão infinita transborda-a.\n- O **desfazer** em qualquer editor.\n- **Correspondência de parênteses** — empilha cada abertura, desempilha em cada fecho e verifica se corresponde.\n\n```python\ndef equilibrado(texto):\n    pares = {')': '(', ']': '['}\n    pilha = []\n    for c in texto:\n        if c in '([':\n            pilha.append(c)\n        elif c in pares:\n            if not pilha or pilha.pop() != pares[c]:\n                return False\n    return not pilha\n\nprint(equilibrado('([])'))   # True\n```",
        ),
        keyPoints: [
          L('LIFO: the last item pushed is the first popped.', 'LIFO: o último item empilhado é o primeiro a sair.'),
          L('push and pop are both O(1) on a Python list.', 'push e pop são ambos O(1) numa lista Python.'),
          L('The call stack is a stack — that is why recursion overflows.', 'A pilha de chamadas é uma pilha — é por isso que a recursão transborda.'),
        ],
        exercises: [
          {
            id: 'stacks-1',
            kind: 'predict',
            xp: 10,
            prompt: L('What does this print?', 'O que é que isto imprime?'),
            snippet: `stack = []
for ch in 'abc':
    stack.append(ch)
out = ''
while stack:
    out += stack.pop()
print(out)`,
            expectedOutput: 'cba',
            explanation: L(
              'Popping always takes the most recently pushed item, so the string comes out reversed. Reversal is the classic one-line use of a stack.',
              'O pop retira sempre o item empilhado mais recentemente, por isso a string sai invertida. A inversão é o uso clássico de uma pilha.',
            ),
          },
          {
            id: 'stacks-2',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Use a stack to check whether `([])` has balanced brackets. Print True or False.',
              'Usa uma pilha para verificar se `([])` tem parênteses equilibrados. Imprime True ou False.',
            ),
            hint: L('Push openers; on a closer, pop and compare.', 'Empilha as aberturas; num fecho, desempilha e compara.'),
            starter: "text = '([])'\n# Push openers, match closers\n",
            expectedOutput: 'True',
            solution: `text = '([])'
pairs = {')': '(', ']': '['}
stack = []
ok = True
for ch in text:
    if ch in '([':
        stack.append(ch)
    elif ch in pairs:
        if not stack or stack.pop() != pairs[ch]:
            ok = False
            break
print(ok and not stack)`,
          },
        ],
      },
      {
        id: 'queues-deques',
        title: L('Queues and deques', 'Filas e deques'),
        summary: L('First in, first out — and why a list is the wrong tool.', 'Primeiro a entrar, primeiro a sair — e porque uma lista é a ferramenta errada.'),
        minutes: 12,
        concept: L(
          "A **queue** is FIFO: items leave in the order they arrived. Print jobs, task schedulers, breadth-first search.\n\nA list can fake it, but badly: `pop(0)` has to shift every remaining element left, making it `O(n)`.\n\n```python\nfrom collections import deque\n\nq = deque()\nq.append('a')        # enqueue at the back\nq.append('b')\nprint(q.popleft())   # a — dequeue from the front, O(1)\n```\n\n### deque\n\nA **double-ended queue** supports `O(1)` insertion and removal at *both* ends, so it serves as a queue and a stack at once.\n\n```python\nd = deque([1, 2, 3])\nd.appendleft(0)\nd.append(4)\nprint(list(d))       # [0, 1, 2, 3, 4]\nprint(d.pop(), d.popleft())   # 4 0\n```\n\n| Operation | list | deque |\n|---|---|---|\n| append right | O(1) | O(1) |\n| pop right | O(1) | O(1) |\n| insert left | O(n) | O(1) |\n| pop left | O(n) | O(1) |\n\nWhen you need to work at the front, reach for `deque`.",
          "Uma **fila** é FIFO: os itens saem pela ordem em que chegaram. Trabalhos de impressão, escalonadores de tarefas, pesquisa em largura.\n\nUma lista pode fingir que é uma fila, mas mal: o `pop(0)` tem de deslocar todos os elementos restantes para a esquerda, o que o torna `O(n)`.\n\n```python\nfrom collections import deque\n\nq = deque()\nq.append('a')        # enfileirar no fim\nq.append('b')\nprint(q.popleft())   # a — desenfileirar da frente, O(1)\n```\n\n### deque\n\nUma **fila de duas pontas** suporta inserção e remoção `O(1)` em *ambos* os extremos, servindo de fila e de pilha ao mesmo tempo.\n\n```python\nd = deque([1, 2, 3])\nd.appendleft(0)\nd.append(4)\nprint(list(d))       # [0, 1, 2, 3, 4]\nprint(d.pop(), d.popleft())   # 4 0\n```\n\n| Operação | list | deque |\n|---|---|---|\n| append à direita | O(1) | O(1) |\n| pop à direita | O(1) | O(1) |\n| inserir à esquerda | O(n) | O(1) |\n| pop à esquerda | O(n) | O(1) |\n\nQuando precisas de trabalhar na frente, usa `deque`.",
        ),
        keyPoints: [
          L('Queue is FIFO; stack is LIFO.', 'A fila é FIFO; a pilha é LIFO.'),
          L('`list.pop(0)` is O(n) — use `deque.popleft()` instead.', '`list.pop(0)` é O(n) — usa `deque.popleft()`.'),
          L('A deque is O(1) at both ends.', 'Um deque é O(1) em ambos os extremos.'),
        ],
        exercises: [
          {
            id: 'queues-deques-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Using a deque, enqueue `a`, `b`, `c`, then dequeue one item and print it followed by the remaining deque as a list.',
              'Usando um deque, enfileira `a`, `b`, `c`, desenfileira um item e imprime-o seguido do deque restante como lista.',
            ),
            hint: L('append() to enqueue, popleft() to dequeue.', 'append() para enfileirar, popleft() para desenfileirar.'),
            starter: 'from collections import deque\n# Enqueue three, dequeue one\n',
            expectedOutput: "a ['b', 'c']",
            solution:
              "from collections import deque\n\nq = deque()\nq.append('a')\nq.append('b')\nq.append('c')\nfirst = q.popleft()\nprint(first, list(q))",
          },
          {
            id: 'queues-deques-2',
            kind: 'quiz',
            xp: 10,
            prompt: L(
              'You process a million tasks in arrival order using `tasks.pop(0)` on a list. What is the problem?',
              'Processas um milhão de tarefas por ordem de chegada usando `tarefas.pop(0)` numa lista. Qual é o problema?',
            ),
            choices: [
              { id: 'a', label: L('pop(0) returns the wrong element', 'pop(0) devolve o elemento errado') },
              {
                id: 'b',
                label: L(
                  'Each pop(0) shifts every remaining item, making the whole loop O(n²)',
                  'Cada pop(0) desloca todos os itens restantes, tornando o ciclo O(n²)',
                ),
              },
              { id: 'c', label: L('Lists cannot hold a million items', 'As listas não podem conter um milhão de itens') },
            ],
            correct: 'b',
            explanation: L(
              'Removing from the front of a list is linear. Doing it n times gives quadratic total cost; a deque makes each removal constant.',
              'Remover da frente de uma lista é linear. Fazê-lo n vezes dá custo total quadrático; um deque torna cada remoção constante.',
            ),
          },
        ],
      },
      {
        id: 'bst-avl',
        title: L('Binary search trees and AVL', 'Árvores binárias de pesquisa e AVL'),
        summary: L('Ordered structure with logarithmic lookup — when kept balanced.', 'Estrutura ordenada com procura logarítmica — quando mantida equilibrada.'),
        minutes: 15,
        concept: L(
          "A **binary search tree** keeps an invariant at every node: everything in the left subtree is smaller, everything in the right subtree is larger.\n\n```python\nclass Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef insert(node, value):\n    if node is None:\n        return Node(value)\n    if value < node.value:\n        node.left = insert(node.left, value)\n    else:\n        node.right = insert(node.right, value)\n    return node\n```\n\nSearching discards half the tree at each step, so lookup is `O(h)` where h is the height.\n\n### In-order traversal\n\nVisit left, then the node, then right — and the values come out sorted:\n\n```python\ndef inorder(node, out):\n    if node:\n        inorder(node.left, out)\n        out.append(node.value)\n        inorder(node.right, out)\n    return out\n```\n\n### The degenerate case\n\nInsert 1, 2, 3, 4, 5 in order and every node hangs off the right. The tree becomes a linked list, h equals n, and lookup degrades to `O(n)`.\n\n### AVL\n\nAn **AVL tree** is a BST that stores each node's height and requires the **balance factor** — height of left minus height of right — to stay in `{-1, 0, 1}`. When an insert breaks that, the tree performs **rotations** (LL, RR, LR, RL) to restore it.\n\nThe result: height is guaranteed `O(log n)`, so search, insert and delete are all `O(log n)` even in the worst case. That guarantee is the entire reason AVL exists.",
          "Uma **árvore binária de pesquisa** mantém um invariante em cada nó: tudo na subárvore esquerda é menor, tudo na subárvore direita é maior.\n\n```python\nclass No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.esq = None\n        self.dir = None\n\ndef inserir(no, valor):\n    if no is None:\n        return No(valor)\n    if valor < no.valor:\n        no.esq = inserir(no.esq, valor)\n    else:\n        no.dir = inserir(no.dir, valor)\n    return no\n```\n\nA pesquisa descarta metade da árvore em cada passo, por isso a procura é `O(h)`, onde h é a altura.\n\n### Travessia em ordem\n\nVisita a esquerda, depois o nó, depois a direita — e os valores saem ordenados:\n\n```python\ndef em_ordem(no, saida):\n    if no:\n        em_ordem(no.esq, saida)\n        saida.append(no.valor)\n        em_ordem(no.dir, saida)\n    return saida\n```\n\n### O caso degenerado\n\nInsere 1, 2, 3, 4, 5 por ordem e cada nó fica pendurado à direita. A árvore torna-se uma lista ligada, h passa a ser n, e a procura degrada para `O(n)`.\n\n### AVL\n\nUma **árvore AVL** é uma BST que guarda a altura de cada nó e exige que o **fator de equilíbrio** — altura da esquerda menos altura da direita — se mantenha em `{-1, 0, 1}`. Quando uma inserção quebra isso, a árvore executa **rotações** (LL, RR, LR, RL) para o restaurar.\n\nO resultado: a altura é garantidamente `O(log n)`, por isso pesquisa, inserção e remoção são todas `O(log n)` mesmo no pior caso. Essa garantia é a razão de existir das AVL.",
        ),
        keyPoints: [
          L('BST invariant: left < node < right, at every node.', 'Invariante BST: esquerda < nó < direita, em cada nó.'),
          L('In-order traversal returns the values sorted.', 'A travessia em ordem devolve os valores ordenados.'),
          L('AVL keeps balance factor in {-1,0,1}, guaranteeing O(log n).', 'A AVL mantém o fator de equilíbrio em {-1,0,1}, garantindo O(log n).'),
        ],
        exercises: [
          {
            id: 'bst-avl-1',
            kind: 'code',
            xp: 25,
            prompt: L(
              'The starter builds a BST from `[5, 3, 8, 1]`. Write `inorder(node, out)` and print the sorted values.',
              'O código inicial constrói uma BST a partir de `[5, 3, 8, 1]`. Escreve `inorder(node, out)` e imprime os valores ordenados.',
            ),
            hint: L('Recurse left, append the value, recurse right.', 'Recorre à esquerda, acrescenta o valor, recorre à direita.'),
            starter: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    return node

root = None
for v in [5, 3, 8, 1]:
    root = insert(root, v)

# Write inorder(node, out) and print the result
`,
            expectedOutput: '[1, 3, 5, 8]',
            solution: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    return node

def inorder(node, out):
    if node:
        inorder(node.left, out)
        out.append(node.value)
        inorder(node.right, out)
    return out

root = None
for v in [5, 3, 8, 1]:
    root = insert(root, v)

print(inorder(root, []))`,
          },
          {
            id: 'bst-avl-2',
            kind: 'quiz',
            xp: 15,
            prompt: L(
              'You insert 1, 2, 3, 4, 5 into an unbalanced BST in that order. What is the lookup complexity?',
              'Inseres 1, 2, 3, 4, 5 numa BST não equilibrada, por essa ordem. Qual é a complexidade da procura?',
            ),
            choices: [
              { id: 'a', label: L('O(log n) — it is a tree', 'O(log n) — é uma árvore') },
              { id: 'b', label: L('O(n) — the tree degenerates into a list', 'O(n) — a árvore degenera numa lista') },
              { id: 'c', label: L('O(1) — the values are sorted', 'O(1) — os valores estão ordenados') },
            ],
            correct: 'b',
            explanation: L(
              'Each value is larger than the last, so every node becomes a right child. The height equals n and the tree offers no advantage over a linked list — which is precisely the problem AVL rotations solve.',
              'Cada valor é maior que o anterior, por isso cada nó fica como filho direito. A altura iguala n e a árvore não oferece vantagem sobre uma lista ligada — que é exatamente o problema que as rotações AVL resolvem.',
            ),
          },
        ],
      },
      {
        id: 'heaps',
        title: L('Priority queues and heaps', 'Filas de prioridade e amontoados'),
        summary: L('Always serving the most urgent item next.', 'Servir sempre o item mais urgente a seguir.'),
        minutes: 13,
        concept: L(
          "A **priority queue** returns items by priority rather than arrival order. A hospital triage, a task scheduler, the frontier in Dijkstra's algorithm.\n\nA **binary heap** implements it efficiently. It is a complete binary tree with the heap property: every parent is smaller than its children (a min-heap). The smallest element is therefore always at the root.\n\nPython's `heapq` treats a plain list as a min-heap:\n\n```python\nimport heapq\n\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nheapq.heappush(h, 2)\nprint(heapq.heappop(h))   # 1 — always the smallest\n```\n\n### Costs\n\n- peek smallest — `O(1)`\n- push — `O(log n)`\n- pop — `O(log n)`\n\nSorting the list on every insert would be `O(n log n)` each time; a heap gives you the minimum for far less, because it only maintains a *partial* order. The heap never fully sorts its contents — it only guarantees the root.\n\n### Priorities with payloads\n\nPush tuples; comparison uses the first element.\n\n```python\ntasks = []\nheapq.heappush(tasks, (2, 'write report'))\nheapq.heappush(tasks, (1, 'fix bug'))\nprint(heapq.heappop(tasks)[1])   # fix bug\n```\n\nFor a max-heap, push negated priorities.",
          "Uma **fila de prioridade** devolve itens por prioridade em vez de ordem de chegada. Uma triagem hospitalar, um escalonador de tarefas, a fronteira no algoritmo de Dijkstra.\n\nUm **amontoado binário** implementa-a eficientemente. É uma árvore binária completa com a propriedade de amontoado: cada pai é menor que os seus filhos (min-heap). O elemento mais pequeno está portanto sempre na raiz.\n\nO `heapq` do Python trata uma lista normal como min-heap:\n\n```python\nimport heapq\n\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nheapq.heappush(h, 2)\nprint(heapq.heappop(h))   # 1 — sempre o menor\n```\n\n### Custos\n\n- espreitar o menor — `O(1)`\n- push — `O(log n)`\n- pop — `O(log n)`\n\nOrdenar a lista a cada inserção seria `O(n log n)` de cada vez; um amontoado dá-te o mínimo por muito menos, porque mantém apenas uma ordem *parcial*. O amontoado nunca ordena totalmente o seu conteúdo — só garante a raiz.\n\n### Prioridades com conteúdo\n\nEmpilha tuplos; a comparação usa o primeiro elemento.\n\n```python\ntarefas = []\nheapq.heappush(tarefas, (2, 'escrever relatório'))\nheapq.heappush(tarefas, (1, 'corrigir bug'))\nprint(heapq.heappop(tarefas)[1])   # corrigir bug\n```\n\nPara um max-heap, empilha prioridades negadas.",
        ),
        keyPoints: [
          L('A min-heap keeps the smallest element at the root.', 'Um min-heap mantém o menor elemento na raiz.'),
          L('push and pop are O(log n); peek is O(1).', 'push e pop são O(log n); espreitar é O(1).'),
          L('A heap is partially ordered, never fully sorted.', 'Um amontoado é parcialmente ordenado, nunca totalmente.'),
        ],
        exercises: [
          {
            id: 'heaps-1',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Push 5, 1 and 3 onto a heap, then pop twice and print both values on one line.',
              'Empilha 5, 1 e 3 num amontoado, faz pop duas vezes e imprime ambos os valores na mesma linha.',
            ),
            hint: L('heapq.heappush(h, v) then heapq.heappop(h).', 'heapq.heappush(h, v) e depois heapq.heappop(h).'),
            starter: 'import heapq\n\nh = []\n# Push three, pop two\n',
            expectedOutput: '1 3',
            solution:
              'import heapq\n\nh = []\nfor v in [5, 1, 3]:\n    heapq.heappush(h, v)\n\nprint(heapq.heappop(h), heapq.heappop(h))',
          },
          {
            id: 'heaps-2',
            kind: 'code',
            xp: 20,
            prompt: L(
              'Push the tasks `(2, "report")` and `(1, "bug")` onto a heap and print the description of the most urgent one.',
              'Empilha as tarefas `(2, "report")` e `(1, "bug")` num amontoado e imprime a descrição da mais urgente.',
            ),
            hint: L('Tuples compare by their first element; index [1] for the label.', 'Os tuplos comparam pelo primeiro elemento; índice [1] para a etiqueta.'),
            starter: 'import heapq\n\ntasks = []\n# Push both, pop the most urgent\n',
            expectedOutput: 'bug',
            solution:
              "import heapq\n\ntasks = []\nheapq.heappush(tasks, (2, 'report'))\nheapq.heappush(tasks, (1, 'bug'))\nprint(heapq.heappop(tasks)[1])",
          },
        ],
      },
    ],
  },
];
