/* eslint-disable import/no-unresolved */
import './setup';
import app from './app';

const port = process.env.PORT || 4000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
});
