import { DatabaseResolver } from './database';
import project from './config/project';
import app from './app';

app.listen(project.port, async () => {
    await DatabaseResolver.getConnection();
    console.log('Server running at port ' + project.port);
});
