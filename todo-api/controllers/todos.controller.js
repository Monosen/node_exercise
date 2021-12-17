// Dummy data - TEST ONLY
const todos = [
	{ id: 1, content: "Learn NodeJS" },
	{ id: 2, content: "Learn React" },
	{ id: 3, content: "Learn MySQL" },
];

exports.getAllTodos = (req, res, next) => {
	// Get data from db

	res.status(200).json({ status: "success", data: { todos } });
};

exports.getTodoById = (req, res, next) => {
	const { id } = req.params;

	// Finds todo given an id
	const todo = todos.find((todo) => todo.id === +id);

	res.status(200).json({ status: "success", data: { todo } });
};

exports.createTodo = (req, res, next) => {
	// Get todo content from req.body
	const { content } = req.body;

	const latestId = todos[todos.length - 1].id;

	// Create new todo with id and content
	const newTodo = {
		id: latestId + 1,
		content,
	};

	// Push new todo to array
	todos.push(newTodo);

	// Send newTodo to the client

	res.status(201).json({ status: "success", data: { newTodo } });
};

exports.updateTodo = (req, res, next) => {
	const { code } = req.params;
	const { content } = req.body;

	const toDo = todos.find((todo) => todo.id === Number(code));

	toDo.content = content;

	res.status(200).json({
		status: "success",
		data: { updatedTodo: toDo },
	});
};

exports.deleteTodo = (req, res, next) => {
	const { code } = req.params;

	const toDoPosition = todos.findIndex((todo) => todo.id === Number(code));

	todos.splice(toDoPosition, 1);

	res.status(200).json({ status: "success", data: { result } });
};
