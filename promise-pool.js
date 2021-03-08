sleep = async (ts) => new Promise((rs)=> setTimeout(rs, ts));
async function PromisePool(handler, data, concurency){
    const iterator = data.entries();
    workers = new Array(concurency)
        .fill(iterator)
        .map(async (iterator) => {
            for(const [index, item] of iterator){
                await handler(item, index);
            }
        });
    await Promise.all(workers);
}

// RUN
(async () => {
    const data = [
        "mojombo",
        "defunkt",
        "pjhyett",
        "wycats",
        "ezmobius",
        "ivey",
        "evanphx",
        "vanpelt",
        "wayneeseguin",
        "brynary",
        "kevinclark"
    ];
    const results = [];
    await PromisePool( async (item, index) => {
        console.log(`==>Request[${index}] info of ${item}`);
        const rand = Math.floor(Math.random() * (3000 - 1000) + 1000);
        await sleep(rand);
        console.log(`Response[${index}] ${item}...${rand} ms`);
        console.log(`<=====Recv[${index}] info of ${item}`);
        results[index] = {name: item, ts: `${rand} ms`};
    }, data, 5);
    console.log(results);
})()
