import React, { useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import TodoList from "./components/TodoList/TodoList"
import InputField from "./components/InputField/InputField"
import { Todo } from "./model"

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("")
	const [todos, setTodos] = useState<Todo[]>([])
	const [todosCompleted, setTodosCompleted] = useState<Todo[]>([])
	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (todo) {
			setTodos([{ id: Date.now(), content: todo, isDone: false }, ...todos])
			setTodo("")
		}
	}
	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result

		let add,
			activeList = todos,
			completedList = todosCompleted

		if (!destination) return
		if (source.index === destination.index && source.droppableId === destination.droppableId)
			return

		if (source.droppableId === "activeList") {
			add = activeList[source.index]
			activeList.splice(source.index, 1)
		} else {
			add = completedList[source.index]
			completedList.splice(source.index, 1)
		}
		if (destination.droppableId === "activeList") {
			activeList.splice(destination.index, 0, add)
		} else {
			completedList.splice(destination.index, 0, add)
		}

		setTodos(activeList)
		setTodosCompleted(completedList)
	}
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1 className="heading">Todo App</h1>
						</div>
						<div className="col-12">
							<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
						</div>
						<TodoList
							todos={todos}
							setTodos={setTodos}
							todosCompleted={todosCompleted}
							setTodosCompleted={setTodosCompleted}
						/>
					</div>
				</div>
			</div>
		</DragDropContext>
	)
}

export default App
