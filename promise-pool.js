sleep = async (ts) => new Promise((rs)=> setTimeout(rs, ts));

async function PromisePool(handler, data, concurency){
    const results = [];
    workers = new Array(concurency)
        .fill(data.entries())
        .map(async (iterator) => {
            for(const [index, item] of iterator){
                console.log(`Request[${index}] info of ${item}`);
                r = await handler(item);
                results.push(r);
                console.log(`Recv[${index}] info of ${item}`);
                sleep(1000)
            }
        });
    await Promise.all(workers);
    return results;
}

data = ["mojombo", "defunkt", "pjhyett", "wycats", "ezmobius", "ivey", "evanphx", "vanpelt", "wayneeseguin", "brynary", "kevinclark"];

results = await PromisePool(async (item) => {
    return await $.get(`https://api.github.com/users/${item}`)
}, data, 3);
console.log(results);
