import { createContext, useContext, useEffect, useState } from 'react';
import {
	useRequestCreateTask,
	useRequestDeleteTask,
	useRequestReadTasks,
	useRequestUpdateTask,
} from './hooks';

const TodosContext = createContext();

export const useTodosContext = () => {
	return useContext(TodosContext);
};

export const TodosProvider = ({ children }) => {
	const [ taskText, setTaskText ] = useState('');
	const [searchPhrase, setSearchPhrase] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [showSearch, setShowSearch] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [isSorting, setIsSorting] = useState(false);

	const { todos, isLoading, fetchTodos } = useRequestReadTasks();

	const {isDeleting, requestDeleteTask} = useRequestDeleteTask(fetchTodos);

	const handleEditTask = (id, title) => {
		setIsEditing(true);
		setEditingTaskId(id);
		setTaskText(title);
	};

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			if (editingTaskId !== null) {
				requestUpdateTask(editingTaskId);
			} else {
				setIsEditing(false);
				requestAddTask(taskText);
			}
		}
	};

	const {
		requestAddTask,
		isCreating,
		error: addTaskError,
		setError,
	} = useRequestCreateTask(fetchTodos, todos, setTaskText, setIsSearching);

	const {
		isEditing,
		editingTaskId,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId,
	} = useRequestUpdateTask(fetchTodos, todos, taskText, setTaskText);

	const onChangeSorting = ({ target }) => {
		setIsSorting(target.checked);
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTodos(sortedTodos);
		setError('');
	};

	const toggleSearch = () => {
		setIsSorting(isSorting);
		setShowSearch(!showSearch);
		setIsSearching(!isSearching);
		setError('');
	};

	const handleSearch = (searchValue) => {
		setIsSorting(false);
		setSearchPhrase(searchValue);
	};

	useEffect(() => {
		const filtered = todos.filter(({ title }) =>
			title.toLowerCase().includes(searchPhrase.toLowerCase()),
		);
		setFilteredTodos(filtered);
	}, [searchPhrase, todos]);

	return (
		<TodosContext.Provider
			value={{
				todos,
				isLoading,
				taskText,
				setTaskText,
				searchPhrase,
				filteredTodos,
				setFilteredTodos,
				showSearch,
				setShowSearch,
				isSearching,
				setIsSearching,
				isSorting,
				setIsSorting,
				addTaskError,
				setError,
				handleAddButtonClick,
				isCreating,
				isDeleting,
				requestDeleteTask,
				isEditing,
				editingTaskId,
				requestUpdateTask,
				setIsEditing,
				setEditingTaskId,
				handleEditTask,
				onChangeSorting,
				toggleSearch,
				handleSearch,
			}}>
			{children}
		</TodosContext.Provider>
	);
};
