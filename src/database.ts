import mongoose from 'mongoose';

async function connect() {

    try{
        await mongoose.connect('mongodb://localhost/ts-app-tut', {
            useNewUrlParser: true
        });
        console.log('>>> Database connected')
    }
    catch {
        console.log('Error');
    }
}

export default connect;