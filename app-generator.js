class AppGenerator {
    static generate(prompt) {
        const type = this.detectAppType(prompt);
        const name = this.extractName(prompt);
        
        return {
            name: name || 'Generated App',
            html: this.generateHTML(type, prompt),
            css: this.generateCSS(type),
            js: this.generateJS(type, prompt)
        };
    }

    static detectAppType(prompt) {
        const lower = prompt.toLowerCase();
        if (lower.includes('todo') || lower.includes('task')) return 'todo';
        if (lower.includes('calculator')) return 'calculator';
        if (lower.includes('weather')) return 'weather';
        if (lower.includes('chat')) return 'chat';
        if (lower.includes('form')) return 'form';
        return 'dashboard';
    }

    static extractName(prompt) {
        const match = prompt.match(/^(?:create|build|make)\s+(.+?)(?:\s+app|\s+with|$)/i);
        return match ? match[1] : null;
    }

    static generateHTML(type, prompt) {
        const templates = {
            todo: `
                <div class="todo-app">
                    <header>
                        <h1><i class="fas fa-tasks"></i> Todo List</h1>
                        <input type="text" id="todoInput" placeholder="Add new task...">
                        <button id="addTodo"><i class="fas fa-plus"></i></button>
                    </header>
                    <ul id="todoList"></ul>
                    <div class="stats">
                        <span id="stats">0 tasks</span>
                    </div>
                </div>
            `,
            calculator: `
                <div class="calculator">
                    <input type="text" id="result" readonly>
                    <div class="buttons">
                        <button data-value="C">C</button>
                        <button data-value="⌫">⌫</button>
                        <button data-value="/">÷</button>
                        <button data-value="*">×</button>
                        <button data-value="7">7</button>
                        <button data-value="8">8</button>
                        <button data-value="9">9</button>
                        <button data-value="-">-</button>
                        <button data-value="4">4</button>
                        <button data-value="5">5</button>
                        <button data-value="6">6</button>
                        <button data-value="+">+</button>
                        <button data-value="1">1</button>
                        <button data-value="2">2</button>
                        <button data-value="3">3</button>
                        <button data-value="=" rowspan="2">=</button>
                        <button data-value="0" style="grid-column: span 2">0</button>
                        <button data-value=".">.</button>
                    </div>
                </div>
            `,
            dashboard: `
                <div class="dashboard">
                    <header>
                        <h1>Dashboard</h1>
                        <div class="user-menu">
                            <i class="fas fa-user"></i>
                        </div>
                    </header>
                    <div class="cards">
                        <div class="card">
                            <h3>Total Users</h3>
                            <div class="value">1,234</div>
                        </div>
                        <div class="card">
                            <h3>Revenue</h3>
                            <div class="value">$12,345</div>
                        </div>
                        <div class="card">
                            <h3>Sales</h3>
                            <div class="value">567</div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return templates[type] || templates.dashboard;
    }

    static generateCSS(type) {
        return `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            ${this.getTypeSpecificCSS(type)}
            
            .dark-mode {
                background: #1a1a2e;
                color: #fff;
            }
            
            .btn {
                padding: 12px 24px;
                border: none;
                border-radius: 25px;
                background: #fff;
                color: #667eea;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
        `;
    }

    static getTypeSpecificCSS(type) {
        const styles = {
            todo: `
                .todo-app {
                    max-width: 500px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                
                .todo-app header {
                    padding: 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .todo-app input {
                    width: 70%;
                    padding: 15px;
                    border: none;
                    border-radius: 25px;
                    font-size: 16px;
                }
                
                #todoList {
                    list-style: none;
                    max-height: 400px;
                    overflow-y: auto;
                }
                
                .todo-item {
                    display: flex;
                    align-items: center;
                    padding: 20px 30px;
                    border-bottom: 1px solid #eee;
                    transition: all 0.3s;
                }
                
                .todo-item:hover {
                    background: #f8f9ff;
                }
            `,
            calculator: `
                .calculator {
                    max-width: 350px;
                    margin: 50px auto;
                    background: #1a1a2e;
                    padding: 20px;
                    border-radius: 25px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                #result {
                    width: 100%;
                    height: 80px;
                    background: #16213e;
                    color: white;
                    font-size: 2rem;
                    text-align: right;
                    padding: 0 20px;
                    border: none;
                    border-radius: 15px;
                    margin-bottom: 20px;
                }
                
                .buttons {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }
                
                .buttons button {
                    height: 70px;
                    border: none;
                    border-radius: 15px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    background: #0f3460;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .buttons button:hover {
                    background: #533a7b;
                    transform: scale(1.05);
                }
            `,
            dashboard: `
                .dashboard {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .dashboard header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 30px;
                    background: white;
                    border-radius: 20px;
                    margin-bottom: 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                
                .cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                }
                
                .card {
                    background: white;
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    text-align: center;
                }
                
                .card .value {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #667eea;
                    margin-top: 10px;
                }
            `
        };
        
        return styles[type] || styles.dashboard;
    }

    static generateJS(type, prompt) {
        const scripts = {
            todo: `
                class TodoApp {
                    constructor() {
                        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
                        this.init();
                    }
                    
                    init() {
                        this.bindEvents();
                        this.render();
                    }
                    
                    bindEvents() {
                        document.getElementById('addTodo').onclick = () => this.addTodo();
                        document.getElementById('todoInput').addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') this.addTodo();
                        });
                    }
                    
                    addTodo() {
                        const input = document.getElementById('todoInput');
                        const text = input.value.trim();
                        if (!text) return;
                        
                        this.todos.push({
                            id: Date.now(),
                            text,
                            completed: false,
                            created: new Date().toLocaleDateString()
                        });
                        
                        input.value = '';
                        this.save();
                        this.render();
                    }
                    
                    toggleTodo(id) {
                        this.todos = this.todos.map(todo => 
                            todo.id === id ? {...todo, completed: !todo.completed} : todo
                        );
                        this.save();
                        this.render();
                    }
                    
                    deleteTodo(id) {
                        this.todos = this.todos.filter(todo => todo.id !== id);
                        this.save();
                        this.render();
                    }
                    
                    save() {
                        localStorage.setItem('todos', JSON.stringify(this.todos));
                    }
                    
                    render() {
                        const list = document.getElementById('todoList');
                        const stats = document.getElementById('stats');
                        
                        list.innerHTML = this.todos.map(todo => \`
                            <li class="todo-item \${todo.completed ? 'completed' : ''}">
                                <input type="checkbox" \${todo.completed ? 'checked' : ''} 
                                       onchange="app.toggleTodo(\${todo.id})">
                                <span>\${todo.text}</span>
                                <div class="actions">
                                    <small>\${todo.created}</small>
                                    <button onclick="app.deleteTodo(\${todo.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        \`).join('');
                        
                        stats.textContent = \`\${this.todos.length} tasks (\${this.todos.filter(t => t.completed).length} completed)\`;
                    }
                }
                
                const app = new TodoApp();
            `,
            calculator: `
                class Calculator {
                    constructor() {
                        this.result = document.getElementById('result');
                        this.current = '0';
                        this.previous = null;
                        this.operation = null;
                        this.init();
                    }
                    
                    init() {
                        document.querySelectorAll('.buttons button').forEach(btn => {
                            btn.onclick = () => this.click(btn.dataset.value);
                        });
                    }
                    
                    click(value) {
                        if (value === 'C') {
                            this.clear();
                        } else if (value === '⌫') {
                            this.backspace();
                        } else if (value === '=') {
                            this.calculate();
                        } else if (['+', '-', '*', '/'].includes(value)) {
                            this.setOperation(value);
                        } else {
                            this.appendNumber(value);
                        }
                        this.updateDisplay();
                    }
                    
                    clear() {
                        this.current = '0';
                        this.previous = null;
                        this.operation = null;
                    }
                    
                    backspace() {
                        this.current = this.current.slice(0, -1) || '0';
                    }
                    
                    appendNumber(num) {
                        if (this.current === '0') this.current = num;
                        else this.current += num;
                    }
                    
                    setOperation(op) {
                        this.operation = op;
                        this.previous = this.current;
                        this.current = '0';
                    }
                    
                    calculate() {
                        const prev = parseFloat(this.previous);
                        const curr = parseFloat(this.current);
                        
                        switch (this.operation) {
                            case '+': this.current = (prev + curr).toString(); break;
                            case '-': this.current = (prev - curr).toString(); break;
                            case '*': this.current = (prev * curr).toString(); break;
                            case '/': 
                                this.current = curr === 0 ? 'Error' : (prev / curr).toString(); 
                                break;
                        }
                        
                        this.previous = null;
                        this.operation = null;
                    }
                    
                    updateDisplay() {
                        this.result.value = this.current === 'Error' ? 'Error' : parseFloat(this.current).toLocaleString();
                    }
                }
                
                new Calculator();
            `,
            dashboard: `
                // Interactive Dashboard
                document.addEventListener('DOMContentLoaded', () => {
                    // Animate numbers
                    const animateNumbers = () => {
                        const numbers = document.querySelectorAll('.value');
                        numbers.forEach(num => {
                            const target = parseInt(num.textContent.replace(/,/g, ''));
                            const increment = target / 100;
                            let current = 0;
                            
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    num.textContent = target.toLocaleString();
                                    clearInterval(timer);
                                } else {
                                    num.textContent = Math.floor(current).toLocaleString();
                                }
                            }, 20);
                        });
                    };
                    
                    animateNumbers();
                    
                    // Toggle dark mode
                    document.body.addEventListener('dblclick', () => {
                        document.body.classList.toggle('dark-mode');
                    });
                });
            `
        };
        
        return scripts[type] || scripts.dashboard;
    }
}
