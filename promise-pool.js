sleep = async (ts) => new Promise((rs)=> setTimeout(rs, ts));
async function PromisePool(handler, data, concurency){
    const results = [];
    workers = new Array(concurency)
        .fill(data.entries())
        .map(async (iterator) => {
            for(const [index, item] of iterator){
                console.log(`==>Request[${index}] info of ${item}`);
                results.push(await handler(item));
                console.log(`<=====Recv[${index}] info of ${item}`);
            }
        });
    await Promise.all(workers);
    return results;
}

// RUN
data = ["mojombo", "defunkt", "pjhyett", "wycats", "ezmobius", "ivey", "evanphx", "vanpelt", "wayneeseguin", "brynary", "kevinclark"];
results = await PromisePool( async (item) => {
    const rand = Math.floor(Math.random() * (3000 - 1000) + 1000);
    await sleep(rand);
    console.log(`Waiting response...${rand}s`);
    return rand;
}, data, 3);
console.log(results);
