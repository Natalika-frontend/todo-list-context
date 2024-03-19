import styles from './task.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useTodosContext } from '../../AppContext';

export const Task = ({ id, title }) => {
	const {handleEditTask, isDeleting, requestDeleteTask} = useTodosContext();

	return (
		<li className={styles.task}>
			<p className={styles.taskTitle}>{title}</p>
			<Button onClick={() => handleEditTask(id, title)}>
				<FontAwesomeIcon icon={faPenToSquare}/>
			</Button>
			<Button disabled={isDeleting} onClick={() => requestDeleteTask(id)}>Удалить</Button>
		</li>
	);
};
