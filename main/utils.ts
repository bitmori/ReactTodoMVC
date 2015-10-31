export class Utils {
    // generates a new UUID used to identify each of the tasks
    public static uuid(): string {
        let uuid = ``;
        for (let i = 0; i < 32; i++) {
            let random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            if (i === 12) {
                uuid += (4).toString(16);
            } else if (i === 16) {
                uuid += (random & 3 | 8).toString(16);
            } else {
                uuid += random.toString(16);
            }
        }
        return uuid;
    }

    // adds 's' to the end of a given word if count > 1
    public static pluralize(count: number, word: string): string {
        return count === 1 ? word : `${word}s`;
    }

    // stores data using the localStorage API
    public static store(namespace, data?) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }
        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    }

    // just a helper for inheritance
    public static extend(...objs: any[]): any {
        var newObj = {};
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
}