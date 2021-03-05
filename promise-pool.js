sleep = async (ts) => new Promise((rs)=> setTimeout(rs, ts));
async function PromisePool(handler, data, concurency){
    const result = [];
    workers = new Array(concurency)
        .fill(data.entries())
        .map(handler);
    await Promise.all(workers);
}

data = ["x", "b", "y", "f", "d", "e", "k", "g", "j", "l", "s"];
results = [];
await PromisePool(async (iterator) => {
    for(const [index, item] of iterator){
        console.log("Send:" + index + ":" + item);
        const randomSecond = Math.floor(Math.random() * (2000 - 1000) ) + 1000;
        await sleep(randomSecond);
        console.log("Recv:" + index + ":" + item);
        results.push(item);
    }
}, data, 3);
console.log(results);
