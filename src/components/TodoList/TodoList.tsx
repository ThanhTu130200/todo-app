import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Todo } from "../../model"
import SingleTodo from "./SingleTodo"
import "./TodoList.scss"

interface Props {
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
	todosCompleted: Todo[]
	setTodosCompleted: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<Props> = ({ todos, setTodos, todosCompleted, setTodosCompleted }) => {
	return (
		<>
			<div className="col-lg-6 col-12 gy-4">
				<Droppable droppableId="activeList">
					{(provided, snapshot) => (
						<div
							className={`todoList__wrap p-4 ${
								snapshot.isDraggingOver && "draggingOver"
							}`}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<h1 className="todoList__heading">Active Tasks</h1>
							<div className="todoList">
								{todos.map((todo, index) => (
									<SingleTodo
										index={index}
										key={todo.id}
										todo={todo}
										todos={todos}
										setTodos={setTodos}
									/>
								))}
							</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
			<div className="col-lg-6 col-12 gy-4">
				<Droppable droppableId="completedList">
					{(provided, snapshot) => (
						<div
							className={`todoList__wrap completed p-4 ${
								snapshot.isDraggingOver && "draggingOver"
							}`}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<h1 className="todoList__heading">Completed Tasks</h1>
							<div className="todoList">
								{todosCompleted.map((todo, index) => (
									<SingleTodo
										index={index}
										key={todo.id}
										todo={todo}
										todos={todosCompleted}
										setTodos={setTodosCompleted}
									/>
								))}
							</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</>
	)
}

export default TodoList
