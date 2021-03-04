sleep = async (ts) => new Promise((rs)=> setTimeout(rs, ts));

data = ["x", "b", "y", "f", "d", "e", "k", "g", "j", "l", "s"];
concurency = 2;
workers = new Array(concurency)
    .fill(data.entries())
    .map(async(iterator) => {
        for(const [index, item] of iterator){
            console.log("Send:" + index + ":" + item);
            const randomSecond = Math.floor(Math.random() * (2000 - 1000) ) + 1000;
            await sleep(randomSecond);
            console.log("Recv:" + index + ":" + item);
        }
    });
await Promise.all(workers);
