function practiceQuestion(prompt, choices, answer, explain) {
  return { q: prompt, choices, answer, explain };
}

const CODE_QUIZZES = {
  python: [
    practiceQuestion('What does len([10, 20, 30]) return?', ['10', '20', '3', '30'], 2, 'len returns the number of items in a collection.'),
    practiceQuestion('Which keyword defines a Python function?', ['function', 'def', 'func', 'define'], 1, 'Use def, a function name, parameters, and a colon.'),
    practiceQuestion('What does range(3) produce when iterated?', ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '3 only'], 0, 'range starts at zero by default and excludes the stop value.')
  ],
  javascript: [
    practiceQuestion('Which declaration creates a block-scoped variable that can be reassigned?', ['const', 'let', 'static', 'define'], 1, 'let is block-scoped and permits reassignment.'),
    practiceQuestion('What does [2, 4].map(value => value * 2) return?', ['6', '[2, 4]', '[4, 8]', '[2, 4, 2, 4]'], 2, 'map creates a new array by transforming each item.'),
    practiceQuestion('What does === compare?', ['Only types', 'Only values after conversion', 'Object contents recursively', 'Values and types without coercion'], 3, 'Strict equality does not convert the operands to another type.')
  ],
  html: [
    practiceQuestion('Which element creates a hyperlink?', ['\u003ca\u003e', '\u003cp\u003e', '\u003clink-text\u003e', '\u003chref\u003e'], 0, 'Use an anchor element with an href attribute.'),
    practiceQuestion('What is the purpose of an image alt attribute?', ['Set its width', 'Provide a text alternative', 'Make it clickable', 'Load JavaScript'], 1, 'Alternative text communicates the image content when it cannot be seen.'),
    practiceQuestion('Which element represents the main content of a page?', ['\u003cfooter\u003e', '\u003caside\u003e', '\u003cmain\u003e', '\u003cstyle\u003e'], 2, 'main identifies the dominant content of the document.')
  ],
  css: [
    practiceQuestion('Which CSS selector targets an element with id="menu"?', ['.menu', 'menu', '*menu', '#menu'], 3, 'The # prefix selects an element by its id.'),
    practiceQuestion('Which property controls space inside the border?', ['margin', 'padding', 'outline', 'gap-size'], 1, 'Padding is inside the border; margin is outside.'),
    practiceQuestion('Which declaration enables a flex layout?', ['position: flex', 'layout: flex', 'display: flex', 'float: flex'], 2, 'display: flex makes the element a flex container.')
  ],
  c: [
    practiceQuestion('Which header declares printf?', ['\u003cstdio.h\u003e', '\u003cmath.h\u003e', '\u003cstring.h\u003e', '\u003ctime.h\u003e'], 0, 'stdio.h declares standard input and output functions.'),
    practiceQuestion('What does the & operator do in &count?', ['Adds one to count', 'Gets the address of count', 'Gets its string length', 'Declares a constant'], 1, 'The unary address-of operator returns a pointer to the variable.'),
    practiceQuestion('Which symbol normally ends a C statement?', [':', ',', ';', '#'], 2, 'Most simple C statements end with a semicolon.')
  ],
  cpp: [
    practiceQuestion('Which standard container is a dynamically sized array?', ['std::vector', 'std::pair', 'std::tuple', 'std::mutex'], 0, 'std::vector stores elements contiguously and can grow.'),
    practiceQuestion('Which operator sends output to std::cout?', ['>>', '<<', '=>', '**'], 1, 'The stream insertion operator is <<.'),
    practiceQuestion('What does a class constructor do?', ['Deletes all objects', 'Sorts an array', 'Initializes a new object', 'Compiles the program'], 2, 'A constructor initializes an instance when it is created.')
  ],
  java: [
    practiceQuestion('What is the standard Java entry-point method name?', ['start', 'run', 'main', 'init'], 2, 'A conventional entry point is public static void main(String[] args).'),
    practiceQuestion('Which keyword creates a new object?', ['new', 'object', 'make', 'instance'], 0, 'new allocates an object and invokes its constructor.'),
    practiceQuestion('How do you compare the contents of two Java strings?', ['Use == for all strings', 'Use equals()', 'Use compareContents()', 'Use ==='], 1, 'equals compares string contents; == compares references.')
  ],
  go: [
    practiceQuestion('Which keyword declares a Go function?', ['def', 'function', 'fn', 'func'], 3, 'Go functions are declared with func.'),
    practiceQuestion('Which syntax starts a goroutine?', ['async task()', 'go task()', 'thread task()', 'await task()'], 1, 'The go statement runs a function concurrently as a goroutine.'),
    practiceQuestion('What is the usual meaning of a nil error return?', ['The operation succeeded', 'The program must exit', 'The result is always zero', 'A network timeout occurred'], 0, 'By convention, nil means no error was reported.')
  ],
  rust: [
    practiceQuestion('Which keyword declares a Rust function?', ['func', 'def', 'fn', 'function'], 2, 'Rust uses fn to declare functions.'),
    practiceQuestion('How do you declare a mutable local binding?', ['let mut count = 0;', 'mutable count = 0;', 'var count = 0;', 'let count = 0;'], 0, 'Rust bindings are immutable unless marked mut.'),
    practiceQuestion('Which type represents a value that might be absent?', ['Vec<T>', 'String', 'bool', 'Option<T>'], 3, 'Option has Some(value) and None variants.')
  ],
  php: [
    practiceQuestion('Which character begins a PHP variable name?', ['@', '$', '#', '&'], 1, 'PHP variables start with $, such as $name.'),
    practiceQuestion('Which operator concatenates PHP strings?', ['.', '+', '*', '&&'], 0, 'The dot operator joins strings in PHP.'),
    practiceQuestion('Which construct outputs text?', ['console.log', 'printText', 'echo', 'writeLine'], 2, 'echo outputs one or more strings.')
  ],
  ruby: [
    practiceQuestion('Which Ruby method prints text with a trailing newline?', ['console.log', 'echo', 'println', 'puts'], 3, 'puts writes text and adds a newline.'),
    practiceQuestion('Which keyword begins a Ruby method definition?', ['fn', 'def', 'func', 'method'], 1, 'Ruby methods use def and end.'),
    practiceQuestion('What does [1, 2, 3].length return?', ['3', '2', '6', '1'], 0, 'length returns the number of elements in the array.')
  ],
  typescript: [
    practiceQuestion('What does TypeScript add to JavaScript?', ['A database', 'Static type checking', 'A browser engine', 'HTML styling'], 1, 'TypeScript adds types that can be checked before execution.'),
    practiceQuestion('Which annotation describes an array of numbers?', ['array(number)', 'numbers', 'number[]', 'number{}'], 2, 'number[] means an array whose elements are numbers.'),
    practiceQuestion('Which union type allows a string or a number?', ['string | number', 'string & number', 'string + number', 'string / number'], 0, 'A union allows a value to have either of the listed types.')
  ],
  csharp: [
    practiceQuestion('Which method prints a line to the console in C#?', ['console.log()', 'puts()', 'System.print()', 'Console.WriteLine()'], 3, 'Console.WriteLine writes text followed by a newline.'),
    practiceQuestion('Which keyword declares a class?', ['class', 'object', 'structural', 'define'], 0, 'class introduces a reference-type definition.'),
    practiceQuestion('What does var mean for a local variable?', ['Its type can change freely', 'Its type is inferred at compile time', 'It is always a string', 'It is a global variable'], 1, 'var infers a static type from the initializer.')
  ],
  bash: [
    practiceQuestion('Which command lists files in a directory?', ['cd', 'mkdir', 'ls', 'pwd'], 2, 'ls lists directory entries.'),
    practiceQuestion('Which assignment is valid in Bash?', ['name = Ada', 'name="Ada"', 'let name: Ada', 'set(name, Ada)'], 1, 'Bash assignments have no spaces around the equals sign.'),
    practiceQuestion('What does the pipe operator | do?', ['Connects standard output to another command\'s standard input', 'Deletes a file', 'Starts a comment', 'Changes the current directory'], 0, 'Pipes let commands process each other\'s output.')
  ],
  sql: [
    practiceQuestion('Which statement retrieves rows from a table?', ['INSERT', 'DELETE', 'UPDATE', 'SELECT'], 3, 'SELECT queries data without modifying the table.'),
    practiceQuestion('Which clause filters rows by a condition?', ['ORDER BY', 'WHERE', 'VALUES', 'LIMIT BY'], 1, 'WHERE filters rows before grouping.'),
    practiceQuestion('Which clause sorts query results?', ['SORT', 'ARRANGE', 'ORDER BY', 'GROUP SORT'], 2, 'ORDER BY specifies the ordering of returned rows.')
  ],
  algorithms: [
    practiceQuestion('What does a stack use?', ['First in, first out', 'Random selection', 'Last in, first out', 'Sorted order only'], 2, 'The last item pushed onto a stack is the first popped.'),
    practiceQuestion('What is required for binary search?', ['Sorted data', 'Only strings', 'An empty array', 'A linked list only'], 0, 'Binary search eliminates half of an ordered search space each step.'),
    practiceQuestion('What is the worst-case time complexity of linear search on n items?', ['O(1)', 'O(log n)', 'O(n²)', 'O(n)'], 3, 'Linear search may need to check every item.')
  ],
  webdev: [
    practiceQuestion('Which HTTP method is normally used to retrieve data?', ['DELETE', 'GET', 'PATCH', 'POST'], 1, 'GET requests retrieve a representation of a resource.'),
    practiceQuestion('What does JSON stand for?', ['JavaScript Object Notation', 'Java Source Object Network', 'Joined Server Output Names', 'JavaScript Online Nodes'], 0, 'JSON is a text format for structured data.'),
    practiceQuestion('Where should a private server API key be kept?', ['In public HTML', 'In a frontend bundle', 'In server-side configuration', 'In a public repository'], 2, 'Private credentials must not be exposed to the browser or public source.')
  ],
  git: [
    practiceQuestion('Which command displays working-tree changes?', ['git push', 'git clone', 'git status', 'git init'], 2, 'git status shows staged, modified, and untracked files.'),
    practiceQuestion('Which command stages a file for a commit?', ['git add', 'git fetch', 'git pull', 'git log'], 0, 'git add places the selected changes into the staging area.'),
    practiceQuestion('What does a Git branch represent?', ['A backup ZIP file', 'A movable reference to a commit', 'A database table', 'A deleted folder'], 1, 'Branches name lines of development and advance as commits are made.')
  ]
};
