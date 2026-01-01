'use client'

import { useState } from 'react'

interface Todo {
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  // 添加待办事项
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  // 删除待办事项
  const deleteTodo = (indexToDelete: number) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete))
  }

  // 切换完成状态
  const toggleComplete = (indexToToggle: number) => {
    setTodos(todos.map((todo, index) => 
      index === indexToToggle 
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  // 统计未完成的任务
  const uncompletedCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          我的待办事项
        </h1>
        
        {/* 任务计数 */}
        <p className="text-gray-600 mb-8">
          共 {todos.length} 个任务，{uncompletedCount} 个未完成
        </p>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新任务..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          
          <button 
            onClick={addTodo}
            className="bg-[#9e78f9] text-white px-6 py-2 rounded-lg hover:bg-[#8b6af0] transition-colors"
          >
            添加
          </button>
        </div>

        {/* 待办事项列表 */}
        <div className="space-y-2">
          {todos.map((todo, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              {/* 左边：复选框和文字 */}
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span 
                  className={`flex-1 ${
                    todo.completed 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-900'
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              {/* 右边：删除按钮 */}
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                删除
              </button>
            </div>
          ))}
        </div>

        {/* 空状态提示 */}
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            还没有任务，添加一个试试吧！
          </div>
        )}
      </div>
    </div>
  )
}