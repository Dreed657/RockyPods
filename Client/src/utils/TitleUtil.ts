const DefaultTitle = 'Rock, Paper, Scissors';

class TitleUtil {
    ChangeStatus(status: string) {
        document.title = `Winner: ${status} - ${DefaultTitle}`;
        
        //Reset to default if nothing happends for 2 seconds
        setTimeout(() => {
            this.Reset()
        }, 2000);
    }

    Reset() {
        document.title = DefaultTitle;
    }
}

export default new TitleUtil();
