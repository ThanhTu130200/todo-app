import React, { useEffect, useRef, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDownloadDone } from "react-icons/md"
import { Todo } from "../../model"

interface Props {
	todo: Todo
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
	index: number
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [edit, setEdit] = useState<string>(todo.content)
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		inputRef.current?.focus()
	}, [isEditing])

	const handleEdit = (id: number) => {
		setTodos(todos.map((t) => (t.id === todo.id ? { ...todo, content: edit } : t)))
		setIsEditing(false)
	}
	const handleDelete = () => {
		setTodos(todos.filter((t) => t.id !== todo.id))
	}
	const handleDone = () => {
		setTodos(todos.map((t) => (t.id === todo.id ? { ...t, isDone: !t.isDone } : t)))
	}
	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					className={"singleTodo " + (snapshot.isDragging ? "dragging" : "")}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					onSubmit={(e) => {
						e.preventDefault()
						handleEdit(todo.id)
					}}>
					{isEditing ? (
						<input
							ref={inputRef}
							type="text"
							className="singleTodo__heading"
							value={edit}
							onChange={(e) => setEdit(e.target.value)}
							onBlur={() => handleEdit(todo.id)}
						/>
					) : todo.isDone ? (
						<s className="singleTodo__heading">{todo.content}</s>
					) : (
						<span className="singleTodo__heading">{todo.content}</span>
					)}
					<AiFillEdit
						className="singleTodo__icon"
						onClick={() => {
							if (!isEditing) setIsEditing(!isEditing)
						}}
					/>
					<AiFillDelete className="singleTodo__icon" onClick={handleDelete} />
					<MdDownloadDone className="singleTodo__icon" onClick={handleDone} />
				</form>
			)}
		</Draggable>
	)
}

export default SingleTodo
