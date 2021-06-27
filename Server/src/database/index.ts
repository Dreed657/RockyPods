import mongoose from 'mongoose';

export default (conString: string) => {
    mongoose
        .connect(conString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            // tslint:disable-next-line: no-console
            console.log("Connection with the database established!")
        })
        .catch((e) => {
            // tslint:disable-next-line: no-console
            console.error('Error connecting to database', e.message);
        });
};
