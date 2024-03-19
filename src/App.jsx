import styles from './App.module.css';
import { Header } from './components/header/header';
import { Task } from './components/task/task';
import { Search } from './components/searh/search';
import { Footer } from './components/footer/footer';
import { useTodosContext } from './AppContext';

function App() {

	const {
		todos,
		isLoading,
		filteredTodos,
		showSearch,
		isSearching,
		isSorting,
		addTaskError,
	} = useTodosContext();

	return (
			<div className={styles.app}>
				<div className={styles.container}>
					<Header headerTitle={'Список задач'} />
					{addTaskError && <div className={styles.error}>Такая задача уже есть</div>}
					<ul className={`${styles.taskList} ${styles.scrollableContainer}`}>
						{isLoading ? (
							<div className={styles.loader}></div>
						) : (
							((isSearching || isSorting) ? filteredTodos : todos).map(({ id, title }) => (
								<Task key={id}
									  id={id}
									  title={title}
								/>
							)))
						}
					</ul>
					{showSearch && (
						<Search />
					)}
					<Footer />
				</div>
			</div>
	);
}

export default App;
