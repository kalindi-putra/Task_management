const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
	  const { title, description, status, priority, due_date } = req.body;
	    const task = await Task.create({ title, description, status, priority, due_date, userId: req.userId });
	    res.status(201).json(task);
  } 
  catch (error) {

	res.status(500).json(error)
	
  }
};

exports.getTasks = async (req, res) => {
    try {

		const { status, priority, search , page=1 , limit=10 } = req.query;

		const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

		const offset = (pageNum - 1) * limitNum;

        // Build the query options
        const queryOptions = {
            where: {userId: req.userId }, 
			limit: limitNum, 
            offset: offset, 
        };

        if (status) {
            queryOptions.where.status = status;
        }

        if (priority) {
            queryOptions.where.priority = priority;
        }

      

        if (search) {
            queryOptions.where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } }, 
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const tasks = await Task.findAndCountAll(queryOptions);

		const response = {
            total: tasks.count,
            page: pageNum,
            limit: limitNum,
            tasks: tasks.rows,
        };

        res.json(response);
	} 
	
	catch (error) 
	{
		
		res.status(500).json(error)
	}
};

exports.updateTask = async (req, res) => {
   try {
	 const { taskId } = req.params;
	    const task = await Task.findByPk(taskId);
	    if (!task) return res.status(404).json({ message: 'Task not found' });
	    await task.update(req.body);
	    res.json(task);

   } 
   catch (error) 

   {
	res.status(500).json(error);
	
   }
};

exports.deleteTask = async (req, res) => {
try {
	    const { taskId } = req.params;
	    const task = await Task.findByPk(taskId);
	    if (!task) return res.status(404).json({ message: 'Task not found' });
	    await task.destroy();
	    res.json({ message: 'Task deleted' });
	
} 
catch (error) 
{
	res.status(500).json(error)
	
}};
