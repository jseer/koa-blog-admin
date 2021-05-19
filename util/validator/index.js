module.exports = (app) => {
    app.context.validate = async function (validator, data){
        try {
            await validator.validate(data);
        } catch(e) {
            let message = e.message;
            if(e.errors) {
                const firstError = e.errors[0];
                message = firstError.message;
            }
            this.throw(422, message);
        }
    }
}