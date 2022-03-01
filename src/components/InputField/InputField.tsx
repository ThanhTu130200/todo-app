import React, { useRef } from "react"
import "./InputField.scss"

interface Props {
	todo: string
	setTodo: React.Dispatch<React.SetStateAction<string>>
	handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<form className="inputField">
			<input
				ref={inputRef}
				className="inputField__input"
				type="text"
				placeholder="Enter your task"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				className="inputField__submit"
				type="submit"
				onClick={(e) => {
					handleAdd(e)
					inputRef.current?.blur()
				}}>
				Go
			</button>
		</form>
	)
}

export default InputField
